-- ===================================================================
-- DIAGNOSA & FIX: Guru Produktif Mekatronika 02 Pati
-- Jalankan query per section di Supabase SQL Editor
-- ===================================================================

-- ===================================================================
-- STEP 1: Cek sekolah 02 Pati
-- ===================================================================
SELECT id, nama_sekolah, kode_sekolah
FROM sekolah
ORDER BY kode_sekolah;

-- ===================================================================
-- STEP 2: Cek jurusan Mekatronika di kampus 02 Pati
-- ===================================================================
SELECT j.id, j.nama_jurusan, j.sekolah_id, s.kode_sekolah, s.nama_sekolah
FROM jurusan j
LEFT JOIN sekolah s ON s.id = j.sekolah_id
WHERE j.nama_jurusan ILIKE '%mekatronika%'
ORDER BY s.kode_sekolah;

-- ===================================================================
-- STEP 3: Cek akun guru produktif yang ada, termasuk kampusnya
-- ===================================================================
SELECT 
    u.id,
    u.username,
    u.name,
    u.role,
    u.jurusan_id,
    u.sekolah_id,
    j.nama_jurusan,
    s.kode_sekolah,
    s.nama_sekolah
FROM users u
LEFT JOIN jurusan j ON j.id = u.jurusan_id
LEFT JOIN sekolah s ON s.id = u.sekolah_id
WHERE u.role IN ('teacher_produktif', 'teacher')
ORDER BY s.kode_sekolah, j.nama_jurusan;

-- ===================================================================
-- STEP 4: Cek KRS dari siswa Mekatronika 02 Pati
-- ===================================================================
SELECT 
    k.id,
    k.siswa_nama,
    k.kelas,
    k.status,
    k.jurusan_id,
    k.sekolah_id,
    j.nama_jurusan,
    s.kode_sekolah
FROM krs k
LEFT JOIN jurusan j ON j.id = k.jurusan_id
LEFT JOIN sekolah s ON s.id = k.sekolah_id
WHERE j.nama_jurusan ILIKE '%mekatronika%'
   OR k.kelas ILIKE '%meka%'
ORDER BY k.updated_at DESC;

-- ===================================================================
-- STEP 5: Cek siswa Mekatronika 02 Pati
-- ===================================================================
SELECT 
    si.id,
    si.nama,
    si.kelas,
    si.sekolah_id,
    si.jurusan_id,
    j.nama_jurusan,
    s.kode_sekolah
FROM siswa si
LEFT JOIN jurusan j ON j.id = si.jurusan_id
LEFT JOIN sekolah s ON s.id = si.sekolah_id
WHERE j.nama_jurusan ILIKE '%mekatronika%'
  AND s.kode_sekolah = '02'
LIMIT 20;

-- ===================================================================
-- STEP 6: FIX - Update akun prod_mekatronika agar sekolah_id & jurusan_id
--         mengarah ke kampus 02 Pati (Mekatronika)
-- ===================================================================
DO $$
DECLARE
    v_sekolah_id uuid;
    v_jurusan_id uuid;
BEGIN
    -- Get sekolah 02 Pati
    SELECT id INTO v_sekolah_id FROM sekolah WHERE kode_sekolah = '02';
    IF v_sekolah_id IS NULL THEN
        RAISE EXCEPTION 'Sekolah dengan kode 02 tidak ditemukan';
    END IF;

    -- Get jurusan Mekatronika di kampus 02 Pati
    SELECT id INTO v_jurusan_id
    FROM jurusan
    WHERE nama_jurusan ILIKE '%mekatronika%'
      AND sekolah_id = v_sekolah_id
    LIMIT 1;

    IF v_jurusan_id IS NULL THEN
        RAISE EXCEPTION 'Jurusan Mekatronika tidak ditemukan di kampus 02 Pati';
    END IF;

    RAISE NOTICE 'sekolah_id: %, jurusan_id: %', v_sekolah_id, v_jurusan_id;

    -- Update akun prod_mekatronika agar terikat ke kampus 02 Pati
    UPDATE users
    SET
        jurusan_id = v_jurusan_id,
        sekolah_id = v_sekolah_id
    WHERE username = 'prod_mekatronika';

    IF NOT FOUND THEN
        -- Jika belum ada, buat baru
        INSERT INTO users (username, password, name, role, jurusan_id, sekolah_id)
        VALUES (
            'prod_mekatronika',
            'prod_mekatronika',
            'Guru Produktif Mekatronika',
            'teacher_produktif',
            v_jurusan_id,
            v_sekolah_id
        );
        RAISE NOTICE 'Akun prod_mekatronika dibuat baru';
    ELSE
        RAISE NOTICE 'Akun prod_mekatronika berhasil di-update: jurusan_id=%, sekolah_id=%', v_jurusan_id, v_sekolah_id;
    END IF;
END $$;

-- ===================================================================
-- STEP 7: FIX sekolah_id pada record KRS yang masih NULL
-- Propagate sekolah_id dari data siswa ke record KRS
-- ===================================================================
UPDATE krs k
SET sekolah_id = si.sekolah_id
FROM siswa si
WHERE k.siswa_id = si.id
  AND k.sekolah_id IS NULL
  AND si.sekolah_id IS NOT NULL;

-- Verifikasi hasil fix
SELECT 
    k.id, k.siswa_nama, k.status, 
    k.sekolah_id AS krs_sekolah_id, 
    s.kode_sekolah,
    k.jurusan_id AS krs_jurusan_id,
    j.nama_jurusan
FROM krs k
LEFT JOIN sekolah s ON s.id = k.sekolah_id
LEFT JOIN jurusan j ON j.id = k.jurusan_id
ORDER BY k.updated_at DESC
LIMIT 30;
