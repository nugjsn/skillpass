-- Script untuk mereset semua nilai siswa kembali ke 0 dan level kembali ke Pemula

DO $$ 
DECLARE
  beginner_level_id uuid;
BEGIN
  -- 1. Dapatkan ID untuk level 'Pemula / Beginner' (urutan = 1)
  SELECT id INTO beginner_level_id 
  FROM level_skill 
  WHERE urutan = 1 
  LIMIT 1;
  
  -- 2. Update semua nilai (skor) siswa menjadi 0 dan set level-nya ke Pemula
  UPDATE skill_siswa
  SET 
    skor = 0,
    level_id = beginner_level_id,
    updated_at = now();

  -- 3. (Opsional) Kosongkan juga nilai akhir (final_score) yang ada di KRS jika ada
  UPDATE krs
  SET final_score = NULL
  WHERE final_score IS NOT NULL;

  -- 4. (Opsional) Hapus riwayat penambahan nilai (history) agar bersih dari awal
  DELETE FROM competency_history;

END $$;
