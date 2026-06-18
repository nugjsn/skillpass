-- ===================================================================
-- DIAGNOSTIC: Cek status KRS dan HOD di kampus 02 Pati
-- Jalankan query ini satu per satu di Supabase SQL Editor
-- untuk mendiagnosis mengapa HOD tidak bisa melihat pengajuan
-- ===================================================================

-- 1. Cek semua record di tabel krs
SELECT 
    k.id,
    k.siswa_nama,
    k.kelas,
    k.status,
    k.jurusan_id,
    k.sekolah_id,
    k.created_at,
    k.updated_at,
    s.nama_sekolah AS nama_sekolah_dari_krs
FROM krs k
LEFT JOIN sekolah s ON s.id = k.sekolah_id
ORDER BY k.updated_at DESC;

-- ===================================================================
-- 2. Cek data HOD M. Iqbal (jurusan_id dan sekolah_id-nya)
SELECT 
    u.id,
    u.username,
    u.name,
    u.role,
    u.jurusan_id,
    u.sekolah_id,
    j.nama_jurusan,
    s.nama_sekolah,
    s.kode_sekolah
FROM users u
LEFT JOIN jurusan j ON j.id = u.jurusan_id
LEFT JOIN sekolah s ON s.id = u.sekolah_id
WHERE u.role = 'hod';

-- ===================================================================
-- 3. Cek apakah sekolah_id di KRS cocok dengan sekolah_id HOD
-- (Jalankan setelah tahu sekolah_id dari query 2 di atas)
-- Ganti 'UUID_HOD_SEKOLAH_ID' dengan sekolah_id HOD dari query 2
-- SELECT * FROM krs WHERE sekolah_id = 'UUID_HOD_SEKOLAH_ID';

-- ===================================================================
-- 4. FIX: Update sekolah_id di KRS agar cocok dengan kampus 02 Pati
-- Jalankan ini HANYA jika query 1 menunjukkan sekolah_id = null atau salah
UPDATE krs 
SET sekolah_id = (SELECT id FROM sekolah WHERE kode_sekolah = '02' LIMIT 1)
WHERE sekolah_id IS NULL
  AND siswa_id IN (
      SELECT id FROM siswa 
      WHERE sekolah_id = (SELECT id FROM sekolah WHERE kode_sekolah = '02' LIMIT 1)
  );

-- Cek hasilnya setelah update
SELECT k.id, k.siswa_nama, k.status, k.sekolah_id, s.kode_sekolah 
FROM krs k
LEFT JOIN sekolah s ON s.id = k.sekolah_id
ORDER BY k.updated_at DESC;
