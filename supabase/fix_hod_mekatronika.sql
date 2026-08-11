-- ===================================================================
-- FIX: Update HOD Mekatronika (Sukoco) agar sesuai dengan kampus 02
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_jurusan_id uuid;
BEGIN
    -- 1. Dapatkan sekolah_id untuk 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';
    
    -- 2. Dapatkan jurusan_id untuk Mekatronika di 02 Pati
    SELECT id INTO v_jurusan_id 
    FROM jurusan 
    WHERE nama_jurusan ILIKE '%mekatronika%' AND sekolah_id = v_sekolah_id 
    LIMIT 1;

    IF v_sekolah_id IS NULL OR v_jurusan_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah atau Jurusan tidak ditemukan';
    END IF;

    -- 3. Update akun HOD atas nama Sukoco / hod_mekatronika
    UPDATE users
    SET 
        sekolah_id = v_sekolah_id,
        jurusan_id = v_jurusan_id
    WHERE role = 'hod' AND (name ILIKE '%Sukoco%' OR username = 'hod_mekatronika' OR username = 'hod_mekatronika_02');
    
    RAISE NOTICE 'Akun HOD berhasil di-update dengan jurusan_id % dan sekolah_id %', v_jurusan_id, v_sekolah_id;
END $$;

-- 4. Verifikasi Hasil
SELECT username, name, role, sekolah_id, jurusan_id 
FROM users 
WHERE role = 'hod' AND name ILIKE '%Sukoco%';
