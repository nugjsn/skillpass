const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://odzuxewwozcbgkzehvms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kenV4ZXd3b3pjYmdremVodm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1Njg4MDYsImV4cCI6MjA4MTE0NDgwNn0.UgyjZN3S_Qth3wO8l56Eh8O6padjXNIePUzg89iG5hY');

async function test() {
  const nisn = '011330328';
  
  const { data: s1, error: e1 } = await supabase
    .from('siswa')
    .select('*')
    .or(`nama.eq."${nisn}",nisn.eq."${nisn}"`)
    .eq('nisn', nisn)
    .maybeSingle();
  console.log('Login Test (with quotes):', s1, e1);

  const { data: s2, error: e2 } = await supabase
    .from('siswa')
    .select('*')
    .or(`nama.eq.${nisn},nisn.eq.${nisn}`)
    .eq('nisn', nisn)
    .maybeSingle();
  console.log('Login Test (no quotes):', s2, e2);
  
  const { data: all_siswa } = await supabase.from('siswa').select('nisn').limit(10);
  console.log('Sample NISNs from DB:', all_siswa);
}
test();
