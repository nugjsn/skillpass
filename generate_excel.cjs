const { createClient } = require('@supabase/supabase-js');
const xlsx = require('xlsx');
const fs = require('fs');

// Connect to Supabase
const envFile = fs.readFileSync('.env', 'utf8');
const envUrlMatch = envFile.match(/VITE_SUPABASE_URL=(.*)/);
const envKeyMatch = envFile.match(/VITE_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = envUrlMatch ? envUrlMatch[1].trim() : 'https://tjgohjzzxoyoklmsihol.supabase.co';
const supabaseKey = envKeyMatch ? envKeyMatch[1].trim() : '';

if (!supabaseKey) {
    console.error('Error: VITE_SUPABASE_ANON_KEY not found in .env.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateExcel() {
    console.log('Fetching users from Supabase...');
    
    // We only need the users table (staff/teachers/admins)
    // We do NOT fetch students (siswa) because the user requested so.
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('role', { ascending: true })
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching users:', error);
        return;
    }

    console.log(`Found ${users.length} users.`);

    // Map to the desired Excel format
    const excelData = users.map(u => ({
        'Nama Lengkap': u.name,
        'Role': u.role,
        'Username': u.username,
        'Password': u.password,
        'Kelas/Tugas': u.kelas || '-',
        'Jurusan ID': u.jurusan_id || '-',
        'ID Supabase': u.id
    }));

    // Create a new workbook and add the data
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);

    // Auto-adjust column widths (simple estimation)
    const wscols = [
        { wch: 30 }, // Nama Lengkap
        { wch: 20 }, // Role
        { wch: 35 }, // Username
        { wch: 15 }, // Password
        { wch: 20 }, // Kelas/Tugas
        { wch: 36 }, // Jurusan ID
        { wch: 36 }, // ID
    ];
    ws['!cols'] = wscols;

    xlsx.utils.book_append_sheet(wb, ws, 'Data Akun Staff');

    const fileName = 'Data_Akun_SkillPassport.xlsx';
    xlsx.writeFile(wb, fileName);
    console.log(`Excel file created successfully: ${fileName}`);
}

generateExcel();
