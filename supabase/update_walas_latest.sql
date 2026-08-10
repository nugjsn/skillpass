-- ===================================================================
-- Update Wali Kelas accounts: Data Terbaru TA 2026/2027
-- Berdasarkan data terbaru (foto tabel wali kelas per kampus)
-- Script ini MENGHAPUS walas lama untuk Kampus MM2100 dan Kampus 03,
-- kemudian memasukkan data baru.
-- Kampus 02 Pati TIDAK diubah.
-- ===================================================================

-- ===================================================================
-- JURUSAN IDs (referensi)
-- MESIN    : 550e8400-e29b-41d4-a716-446655440001
-- TKR      : 550e8400-e29b-41d4-a716-446655440002
-- TSM      : 550e8400-e29b-41d4-a716-446655440003
-- ELIND    : 550e8400-e29b-41d4-a716-446655440004
-- LISTRIK  : 550e8400-e29b-41d4-a716-446655440005
-- TKI/KIMIA: 550e8400-e29b-41d4-a716-446655440006
-- AKUNTANSI: 550e8400-e29b-41d4-a716-446655440007
-- HOTEL    : 550e8400-e29b-41d4-a716-446655440008
-- ===================================================================

-- LANGKAH 1: Hapus walas Kampus MM2100 dan Kampus 03 lama
-- (Identifikasi berdasarkan username suffix _03 atau tanpa suffix khusus 02)
DELETE FROM public.users
WHERE role = 'wali_kelas'
  AND username NOT LIKE '%_02';

-- LANGKAH 2: Insert semua data Wali Kelas baru

INSERT INTO public.users (username, password, name, role, kelas, jurusan_id)
VALUES

-- ==========================================
-- KAMPUS MM2100
-- ==========================================

