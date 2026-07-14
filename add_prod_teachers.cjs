const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://odzuxewwozcbgkzehvms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenV4ZXd3b3pjYmdremVodm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Njg4MDYsImV4cCI6MjA4MTE0NDgwNn0.UgyjZN3S_Qth3wO8l56Eh8O6padjXNIePUzg89iG5hY');

async function addMissingProdTeachers() {
  // Get all jurusan
  const { data: jurusans } = await supabase.from('jurusan').select('id, nama_jurusan');
  
  // Define what we want to add
  const missing = [
    { nama: 'Animasi', username: 'prod_animasi', name: 'Guru Produktif Animasi' },
    { nama: 'Teknik Ototronik', username: 'prod_ototronik', name: 'Guru Produktif Ototronik' },
    { nama: 'Teknik Mekatronika', username: 'prod_mekatronika', name: 'Guru Produktif Mekatronika' }
  ];

  for (const m of missing) {
    // Find the first matching jurusan ID
    const j = jurusans.find(jur => jur.nama_jurusan === m.nama);
    if (!j) {
      console.log('Jurusan not found:', m.nama);
      continue;
    }

    // Check if already exists
    const { data: existing } = await supabase.from('users').select('id').eq('username', m.username).maybeSingle();
    
    if (!existing) {
      const { data, error } = await supabase.from('users').insert({
        username: m.username,
        password: m.username, // Default password same as username
        name: m.name,
        role: 'teacher_produktif',
        jurusan_id: j.id
      }).select();
      
      if (error) {
        console.error('Error inserting', m.username, error);
      } else {
        console.log('Successfully inserted', m.username, 'for', m.nama);
      }
    } else {
      console.log('User already exists:', m.username);
    }
  }
}

addMissingProdTeachers();
