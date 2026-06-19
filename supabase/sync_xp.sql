-- ===================================================================
-- Sinkronisasi Skor dan Poin (XP) dari KRS yang sudah Selesai
-- Jalankan query ini jika XP siswa masih 0 padahal ujian sudah selesai
-- ===================================================================

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
ON CONFLICT (siswa_id) DO UPDATE SET 
    skor = EXCLUDED.skor,
    poin = EXCLUDED.poin,
    level_id = EXCLUDED.level_id;
