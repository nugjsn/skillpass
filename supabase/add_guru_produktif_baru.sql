-- Menambahkan akun Guru Produktif untuk jurusan yang sebelumnya belum ada
-- Password default sama dengan username

INSERT INTO users (username, password, name, role, jurusan_id)
SELECT 'prod_animasi', 'prod_animasi', 'Guru Produktif Animasi', 'teacher_produktif', id
FROM jurusan WHERE nama_jurusan = 'Animasi'
LIMIT 1
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, name, role, jurusan_id)
SELECT 'prod_ototronik', 'prod_ototronik', 'Guru Produktif Ototronik', 'teacher_produktif', id
FROM jurusan WHERE nama_jurusan = 'Teknik Ototronik'
LIMIT 1
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, name, role, jurusan_id)
SELECT 'prod_mekatronika', 'prod_mekatronika', 'Guru Produktif Mekatronika', 'teacher_produktif', id
FROM jurusan WHERE nama_jurusan = 'Teknik Mekatronika'
LIMIT 1
ON CONFLICT (username) DO NOTHING;
