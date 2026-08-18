-- ==========================================================
-- TABLE: student_projects (Portofolio Proyek & Prestasi Lomba Siswa)
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.student_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id UUID NOT NULL REFERENCES public.siswa(id) ON DELETE CASCADE,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(50) NOT NULL DEFAULT 'project', -- 'project' atau 'lomba'
    juara VARCHAR(150), -- misal: 'Juara 1 Tingkat Nasional', 'Juara 2', 'Best Innovation', dsb.
    anggota TEXT NOT NULL, -- Nama-nama siswa anggota tim / yang ikut project
    deskripsi TEXT,
    tanggal DATE DEFAULT CURRENT_DATE,
    foto_dokumentasi TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat query berdasarkan siswa_id
CREATE INDEX IF NOT EXISTS idx_student_projects_siswa_id ON public.student_projects(siswa_id);

-- Aktifkan RLS
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS (Kompatibel dengan Custom Auth / Public)
DROP POLICY IF EXISTS "Public can view student_projects" ON public.student_projects;
CREATE POLICY "Public can view student_projects"
ON public.student_projects
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Public can insert student_projects" ON public.student_projects;
CREATE POLICY "Public can insert student_projects"
ON public.student_projects
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update student_projects" ON public.student_projects;
CREATE POLICY "Public can update student_projects"
ON public.student_projects
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete student_projects" ON public.student_projects;
CREATE POLICY "Public can delete student_projects"
ON public.student_projects
FOR DELETE
TO public
USING (true);
