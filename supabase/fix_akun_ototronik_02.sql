-- ===================================================================
-- FIX: Update Akun Ototronik (Guru Produktif & HOD) Kampus 02 Pati
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_jurusan_id uuid;
BEGIN
    -- 1. Dapatkan sekolah_id untuk 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';
    
    -- 2. Dapatkan jurusan_id untuk Ototronik di 02 Pati
    SELECT id INTO v_jurusan_id 
    FROM jurusan 
    WHERE nama_jurusan ILIKE '%oto%' AND sekolah_id = v_sekolah_id 
    LIMIT 1;

    IF v_sekolah_id IS NULL OR v_jurusan_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah atau Jurusan Ototronik tidak ditemukan';
    END IF;

    -- 3. Update akun Guru Produktif Ototronik
    UPDATE users
    SET 
        sekolah_id = v_sekolah_id,
        jurusan_id = v_jurusan_id
    WHERE role IN ('teacher_produktif', 'teacher') AND (name ILIKE '%oto%' OR username ILIKE '%oto%');
    
    -- 4. Update akun HOD Ototronik
    UPDATE users
    SET 
        sekolah_id = v_sekolah_id,
        jurusan_id = v_jurusan_id
    WHERE role = 'hod' AND (name ILIKE '%oto%' OR username ILIKE '%oto%');

    RAISE NOTICE 'Akun Ototronik berhasil di-update dengan jurusan_id % dan sekolah_id %', v_jurusan_id, v_sekolah_id;
END $$;

-- Verifikasi Hasil
SELECT username, name, role, sekolah_id, jurusan_id 
FROM users 
WHERE (name ILIKE '%oto%' OR username ILIKE '%oto%') AND role IN ('teacher_produktif', 'teacher', 'hod');
