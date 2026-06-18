-- ===================================================================
-- Menambahkan Walas (Wali Kelas) atas nama Tri Puji Lestari 
-- untuk kelas XI Animasi 1 dan XI Animasi 2
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_animasi_id uuid := '550e8400-e29b-41d4-a716-446655440011';
BEGIN
    -- 1. Get sekolah_id for SMK Mitra Industri 02 Pati (karena Animasi ada di kampus 02)
    -- Sesuaikan jika Animasi ada di kampus lain
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';

    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah SMK Mitra Industri 02 Pati (kode 02) not found';
    END IF;

    -- 2. Insert Walas untuk XI Animasi 1
    INSERT INTO users (username, password, name, role, kelas, jurusan_id, sekolah_id)
    VALUES (
        'walas_tripuji_xi_animasi1', 
        '123', 
        'Tri Puji Lestari', 
        'wali_kelas', 
        'XI Animasi 1', 
        v_animasi_id, 
        v_sekolah_id
    )
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        kelas = EXCLUDED.kelas,
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

    -- 3. Insert Walas untuk XI Animasi 2
    INSERT INTO users (username, password, name, role, kelas, jurusan_id, sekolah_id)
    VALUES (
        'walas_tripuji_xi_animasi2', 
        '123', 
        'Tri Puji Lestari', 
        'wali_kelas', 
        'XI Animasi 2', 
        v_animasi_id, 
        v_sekolah_id
    )
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        kelas = EXCLUDED.kelas,
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

END $$;
