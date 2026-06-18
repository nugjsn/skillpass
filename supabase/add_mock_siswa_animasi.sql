-- ===================================================================
-- Menambahkan Data Siswa Dummy untuk Kelas XI Animasi 1 dan XI Animasi 2
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_animasi_id uuid := '550e8400-e29b-41d4-a716-446655440011';
    v_siswa_1_id uuid := gen_random_uuid();
    v_siswa_2_id uuid := gen_random_uuid();
    v_siswa_3_id uuid := gen_random_uuid();
    v_siswa_4_id uuid := gen_random_uuid();
BEGIN
    -- 1. Get sekolah_id for SMK Mitra Industri 02 Pati (karena Animasi ada di kampus 02)
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';

    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah SMK Mitra Industri 02 Pati (kode 02) not found';
    END IF;

    -- 2. Insert Siswa Dummy untuk XI Animasi 1
    INSERT INTO siswa (id, nama, nisn, kelas, jurusan_id, sekolah_id) VALUES
    (v_siswa_1_id, 'Andi Animator', '10001001', 'XI Animasi 1', v_animasi_id, v_sekolah_id),
    (v_siswa_2_id, 'Budi Kartun', '10001002', 'XI Animasi 1', v_animasi_id, v_sekolah_id);

    -- 3. Insert Siswa Dummy untuk XI Animasi 2
    INSERT INTO siswa (id, nama, nisn, kelas, jurusan_id, sekolah_id) VALUES
    (v_siswa_3_id, 'Citra Desain', '10002001', 'XI Animasi 2', v_animasi_id, v_sekolah_id),
    (v_siswa_4_id, 'Doni Render', '10002002', 'XI Animasi 2', v_animasi_id, v_sekolah_id);

    -- 4. Insert Skill Siswa untuk setiap siswa baru (Skor awal 0)
    INSERT INTO skill_siswa (siswa_id, skor, poin) VALUES
    (v_siswa_1_id, 0, 0),
    (v_siswa_2_id, 0, 0),
    (v_siswa_3_id, 0, 0),
    (v_siswa_4_id, 0, 0);
    
    -- 5. Buatkan user login untuk mereka (role = student)
    INSERT INTO users (username, password, name, role, kelas, jurusan_id, sekolah_id) VALUES
    ('andi_animator', '123', 'Andi Animator', 'student', 'XI Animasi 1', v_animasi_id, v_sekolah_id),
    ('budi_kartun', '123', 'Budi Kartun', 'student', 'XI Animasi 1', v_animasi_id, v_sekolah_id),
    ('citra_desain', '123', 'Citra Desain', 'student', 'XI Animasi 2', v_animasi_id, v_sekolah_id),
    ('doni_render', '123', 'Doni Render', 'student', 'XI Animasi 2', v_animasi_id, v_sekolah_id)
    ON CONFLICT (username) DO NOTHING;

END $$;
