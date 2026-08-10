const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://odzuxewwozcbgkzehvms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenV4ZXd3b3pjYmdremVodm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Njg4MDYsImV4cCI6MjA4MTE0NDgwNn0.UgyjZN3S_Qth3wO8l56Eh8O6padjXNIePUzg89iG5hY');

async function run() {
  const { data: siswa } = await supabase.from('siswa').select('nama, kelas, sekolah_id').ilike('kelas', '%tsm%');
  console.log('Students with TSM classes:', siswa);
}
run();
