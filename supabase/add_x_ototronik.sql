-- Menambahkan Jurusan Ototronik jika belum ada
INSERT INTO jurusan (id, nama_jurusan, icon, deskripsi)
VALUES ('550e8400-e29b-41d4-a716-446655440010', 'Teknik Ototronik', 'Car', 'Sistem elektronik otomotif')
ON CONFLICT (id) DO NOTHING;

-- Menambahkan Siswa Ototronik
INSERT INTO siswa (id, nisn, nama, kelas, jurusan_id, wa_number)
VALUES ('s-j9-user', '92345', 'Siswa Ototronik', 'X OTOTRONIK 1', '550e8400-e29b-41d4-a716-446655440010', '628123456797')
ON CONFLICT (id) DO NOTHING;

-- Inisialisasi SkillSiswa untuk Siswa Ototronik
INSERT INTO skill_siswa (id, siswa_id, level_id, skor, poin)
VALUES ('ss-siswa-ototronik', 's-j9-user', 'b0000000-0000-0000-0000-000000000001', 10, 50)
ON CONFLICT (id) DO NOTHING;
