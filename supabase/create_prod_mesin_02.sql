-- ===================================================================
-- CREATE: Akun Guru Produktif Teknik Mesin Kampus 02 Pati
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_jurusan_id uuid;
BEGIN
    -- 1. Dapatkan sekolah_id untuk 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';
    
    -- 2. Dapatkan jurusan_id untuk Teknik Mesin di 02 Pati
    SELECT id INTO v_jurusan_id 
    FROM jurusan 
    WHERE nama_jurusan ILIKE '%mesin%' AND sekolah_id = v_sekolah_id 
    LIMIT 1;

    IF v_sekolah_id IS NULL OR v_jurusan_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah atau Jurusan Mesin tidak ditemukan';
    END IF;

    -- 3. Cek apakah akun sudah ada, jika belum maka Insert
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'prod_mesin_02') THEN
        INSERT INTO users (
            username, 
            password, 
            name, 
            role, 
            jurusan_id, 
            sekolah_id
        ) VALUES (
            'prod_mesin_02',
            '123', -- password default
            'Guru Produktif Mesin 02',
            'teacher_produktif',
            v_jurusan_id,
            v_sekolah_id
        );
        RAISE NOTICE 'Akun prod_mesin_02 berhasil dibuat!';
    ELSE
        -- Jika sudah ada, pastikan ID-nya benar
        UPDATE users
        SET 
            sekolah_id = v_sekolah_id,
            jurusan_id = v_jurusan_id
        WHERE username = 'prod_mesin_02';
        RAISE NOTICE 'Akun prod_mesin_02 sudah ada, jurusan_id dan sekolah_id telah di-update!';
    END IF;
END $$;

-- Verifikasi Hasil
SELECT username, name, role, sekolah_id, jurusan_id 
FROM users 
WHERE username = 'prod_mesin_02';
