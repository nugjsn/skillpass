const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabase = createClient('https://odzuxewwozcbgkzehvms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenV4ZXd3b3pjYmdremVodm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Njg4MDYsImV4cCI6MjA4MTE0NDgwNn0.UgyjZN3S_Qth3wO8l56Eh8O6padjXNIePUzg89iG5hY');

async function checkDb() {
  try {
    const { data: sekolah } = await supabase.from('sekolah').select('*');
    const { data: jurusan } = await supabase.from('jurusan').select('*');
    const { data: walas } = await supabase.from('users').select('*').eq('role', 'wali_kelas');
    
    // Get unique classes from siswa table
    const { data: siswaClasses, error: sErr } = await supabase
      .from('siswa')
      .select('kelas');
    
    const uniqueSiswaClasses = [...new Set(siswaClasses.map(s => s.kelas))].sort();

    const output = {
      sekolah,
      jurusan,
      walas,
      uniqueSiswaClasses
    };
    
    fs.writeFileSync('current_db_data.json', JSON.stringify(output, null, 2));
    console.log('Done writing current_db_data.json');
  } catch (err) {
    console.error('Catch error:', err);
  }
}

checkDb();
