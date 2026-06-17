DO $$
DECLARE
    v_sekolah_id uuid;
    v_mesin_id uuid;
    v_mekatronika_id uuid;
    v_ototronik_id uuid;
    v_animasi_id uuid;
BEGIN
    -- 1. Get sekolah_id for SMK Mitra Industri 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';

    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah SMK Mitra Industri 02 Pati (kode 02) not found';
    END IF;

    -- 2. Insert or get jurusans
    
    -- Mesin (existing ID)
    v_mesin_id := '550e8400-e29b-41d4-a716-446655440001';
    INSERT INTO jurusan (id, nama_jurusan, icon, deskripsi, sekolah_id) 
    VALUES (v_mesin_id, 'Teknik Mesin', 'Settings', 'Perancangan dan perawatan mesin', v_sekolah_id)
    ON CONFLICT (id) DO NOTHING;

    -- Mekatronika
    v_mekatronika_id := '550e8400-e29b-41d4-a716-446655440009';
    INSERT INTO jurusan (id, nama_jurusan, icon, deskripsi, sekolah_id) 
    VALUES (v_mekatronika_id, 'Teknik Mekatronika', 'Cpu', 'Sistem mekanik dan elektronika', v_sekolah_id)
    ON CONFLICT (id) DO NOTHING;

    -- Ototronik
    v_ototronik_id := '550e8400-e29b-41d4-a716-446655440010';
    INSERT INTO jurusan (id, nama_jurusan, icon, deskripsi, sekolah_id) 
    VALUES (v_ototronik_id, 'Teknik Ototronik', 'Car', 'Sistem elektronik otomotif', v_sekolah_id)
    ON CONFLICT (id) DO NOTHING;

    -- Animasi
    v_animasi_id := '550e8400-e29b-41d4-a716-446655440011';
    INSERT INTO jurusan (id, nama_jurusan, icon, deskripsi, sekolah_id) 
    VALUES (v_animasi_id, 'Animasi', 'Film', 'Seni dan teknik animasi', v_sekolah_id)
    ON CONFLICT (id) DO NOTHING;

    -- 3. Insert users
    -- Sukoco, S.Pd (Mekatronika)
    INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
    VALUES ('hod_mekatronika_02', '123', 'Sukoco, S.Pd', 'hod', v_mekatronika_id, v_sekolah_id)
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

    -- Syahrul Gilang R., S.Tr. T (Mesin)
    INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
    VALUES ('hod_mesin_02', '123', 'Syahrul Gilang R., S.Tr. T', 'hod', v_mesin_id, v_sekolah_id)
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

    -- M. Iqbal, S.Pd Gr. (Animasi)
    INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
    VALUES ('hod_animasi_02', '123', 'M. Iqbal, S.Pd Gr.', 'hod', v_animasi_id, v_sekolah_id)
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

    -- Gesit Nandaru Aji, S.T (Ototronik)
    INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
    VALUES ('hod_ototronik_02', '123', 'Gesit Nandaru Aji, S.T', 'hod', v_ototronik_id, v_sekolah_id)
    ON CONFLICT (username) DO UPDATE SET 
        name = EXCLUDED.name, 
        jurusan_id = EXCLUDED.jurusan_id, 
        sekolah_id = EXCLUDED.sekolah_id,
        role = EXCLUDED.role;

END $$;
