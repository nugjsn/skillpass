-- ===================================================================
-- Menambahkan Akun Guru Produktif untuk Kampus SMK Mitra Industri 02 Pati
-- Nama: Yusuf (Guru Produktif Animasi)
-- Password default: 123
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_animasi_id uuid;
BEGIN
    -- 1. Get sekolah_id untuk kampus 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';

    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah dengan kode 02 tidak ditemukan';
    END IF;

    -- 2. Get jurusan Animasi di kampus 02
    SELECT id INTO v_animasi_id
    FROM jurusan
    WHERE nama_jurusan ILIKE '%Animasi%'
      AND sekolah_id = v_sekolah_id
    LIMIT 1;

    IF v_animasi_id IS NULL THEN
        RAISE EXCEPTION 'Jurusan Animasi tidak ditemukan di kampus 02 Pati';
    END IF;

    -- Insert akun Pak Yusuf sebagai guru produktif Animasi
    INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
    VALUES (
        'guru_yusuf_animasi',
        '123',
        'Yusuf',
        'teacher_produktif',
        v_animasi_id,
        v_sekolah_id
    )
    ON CONFLICT (username) DO UPDATE SET
        name        = EXCLUDED.name,
        role        = EXCLUDED.role,
        jurusan_id  = EXCLUDED.jurusan_id,
        sekolah_id  = EXCLUDED.sekolah_id;

    RAISE NOTICE 'Berhasil menambahkan akun Guru Produktif Animasi: Yusuf (username: guru_yusuf_animasi)';
END $$;
