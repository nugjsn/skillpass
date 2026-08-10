-- ===================================================================
-- FIX: Sinkronisasi jurusan_id KRS & Siswa Mekatronika 02 Pati
-- Root cause: KRS & siswa masih pakai jurusan_id lama (550e8400...)
-- sedangkan guru prod_mekatronika sudah pakai UUID baru (a6adfe59...)
-- ===================================================================

-- ===================================================================
-- CEK DULU: Pastikan kedua UUID ini valid di tabel jurusan
-- ===================================================================
SELECT j.id, j.nama_jurusan, j.sekolah_id, s.kode_sekolah
FROM jurusan j
LEFT JOIN sekolah s ON s.id = j.sekolah_id
WHERE j.id IN (
    '550e8400-e29b-41d4-a716-446655440009',
    'a6adfe59-f75f-41fd-8d24-41d3e390ce06'
);

-- ===================================================================
-- CEK SISWA: Berapa banyak siswa yang pakai jurusan_id lama?
-- ===================================================================
SELECT si.id, si.nama, si.kelas, si.jurusan_id, s.kode_sekolah
FROM siswa si
LEFT JOIN sekolah s ON s.id = si.sekolah_id
WHERE si.jurusan_id = '550e8400-e29b-41d4-a716-446655440009';

-- ===================================================================
-- CEK KRS: Berapa KRS yang pakai jurusan_id lama?
-- ===================================================================
SELECT k.id, k.siswa_nama, k.kelas, k.status, k.jurusan_id, s.kode_sekolah
FROM krs k
LEFT JOIN sekolah s ON s.id = k.sekolah_id
WHERE k.jurusan_id = '550e8400-e29b-41d4-a716-446655440009';

-- ===================================================================
-- FIX 1: Update jurusan_id KRS → pakai UUID guru (a6adfe59...)
-- Hanya untuk KRS yang jurusan_id-nya masih pakai UUID lama
-- ===================================================================
UPDATE krs
SET jurusan_id = 'a6adfe59-f75f-41fd-8d24-41d3e390ce06',
    updated_at = NOW()
WHERE jurusan_id = '550e8400-e29b-41d4-a716-446655440009';

-- ===================================================================
-- FIX 2: Update jurusan_id siswa → pakai UUID guru (a6adfe59...)
-- Agar KRS yang dibuat berikutnya juga pakai UUID yang benar
-- ===================================================================
UPDATE siswa
SET jurusan_id = 'a6adfe59-f75f-41fd-8d24-41d3e390ce06'
WHERE jurusan_id = '550e8400-e29b-41d4-a716-446655440009';

-- ===================================================================
-- VERIFIKASI FINAL: Cek apakah sekarang sudah cocok
-- ===================================================================
SELECT
    'KRS jurusan_id'  AS sumber,
    k.jurusan_id      AS jurusan_id_value,
    j.nama_jurusan,
    s.kode_sekolah
FROM krs k
LEFT JOIN jurusan j ON j.id = k.jurusan_id
LEFT JOIN sekolah s ON s.id = k.sekolah_id
WHERE k.siswa_nama ILIKE '%abellia%'

UNION ALL

SELECT
    'GURU jurusan_id' AS sumber,
    u.jurusan_id      AS jurusan_id_value,
    j.nama_jurusan,
    s.kode_sekolah
FROM users u
LEFT JOIN jurusan j ON j.id = u.jurusan_id
LEFT JOIN sekolah s ON s.id = u.sekolah_id
WHERE u.username = 'prod_mekatronika';

-- Jika kedua jurusan_id_value sudah SAMA = fix berhasil ✅
-- Login ulang sebagai prod_mekatronika dan KRS Abellia akan muncul
