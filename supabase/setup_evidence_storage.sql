-- =====================================================
-- Setup Storage Bucket: student-photos
-- Untuk menyimpan foto profil siswa dan bukti ujian
-- Jalankan script ini di Supabase SQL Editor
-- =====================================================

-- 1. Buat bucket student-photos (jika belum ada)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'student-photos',
    'student-photos',
    true,  -- Public bucket agar foto bisa diakses tanpa auth
    204800,  -- 200KB max per file (foto profil siswa)
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 204800;

-- 2. Hapus policy lama jika ada (untuk fresh setup)
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own uploads" ON storage.objects;

-- 3. Policy: Semua orang bisa membaca file (public)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-photos');

-- 4. Policy: User yang login bisa upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'student-photos'
    AND auth.role() = 'authenticated'
);

-- 5. Policy: User yang login bisa update file
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'student-photos'
    AND auth.role() = 'authenticated'
);

-- 6. Policy: User yang login bisa hapus file
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'student-photos'
    AND auth.role() = 'authenticated'
);

-- =====================================================
-- Verifikasi setup berhasil:
-- SELECT * FROM storage.buckets WHERE id = 'student-photos';
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
-- =====================================================
