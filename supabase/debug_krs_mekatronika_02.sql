-- ===================================================================
-- DEBUG LANJUT: Cek PERSIS mengapa KRS Abellia tidak muncul
-- di dashboard Guru Produktif Mekatronika
-- Jalankan tiap section di Supabase SQL Editor
-- ===================================================================

-- ===================================================================
-- QUERY 1: Cek record KRS milik Abellia + jurusan_id & sekolah_id-nya
-- ===================================================================
SELECT 
    k.id                  AS krs_id,
    k.siswa_nama,
    k.kelas,
    k.status,
    k.jurusan_id          AS krs_jurusan_id,
    k.sekolah_id          AS krs_sekolah_id,
    j.nama_jurusan        AS krs_nama_jurusan,
    s.kode_sekolah        AS krs_kode_sekolah
FROM krs k
LEFT JOIN jurusan j ON j.id = k.jurusan_id
LEFT JOIN sekolah s ON s.id = k.sekolah_id
WHERE k.siswa_nama ILIKE '%abellia%'
   OR k.status = 'pending_produktif'
ORDER BY k.updated_at DESC;

-- ===================================================================
-- QUERY 2: Cek data akun prod_mekatronika (jurusan_id & sekolah_id)
-- ===================================================================
SELECT 
    u.id,
    u.username,
    u.name,
    u.role,
    u.jurusan_id          AS guru_jurusan_id,
    u.sekolah_id          AS guru_sekolah_id,
    j.nama_jurusan        AS guru_nama_jurusan,
    s.kode_sekolah        AS guru_kode_sekolah
FROM users u
LEFT JOIN jurusan j ON j.id = u.jurusan_id
LEFT JOIN sekolah s ON s.id = u.sekolah_id
WHERE u.username = 'prod_mekatronika';

-- ===================================================================
-- QUERY 3: Bandingkan jurusan_id KRS vs guru - apakah cocok?
-- ===================================================================
SELECT
    'KRS jurusan_id'  AS sumber,
    k.jurusan_id      AS jurusan_id_value
FROM krs k
WHERE k.siswa_nama ILIKE '%abellia%'

UNION ALL

SELECT
    'GURU jurusan_id' AS sumber,
    u.jurusan_id      AS jurusan_id_value
FROM users u
WHERE u.username = 'prod_mekatronika';

-- Jika kedua jurusan_id sama = masalah ada di tempat lain
-- Jika BERBEDA = itulah root cause-nya

-- ===================================================================
-- QUERY 4: Cek jurusan Mekatronika yang ada di database
-- untuk lihat apakah ada lebih dari satu UUID untuk Mekatronika
-- ===================================================================
SELECT j.id, j.nama_jurusan, s.kode_sekolah, s.nama_sekolah
FROM jurusan j
LEFT JOIN sekolah s ON s.id = j.sekolah_id
WHERE j.nama_jurusan ILIKE '%mekatronika%'
ORDER BY s.kode_sekolah;

-- ===================================================================
-- QUERY 5: Cek data siswa Abellia - jurusan_id-nya mengarah ke mana?
-- ===================================================================
SELECT 
    si.id,
    si.nama,
    si.kelas,
    si.jurusan_id         AS siswa_jurusan_id,
    si.sekolah_id         AS siswa_sekolah_id,
    j.nama_jurusan,
    s.kode_sekolah
FROM siswa si
LEFT JOIN jurusan j ON j.id = si.jurusan_id
LEFT JOIN sekolah s ON s.id = si.sekolah_id
WHERE si.nama ILIKE '%abellia%';

-- ===================================================================
-- FIX FINAL: Jika jurusan_id KRS tidak cocok dengan guru,
-- update jurusan_id KRS agar cocok dengan guru prod_mekatronika
-- JALANKAN HANYA JIKA Query 3 menunjukkan nilai BERBEDA
-- ===================================================================
UPDATE krs
SET jurusan_id = (
    SELECT jurusan_id FROM users WHERE username = 'prod_mekatronika'
)
WHERE siswa_id IN (
    SELECT si.id FROM siswa si
    WHERE si.jurusan_id = (
        SELECT u.jurusan_id FROM users u WHERE u.username = 'prod_mekatronika'
    )
)
AND status = 'pending_produktif';

-- Verifikasi setelah fix
SELECT k.id, k.siswa_nama, k.status, k.jurusan_id, k.sekolah_id,
       j.nama_jurusan, s.kode_sekolah
FROM krs k
LEFT JOIN jurusan j ON j.id = k.jurusan_id
LEFT JOIN sekolah s ON s.id = k.sekolah_id
WHERE k.status = 'pending_produktif'
ORDER BY k.updated_at DESC;
