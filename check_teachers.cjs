const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://odzuxewwozcbgkzehvms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenV4ZXd3b3pjYmdremVodm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Njg4MDYsImV4cCI6MjA4MTE0NDgwNn0.UgyjZN3S_Qth3wO8l56Eh8O6padjXNIePUzg89iG5hY');

async function checkTeachers() {
  const { data: users, error: uErr } = await supabase
    .from('users')
    .select('username, name, role, jurusan_id, jurusan:jurusan_id(nama_jurusan)');

  if (uErr) {
    console.error('Error fetching users:', uErr);
    return;
  }
  
  const teachers = users.filter(u => u.role === 'hod' || u.role === 'teacher');
  console.log('Total Teachers/HODs:', teachers.length);
  
  const byJurusan = {};
  for (const t of teachers) {
    const jName = t.jurusan ? t.jurusan.nama_jurusan : 'No Jurusan/All';
    if (!byJurusan[jName]) byJurusan[jName] = [];
    byJurusan[jName].push({ name: t.name, username: t.username, role: t.role });
  }
  
  console.log(JSON.stringify(byJurusan, null, 2));
}

checkTeachers();
