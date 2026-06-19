-- ===================================================================
-- Sinkronisasi Skor dan Poin (XP) dari KRS yang sudah Selesai
-- Jalankan query ini jika XP siswa masih 0 padahal ujian sudah selesai
-- ===================================================================

-- 1. UPDATE data siswa yang sudah ada di tabel skill_siswa
UPDATE public.skill_siswa s
SET 
    skor = k.final_score,
    poin = CASE WHEN k.final_score >= 90 THEN 3 WHEN k.final_score >= 80 THEN 2 ELSE 1 END,
    level_id = (SELECT id FROM public.level_skill WHERE k.final_score >= min_skor AND k.final_score <= max_skor LIMIT 1)
FROM public.krs k
WHERE s.siswa_id = k.siswa_id AND k.status = 'completed' AND k.final_score > 0;

-- 2. INSERT data siswa yang BELUM ADA di tabel skill_siswa
INSERT INTO public.skill_siswa (siswa_id, skor, poin, level_id, sekolah_id)
SELECT 
    k.siswa_id, 
    k.final_score as skor,
    CASE 
        WHEN k.final_score >= 90 THEN 3 
        WHEN k.final_score >= 80 THEN 2 
        ELSE 1 
    END as poin,
    (SELECT id FROM public.level_skill WHERE k.final_score >= min_skor AND k.final_score <= max_skor LIMIT 1) as level_id,
    k.sekolah_id
FROM public.krs k
WHERE k.status = 'completed' AND k.final_score > 0
AND NOT EXISTS (
    SELECT 1 FROM public.skill_siswa s WHERE s.siswa_id = k.siswa_id
);
