-- ===================================================================
-- DEBUG HOD: Mengapa HOD Mekatronika 02 Pati tidak melihat KRS
-- ===================================================================

-- 1. Cek Data Akun HOD Mekatronika (username: hod_mekatronika)
SELECT 
    u.id, u.username, u.name, u.role, u.sekolah_id, u.jurusan_id,
    s.kode_sekolah, j.nama_jurusan
FROM users u
LEFT JOIN sekolah s ON u.sekolah_id = s.id
LEFT JOIN jurusan j ON u.jurusan_id = j.id
WHERE u.role = 'hod' AND u.name ILIKE '%Sukoco%';

-- 2. Cek KRS yang statusnya pending_hod untuk jurusan Mekatronika
SELECT 
    k.id, k.siswa_nama, k.status, k.sekolah_id, k.jurusan_id,
    s.kode_sekolah, j.nama_jurusan
FROM krs k
LEFT JOIN sekolah s ON k.sekolah_id = s.id
LEFT JOIN jurusan j ON k.jurusan_id = j.id
WHERE k.status = 'pending_hod' 
  AND (j.nama_jurusan ILIKE '%meka%' OR k.kelas ILIKE '%meka%');

-- 3. Bandingkan jurusan_id dan sekolah_id
SELECT
    'HOD' AS sumber,
    u.jurusan_id, u.sekolah_id
FROM users u
WHERE u.name ILIKE '%Sukoco%' AND u.role = 'hod'
UNION ALL
SELECT
    'KRS' AS sumber,
    k.jurusan_id, k.sekolah_id
FROM krs k
WHERE k.status = 'pending_hod' AND k.siswa_nama ILIKE '%abellia%';
