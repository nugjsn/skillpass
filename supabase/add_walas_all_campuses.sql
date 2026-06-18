-- ===================================================================
-- Menambahkan Walas (Wali Kelas) untuk semua kampus (01, 02, 03, asy-syarif)
-- Masing-masing kampus akan dibedakan berdasarkan nama dan kelasnya
-- ===================================================================

DO $$
DECLARE
    rec_sekolah RECORD;
    rec_jur RECORD;
    v_username text;
    v_name text;
    v_kelas text;
    v_jur_alias text;
BEGIN
    -- Loop melalui semua sekolah/kampus yang ada di database
    FOR rec_sekolah IN SELECT id, kode_sekolah, nama_sekolah FROM public.sekolah LOOP
        
        -- Loop melalui jurusan yang ada. 
        -- Mengambil jurusan yang spesifik untuk sekolah tersebut, atau jurusan default (01) jika bisa di-share.
        FOR rec_jur IN 
            SELECT id, nama_jurusan 
            FROM public.jurusan 
            WHERE sekolah_id = rec_sekolah.id 
               OR sekolah_id = (SELECT id FROM public.sekolah WHERE kode_sekolah = '01' LIMIT 1) 
               OR sekolah_id IS NULL
        LOOP
            
            -- Membuat alias jurusan untuk username (misal: "Teknik Mesin" -> "mesin")
            v_jur_alias := replace(lower(rec_jur.nama_jurusan), 'teknik ', '');
            v_jur_alias := replace(v_jur_alias, ' ', '_');

            -- Format data walas agar berbeda tiap kampus
            v_username := 'walas_' || v_jur_alias || '_' || replace(rec_sekolah.kode_sekolah, '-', '_');
            v_name := 'Walas ' || rec_jur.nama_jurusan || ' Kampus ' || upper(rec_sekolah.kode_sekolah);
            v_kelas := 'XI ' || upper(v_jur_alias) || ' (' || rec_sekolah.kode_sekolah || ')';

            -- Insert atau Update data wali kelas
            INSERT INTO public.users (username, password, name, role, kelas, jurusan_id, sekolah_id)
            VALUES (
                v_username, 
                '123', -- Default password
                v_name, 
                'wali_kelas', 
                v_kelas, 
                rec_jur.id, 
                rec_sekolah.id
            )
            ON CONFLICT (username) DO UPDATE SET 
                name = EXCLUDED.name, 
                kelas = EXCLUDED.kelas,
                jurusan_id = EXCLUDED.jurusan_id, 
                sekolah_id = EXCLUDED.sekolah_id,
                role = EXCLUDED.role;
                
        END LOOP;
    END LOOP;
END $$;
