-- ===================================================================
-- UPDATE Walas (Wali Kelas) atas nama Tri Puji Lestari 
-- agar menggunakan jurusan_id Animasi yang TEPAT dari database
-- ===================================================================

DO $$
DECLARE
    v_sekolah_id uuid;
    v_animasi_id uuid;
BEGIN
    -- 1. Get sekolah_id for SMK Mitra Industri 02 Pati (kode 02)
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';

    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah SMK Mitra Industri 02 Pati (kode 02) not found';
    END IF;

    -- 2. Dapatkan ID Jurusan Animasi secara dinamis (bukan hardcoded)
    SELECT id INTO v_animasi_id 
    FROM jurusan 
    WHERE nama_jurusan ILIKE '%Animasi%' 
      AND sekolah_id = v_sekolah_id 
    LIMIT 1;

    IF v_animasi_id IS NULL THEN
        RAISE EXCEPTION 'Jurusan Animasi tidak ditemukan di database untuk kampus 02';
    END IF;

    -- 3. Update data Walas agar jurusan_id-nya sesuai dengan ID Jurusan Animasi yang asli
    UPDATE users 
    SET jurusan_id = v_animasi_id
    WHERE username IN ('walas_tripuji_xi_animasi1', 'walas_tripuji_xi_animasi2');

END $$;
