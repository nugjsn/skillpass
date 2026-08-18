-- ==========================================================
-- SCRIPT: FIX RLS PERMISSIONS & CLEANUP RESET SISWA
-- ==========================================================

-- 1. Buka izin DELETE untuk competency_history
ALTER TABLE public.competency_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can delete competency_history" ON public.competency_history;
CREATE POLICY "Public can delete competency_history"
ON public.competency_history
FOR DELETE
TO public
USING (true);

-- 2. Buka izin DELETE, UPDATE, INSERT, SELECT untuk krs
ALTER TABLE public.krs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can delete krs" ON public.krs;
CREATE POLICY "Public can delete krs"
ON public.krs
FOR DELETE
TO public
USING (true);

DROP POLICY IF EXISTS "Public can update krs" ON public.krs;
CREATE POLICY "Public can update krs"
ON public.krs
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert krs" ON public.krs;
CREATE POLICY "Public can insert krs"
ON public.krs
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view krs" ON public.krs;
CREATE POLICY "Public can view krs"
ON public.krs
FOR SELECT
TO public
USING (true);

-- 3. Bersihkan data riwayat & KRS untuk siswa yang skornya 0 (seperti Ahnaf yang baru saja di-reset)
DELETE FROM public.competency_history
WHERE siswa_id IN (
    SELECT s.id 
    FROM public.siswa s
    JOIN public.skill_siswa ss ON ss.siswa_id = s.id
    WHERE ss.skor = 0
);

DELETE FROM public.krs
WHERE siswa_id IN (
    SELECT s.id 
    FROM public.siswa s
    JOIN public.skill_siswa ss ON ss.siswa_id = s.id
    WHERE ss.skor = 0
);

-- Selesai!