-- X CLASSES (Kampus MM2100)
('walas_nasrul_x_tsm1',    '123', 'Ahmad Nasrul, S.Pd',                  'wali_kelas', 'X TSM 1',    '550e8400-e29b-41d4-a716-446655440003'),
('walas_bagus_x_tsm2',     '123', 'Bagus Indra Permana',                 'wali_kelas', 'X TSM 2',    '550e8400-e29b-41d4-a716-446655440003'),
('walas_serli_x_tkr1',     '123', 'Serli Aprodita, S.S',                 'wali_kelas', 'X TKR 1',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_joko_x_tkr2',      '123', 'Joko Setyo Nugroho, S.T.',            'wali_kelas', 'X TKR 2',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_dwi_x_mesin1',     '123', 'Dwi Nugroho, S.T.',                   'wali_kelas', 'X MESIN 1',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_dwi_x_mesin2',     '123', 'Dwi Nugroho, S.T.',                   'wali_kelas', 'X MESIN 2',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_yuda_x_mesin3',    '123', 'Yuda Putra Utama',                    'wali_kelas', 'X MESIN 3',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_aula_x_ak1',       '123', 'Aula Al Layali, S.Pd',                'wali_kelas', 'X AK 1',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_alifiyah_x_ak2',   '123', 'Alifiyah Azzahra, S.Pd / Aula',      'wali_kelas', 'X AK 2',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_yurika_x_ak3',     '123', 'Yurika Mayumi Yuliana Kusnadi',       'wali_kelas', 'X AK 3',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_deden_x_elin1',    '123', 'Mochammad Deden Nuriyana',            'wali_kelas', 'X ELIND 1',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_feri_x_elin2',     '123', 'Feri Hapsara, S.Pd. Gr',             'wali_kelas', 'X ELIND 2',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_feri_x_elin3',     '123', 'Feri Hapsara, S.Pd. Gr',             'wali_kelas', 'X ELIND 3',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_suhaimi_x_elin4',  '123', 'Ahmad Suhaimi, S.Pd',                'wali_kelas', 'X ELIND 4',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_heas_x_elin5',     '123', 'Heas Priyo Wicaksono, S.Pd.,Gr',     'wali_kelas', 'X ELIND 5',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_astri_x_lis1',     '123', 'Astri Afmi Wulandari, S.Pd',         'wali_kelas', 'X LISTRIK 1','550e8400-e29b-41d4-a716-446655440005'),
('walas_abdulharis_x_lis2','123', 'Abdul Haris Safa''adi',              'wali_kelas', 'X LISTRIK 2','550e8400-e29b-41d4-a716-446655440005'),
('walas_ambar_x_hotel1',   '123', 'Ambar Tri Laksono, S.Pd.,Gr.',       'wali_kelas', 'X PERHOTEL 1','550e8400-e29b-41d4-a716-446655440008'),
('walas_diva_x_hotel2',    '123', 'Diva Alysha',                         'wali_kelas', 'X PERHOTEL 2','550e8400-e29b-41d4-a716-446655440008'),
('walas_ressa_x_tki1',     '123', 'Ressa Hadi Purwoko, S.Pd',           'wali_kelas', 'X TKI 1',    '550e8400-e29b-41d4-a716-446655440006'),
('walas_maharani_x_tki2',  '123', 'Maharani',                            'wali_kelas', 'X TKI 2',    '550e8400-e29b-41d4-a716-446655440006'),

-- XI CLASSES (Kampus MM2100)
('walas_fadly_xi_tsm1',    '123', 'Fadly Narendra U, S.Pd',             'wali_kelas', 'XI TSM 1',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_fadly_xi_tsm2',    '123', 'Fadly Narendra U, S.Pd',             'wali_kelas', 'XI TSM 2',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_purnomo_xi_tkr1',  '123', 'Purnomo, S.Pd.I',                    'wali_kelas', 'XI TKR 1',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_munandar_xi_tkr2', '123', 'Munandar, S.Pd',                     'wali_kelas', 'XI TKR 2',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_sultan_xi_tkr3',   '123', 'Sultan Saladin',                      'wali_kelas', 'XI TKR 3',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_gesti_xi_mesin1',  '123', 'Gesti Khoriunnisa',                   'wali_kelas', 'XI MESIN 1', '550e8400-e29b-41d4-a716-446655440001'),
('walas_esa_xi_mesin2',    '123', 'Esa Apriadi, S.Pd',                  'wali_kelas', 'XI MESIN 2', '550e8400-e29b-41d4-a716-446655440001'),
('walas_dikky_xi_mesin3',  '123', 'M. Dikky Apri Setia Nugraha S.Pd',   'wali_kelas', 'XI MESIN 3', '550e8400-e29b-41d4-a716-446655440001'),
('walas_viany_xi_ak1',     '123', 'Viany Lingga Revi, S.E',             'wali_kelas', 'XI AK 1',    '550e8400-e29b-41d4-a716-446655440007'),
('walas_devin_xi_ak2',     '123', 'Devin Eldwin, S.Ak',                 'wali_kelas', 'XI AK 2',    '550e8400-e29b-41d4-a716-446655440007'),
('walas_viany_xi_ak3',     '123', 'Viany Lingga Revi, S.E',             'wali_kelas', 'XI AK 3',    '550e8400-e29b-41d4-a716-446655440007'),
('walas_amalia_xi_titl1',  '123', 'Amalia Dewi Lestari, S.Pd',          'wali_kelas', 'XI TITL 1',  '550e8400-e29b-41d4-a716-446655440005'),
('walas_amalia_xi_titl2',  '123', 'Amalia Dewi Lestari, S.Pd',          'wali_kelas', 'XI TITL 2',  '550e8400-e29b-41d4-a716-446655440005'),
('walas_septi_xi_elin1',   '123', 'Septiawan Filtra Santosa, S.Pd, Gr', 'wali_kelas', 'XI ELIND 1', '550e8400-e29b-41d4-a716-446655440004'),
('walas_septi_xi_elin2',   '123', 'Septiawan Filtra Santosa, S.Pd, Gr', 'wali_kelas', 'XI ELIND 2', '550e8400-e29b-41d4-a716-446655440004'),
('walas_iqbal_xi_elin3',   '123', 'Muhamad Iqbal, S.Pd',                'wali_kelas', 'XI ELIND 3', '550e8400-e29b-41d4-a716-446655440004'),
('walas_maris_xi_elin4',   '123', 'Maris Catur Dwi Pratiwi',            'wali_kelas', 'XI ELIND 4', '550e8400-e29b-41d4-a716-446655440004'),
('walas_maris_xi_elin5',   '123', 'Maris Catur Dwi Pratiwi',            'wali_kelas', 'XI ELIND 5', '550e8400-e29b-41d4-a716-446655440004'),
('walas_haya_xi_tki1',     '123', 'Haya Suhaela, S.Pd',                 'wali_kelas', 'XI TKI 1',   '550e8400-e29b-41d4-a716-446655440006'),
('walas_haya_xi_tki2',     '123', 'Haya Suhaela, S.Pd',                 'wali_kelas', 'XI TKI 2',   '550e8400-e29b-41d4-a716-446655440006'),
('walas_iwan_xi_hotel',    '123', 'Iwan Sutiawan',                       'wali_kelas', 'XI HOTEL',   '550e8400-e29b-41d4-a716-446655440008'),

-- XII CLASSES (Kampus MM2100)
('walas_tri_xii_tsm1',           '123', 'Tri Lestari, S.Pd',             'wali_kelas', 'XII TSM 1',    '550e8400-e29b-41d4-a716-446655440003'),
('walas_nanda_xii_tsm2',         '123', 'Nanda Diansyah, S.Pd',          'wali_kelas', 'XII TSM 2',    '550e8400-e29b-41d4-a716-446655440003'),
('walas_dede_xii_tsm3',          '123', 'Dede Rukmayanti, S.Pd',         'wali_kelas', 'XII TSM 3',    '550e8400-e29b-41d4-a716-446655440003'),
('walas_raihan_xii_elin1',       '123', 'Raihan Nurhakim, S.Pd',         'wali_kelas', 'XII ELIND 1',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_eldha_xii_elin2',        '123', 'Eldha Luvy Zha, A.Md',          'wali_kelas', 'XII ELIND 2',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_azzam_xii_elin3',        '123', 'Azzam Izzudin Ramadhan, S.Pd',  'wali_kelas', 'XII ELIND 3',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_azzam_xii_elin4',        '123', 'Azzam Izzudin Ramadhan, S.Pd',  'wali_kelas', 'XII ELIND 4',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_fadli_xii_elin5',        '123', 'M. Fadli Maulana, S.Pd',        'wali_kelas', 'XII ELIND 5',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_tidtaya_xii_elin6',      '123', 'Tidtaya Puteri Larasanty',       'wali_kelas', 'XII ELIND 6',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_salsa_xii_elin7',        '123', 'Salsa fatia Azhar',              'wali_kelas', 'XII ELIND 7',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_nurmayanti_xii_elin8',   '123', 'Nurmayanti, S.Kom',              'wali_kelas', 'XII ELIND 8',  '550e8400-e29b-41d4-a716-446655440004'),
('walas_tisul_xii_titl1',        '123', 'Tri Sulistyaningsih, S.S',       'wali_kelas', 'XII TITL 1',   '550e8400-e29b-41d4-a716-446655440005'),
('walas_aldy_xii_titl2',         '123', 'M. Aldy Akbar Suopriadi, S.Pd', 'wali_kelas', 'XII TITL 2',   '550e8400-e29b-41d4-a716-446655440005'),
('walas_azhari_xii_mesin1',      '123', 'Azhari Budiriyanto, S.Pd',       'wali_kelas', 'XII MESIN 1',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_tini_xii_mesin2',        '123', 'Tini Nurmala, S.Pd',             'wali_kelas', 'XII MESIN 2',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_azhari_xii_mesin3',      '123', 'Azhari Budiriyanto, S.Pd',       'wali_kelas', 'XII MESIN 3',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_nia_xii_mesin4',         '123', 'Nia Desnata Hati, S.Pd',         'wali_kelas', 'XII MESIN 4',  '550e8400-e29b-41d4-a716-446655440001'),
('walas_hafidz_xii_tkr1',        '123', 'M. Hafidz Ghufron, S.Pd',        'wali_kelas', 'XII TKR 1',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_dodi_xii_tkr2',          '123', 'Dodi Perdana Putra, S.Pd',       'wali_kelas', 'XII TKR 2',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_hafidz_xii_tkr3',        '123', 'M. Hafidz Ghufron, S.Pd',        'wali_kelas', 'XII TKR 3',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_trisno_xii_tkr4',        '123', 'Trisno Ngestuti, S.Pd',          'wali_kelas', 'XII TKR 4',    '550e8400-e29b-41d4-a716-446655440002'),
('walas_isti_xii_tki1',          '123', 'Istiqomah, S.Pd',                'wali_kelas', 'XII TKI 1',    '550e8400-e29b-41d4-a716-446655440006'),
('walas_isti_xii_tki2',          '123', 'Istiqomah, S.Pd',                'wali_kelas', 'XII TKI 2',    '550e8400-e29b-41d4-a716-446655440006'),
('walas_retno_xii_ak1',          '123', 'Retno Dwi Astuti',               'wali_kelas', 'XII AK 1',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_retno_xii_ak2',          '123', 'Retno Dwi Astuti',               'wali_kelas', 'XII AK 2',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_fuji_xii_ak3',           '123', 'Fuji Sampan Sujana, S.Pd',       'wali_kelas', 'XII AK 3',     '550e8400-e29b-41d4-a716-446655440007'),
('walas_putri_xii_hotel',        '123', 'Putri Nur Azizah, S.S',          'wali_kelas', 'XII HOTEL',    '550e8400-e29b-41d4-a716-446655440008'),

-- ==========================================
-- KAMPUS 03
-- ==========================================

-- X CLASSES (Kampus 03)
('walas_hafidz_x_tsm1_03',  '123', 'Muhamad Hafidz Firdaus Priatama, S.Pd', 'wali_kelas', 'X TSM 1 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_hafidz_x_tsm2_03',  '123', 'Muhamad Hafidz Firdaus Priatama, S.Pd', 'wali_kelas', 'X TSM 2 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_nida_x_tkr1_03',    '123', 'Nida Apriliatul Hasanah, S.Pd',         'wali_kelas', 'X TKR 1 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_maulana_x_tkr2_03', '123', 'Maulana Evendi',                         'wali_kelas', 'X TKR 2 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_dafiq_x_mesin1_03', '123', 'Ah. Dafiq Najiyullah, S.Pd.I',          'wali_kelas', 'X MESIN 1 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_yanda_x_mesin2_03', '123', 'Yanda Eko Putra, S.Pd',                 'wali_kelas', 'X MESIN 2 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_yanda_x_mesin3_03', '123', 'Yanda Eko Putra, S.Pd',                 'wali_kelas', 'X MESIN 3 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_dwifajar_x_ak1_03', '123', 'Dwi fajar, S.Pd',                       'wali_kelas', 'X AK 1 03',    '550e8400-e29b-41d4-a716-446655440007'),
('walas_dwifajar_x_ak2_03', '123', 'Dwi fajar, S.Pd',                       'wali_kelas', 'X AK 2 03',    '550e8400-e29b-41d4-a716-446655440007'),
('walas_syaifulloh_x_elin1_03', '123', 'Syaifulloh, S.Pd',                  'wali_kelas', 'X ELIND 1 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_syaifulloh_x_elin2_03', '123', 'Syaifulloh, S.Pd',                  'wali_kelas', 'X ELIND 2 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_teguh_x_elin3_03',  '123', 'M. Teguh Suprihatin, S.Psi',            'wali_kelas', 'X ELIND 3 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_teguh_x_elin4_03',  '123', 'M. Teguh Suprihatin, S.Psi',            'wali_kelas', 'X ELIND 4 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_sukma_x_elin5_03',  '123', 'Sukma Dwiaugita',                        'wali_kelas', 'X ELIND 5 03', '550e8400-e29b-41d4-a716-446655440004'),

-- XI CLASSES (Kampus 03)
('walas_tiara_xi_tsm1_03',   '123', 'Tiara Kusuma Dewi',                    'wali_kelas', 'XI TSM 1 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_ditta_xi_tsm2_03',   '123', 'Ditta Oktaviani',                      'wali_kelas', 'XI TSM 2 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_syafrudin_xi_tkr1_03','123', 'Syafrudin',                            'wali_kelas', 'XI TKR 1 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_diah_xi_tkr2_03',    '123', 'Diah Maulias Dewi P, S.Pd',            'wali_kelas', 'XI TKR 2 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_novita_xi_mesin1_03','123', 'Novita Hani Pratiwi, S.T/Pandu',       'wali_kelas', 'XI MESIN 1 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_pandu_xi_mesin2_03', '123', 'Pandu Andariansyah',                   'wali_kelas', 'XI MESIN 2 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_berty_xi_ak_03',     '123', 'Berty Efira F',                         'wali_kelas', 'XI AK 03',      '550e8400-e29b-41d4-a716-446655440007'),
('walas_ihsan_xi_elin1_03',  '123', 'Muhammad Al Ihsan, S.Pd',              'wali_kelas', 'XI ELIND 1 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_adhista_xi_elin2_03','123', 'Adhista Cindy Rahmayani, S.Pd/Eldha',  'wali_kelas', 'XI ELIND 2 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_adhista_xi_elin3_03','123', 'Adhista Cindy Rahmayani, S.Pd',        'wali_kelas', 'XI ELIND 3 03', '550e8400-e29b-41d4-a716-446655440004'),

-- XII CLASSES (Kampus 03)
('walas_arya_xii_tsm4_03',   '123', 'Arya Yudha Satria Tama, S.Pd',        'wali_kelas', 'XII TSM 4 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_arya_xii_tsm5_03',   '123', 'Arya Yudha Satria Tama, S.Pd',        'wali_kelas', 'XII TSM 5 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_heri_xii_tsm6_03',   '123', 'Heri Supriyanto, S.Pd',               'wali_kelas', 'XII TSM 6 03',   '550e8400-e29b-41d4-a716-446655440003'),
('walas_rahmat_xii_tkr5_03', '123', 'Rahmat Hidayat, S.Pd.Gr',             'wali_kelas', 'XII TKR 5 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_adynda_xii_tkr6_03', '123', 'Adynda Ray R, S.Sos',                 'wali_kelas', 'XII TKR 6 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_adynda_xii_tkr7_03', '123', 'Adynda Ray R, S.Sos',                 'wali_kelas', 'XII TKR 7 03',   '550e8400-e29b-41d4-a716-446655440002'),
('walas_ayu_xii_mesin5_03',  '123', 'Ayu Warestu, S.Pd',                   'wali_kelas', 'XII MESIN 5 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_intan_xii_mesin6_03','123', 'Intan Chaya Ningtyas',                 'wali_kelas', 'XII MESIN 6 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_intan_xii_mesin7_03','123', 'Intan Chaya Ningtyas',                 'wali_kelas', 'XII MESIN 7 03', '550e8400-e29b-41d4-a716-446655440001'),
('walas_danu_xii_elin9_03',  '123', 'Danu Purwanto, S.Pd',                 'wali_kelas', 'XII ELIND 9 03', '550e8400-e29b-41d4-a716-446655440004'),
('walas_ridwan_xii_elin10_03','123','Ridwan, S.Pd',                          'wali_kelas', 'XII ELIND 10 03','550e8400-e29b-41d4-a716-446655440004'),
('walas_noval_xii_elin11_03','123', 'Noval Al Mahdy, S.Pd',                 'wali_kelas', 'XII ELIND 11 03','550e8400-e29b-41d4-a716-446655440004'),
('walas_cecep_xii_elin12_03','123', 'Cecep Bemana Sakti G, S.Pd',           'wali_kelas', 'XII ELIND 12 03','550e8400-e29b-41d4-a716-446655440004'),
('walas_diah_xii_ak4_03',    '123', 'Diah Maulias Dewi P, S.Pd',           'wali_kelas', 'XII AK 4 03',    '550e8400-e29b-41d4-a716-446655440007')

ON CONFLICT (username) DO UPDATE SET
    name    = EXCLUDED.name,
    kelas   = EXCLUDED.kelas,
    jurusan_id = EXCLUDED.jurusan_id,
    role    = EXCLUDED.role;

-- ==========================================
-- KAMPUS 02 PATI (tidak diubah - dipertahankan dari script sebelumnya)
-- ==========================================
-- X CLASSES (Kampus 02)
INSERT INTO public.users (username, password, name, role, kelas, jurusan_id)
VALUES
    ('walas_wasful_x_meka1_02',     '123', 'Wasful Aulia',            'wali_kelas', 'X MEKA 1',   '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_sukoco_x_meka2_02',     '123', 'Sukoco',                  'wali_kelas', 'X MEKA 2',   '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_trisa_x_meka3_02',      '123', 'Trisa Mariyani',          'wali_kelas', 'X MEKA 3',   '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_ilham_x_mesin1_02',     '123', 'Ilham Agum F. Anggesa',   'wali_kelas', 'X MESIN 1',  '550e8400-e29b-41d4-a716-446655440001'),
    ('walas_aprilia_x_mesin2_02',   '123', 'Aprilia Nimah Akasah',    'wali_kelas', 'X MESIN 2',  '550e8400-e29b-41d4-a716-446655440001'),
    ('walas_gesit_x_oto1_02',       '123', 'Gesit Nandaru Aji',       'wali_kelas', 'X OTO 1',    '550e8400-e29b-41d4-a716-446655440010'),
    ('walas_amirudin_x_oto2_02',    '123', 'Amirudin Fatah',          'wali_kelas', 'X OTO 2',    '550e8400-e29b-41d4-a716-446655440010'),
    ('walas_yusuf_x_anim1_02',      '123', 'Yusuf Wahyu Putra P',     'wali_kelas', 'X ANIM 1',   '550e8400-e29b-41d4-a716-446655440011'),
    ('walas_erika_x_anim2_02',      '123', 'Erika Chairun Nissa',     'wali_kelas', 'X ANIM 2',   '550e8400-e29b-41d4-a716-446655440011'),
    -- XI CLASSES (Kampus 02)
    ('walas_tripuji_xi_meka1_02',   '123', 'Tri Puji Lestari',        'wali_kelas', 'XI MEKA 1',  '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_aimfathilah_xi_meka2_02','123','Aimfathilah S',            'wali_kelas', 'XI MEKA 2',  '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_ilham_xi_mesin1_02',    '123', 'Ilham Agum F. Anggesa',   'wali_kelas', 'XI MESIN 1', '550e8400-e29b-41d4-a716-446655440001'),
    ('walas_gani_xi_mesin2_02',     '123', 'Gani Mubyarto',           'wali_kelas', 'XI MESIN 2', '550e8400-e29b-41d4-a716-446655440001'),
    ('walas_ahmad_xi_oto_02',       '123', 'Ahmad August Jisa P',     'wali_kelas', 'XI OTO',     '550e8400-e29b-41d4-a716-446655440010'),
    ('walas_trisa_xi_animasi_02',   '123', 'Trisa Mariyani',          'wali_kelas', 'XI ANIMASI', '550e8400-e29b-41d4-a716-446655440011'),
    -- XII CLASSES (Kampus 02)
    ('walas_sukoco_xii_meka_02',    '123', 'Sukoco',                  'wali_kelas', 'XII MEKA',   '550e8400-e29b-41d4-a716-446655440009'),
    ('walas_syahrul_xii_mesin1_02', '123', 'Syahrul Gilang Ramdhan',  'wali_kelas', 'XII MESIN 1','550e8400-e29b-41d4-a716-446655440001'),
    ('walas_fathur_xii_mesin2_02',  '123', 'Moh. Fathurrohman',       'wali_kelas', 'XII MESIN 2','550e8400-e29b-41d4-a716-446655440001'),
    ('walas_sahroni_xii_oto_02',    '123', 'Muhammad Sahroni',        'wali_kelas', 'XII OTO',    '550e8400-e29b-41d4-a716-446655440010'),
    ('walas_dhita_xii_anim1_02',    '123', 'Dhita Ayu S',             'wali_kelas', 'XII ANIM 1', '550e8400-e29b-41d4-a716-446655440011'),
    ('walas_tripuji_xii_anim2_02',  '123', 'Tri Puji Lestari',        'wali_kelas', 'XII ANIM 2', '550e8400-e29b-41d4-a716-446655440011')
ON CONFLICT (username) DO UPDATE SET
    name    = EXCLUDED.name,
    kelas   = EXCLUDED.kelas,
    jurusan_id = EXCLUDED.jurusan_id,
    role    = EXCLUDED.role;
