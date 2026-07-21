export type UserRole = 'student' | 'teacher_produktif' | 'wali_kelas' | 'hod' | 'admin' | 'teacher';

export interface User {
    id: string;
    username: string;
    password: string;
    name: string;
    role: UserRole;
    jurusan_id?: string;
    kelas?: string;
    nisn?: string;
    avatar_url?: string;
    photo_url?: string;
    sekolah_id?: string;
}

import mockData, { JURUSAN_IDS } from './mockData';

// Mock users for authentication
export const mockUsers: User[] = [
    // Student accounts (one per jurusan)
    { id: 'u-s1', username: 'siswa_mesin', password: '123', name: 'Siswa Mesin', role: 'student', jurusan_id: JURUSAN_IDS.MESIN, avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop' },
    { id: 'u-s2', username: 'siswa_tkr', password: '123', name: 'Siswa TKR', role: 'student', jurusan_id: JURUSAN_IDS.TKR },
    { id: 'u-s3', username: 'siswa_tsm', password: '123', name: 'Siswa TSM', role: 'student', jurusan_id: JURUSAN_IDS.TSM },
    { id: 'u-s4', username: 'siswa_elind', password: '123', name: 'Siswa Elind', role: 'student', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'u-s5', username: 'siswa_listrik', password: '123', name: 'Siswa Listrik', role: 'student', jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'u-s6', username: 'siswa_kimia', password: '123', name: 'Siswa Kimia', role: 'student', jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'u-s7', username: 'siswa_akuntansi', password: '123', name: 'Siswa Akuntansi', role: 'student', jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'u-s8', username: 'siswa_hotel', password: '123', name: 'Siswa Perhotelan', role: 'student', jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'u-s9', username: 'siswa_ototronik', password: '123', name: 'Siswa Ototronik', role: 'student', jurusan_id: JURUSAN_IDS.OTOTRONIK },

    // Teacher accounts (one per jurusan)
    { id: 'u-g1', username: 'guru_mesin', password: '123', name: 'Guru Mesin', role: 'teacher', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'u-g2', username: 'guru_tkr', password: '123', name: 'Guru TKR', role: 'teacher', jurusan_id: JURUSAN_IDS.TKR },
    { id: 'u-g3', username: 'guru_tsm', password: '123', name: 'Guru TSM', role: 'teacher', jurusan_id: JURUSAN_IDS.TSM },
    // New roles for approval workflow testing
    { id: 't1', username: 'guru1', password: '123', name: 'Budi Santoso, S.T.', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 't2', username: 'guru2', password: '123', name: 'Siti Aminah, M.Pd.', role: 'wali_kelas', kelas: 'ALUMNI TKR 1', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 't3', username: 'hod1', password: '123', name: 'Dr. Ir. Heru Prasetyo', role: 'hod', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 't4', username: 'admin', password: '123', name: 'Super Admin', role: 'admin' },
    // Student user for specific testing
    { id: 's-j1-user', username: 'siswa', password: '123', name: 'Raka Aditya', role: 'student', nisn: '0012345678', kelas: 'ALUMNI TKR 1', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'u-g4', username: 'guru_elind', password: '123', name: 'Guru Elind', role: 'teacher', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'u-g5', username: 'guru_listrik', password: '123', name: 'Guru Listrik', role: 'teacher', jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'u-g6', username: 'guru_kimia', password: '123', name: 'Guru Kimia', role: 'teacher', jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'u-g7', username: 'guru_akuntansi', password: '123', name: 'Guru Akuntansi', role: 'teacher', jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'u-g8', username: 'guru_hotel', password: '123', name: 'Guru Perhotelan', role: 'teacher', jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'u-g9', username: 'guru_ototronik', password: '123', name: 'Guru Ototronik', role: 'teacher', jurusan_id: JURUSAN_IDS.OTOTRONIK },

    // Admin teacher (can see all)
    { id: 'u-guru', username: 'guru', password: '123', name: 'Guru', role: 'teacher', photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },

    // Admin account (can edit all departments)
    { id: 'u-admin', username: 'admin', password: '123', name: 'Administrator', role: 'admin' },

    // Akun khusus admin
    { id: 'admin-khusus', username: 'admin_khusus', password: '123', name: 'Admin Khusus', role: 'admin' },

    // HOD Coordinator (can edit all departments)
    { id: 'u-koord-hod', username: 'koord_hod', password: '123', name: 'Aprilia Rahayu Wilujeng, S.Pd Gr', role: 'admin' },

    // HOD Accounts from user request
    { id: 'hod-tsm', username: 'hod_tsm', password: '123', name: 'Okxy Ixganda, S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.TSM },
    { id: 'hod-tkr', username: 'hod_tkr', password: '123', name: 'Abdillah Putra, A.Md', role: 'hod', jurusan_id: JURUSAN_IDS.TKR },
    { id: 'hod-mesin', username: 'hod_mesin', password: '123', name: 'Dwi Nugroho, S.T', role: 'hod', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'hod-elektro', username: 'hod_elektro', password: '123', name: 'Heru Triatmo,S.Pd. Gr', role: 'hod', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'hod-akuntansi', username: 'hod_akuntansi', password: '123', name: 'Kiki Widia Swara,S.Pd. Gr', role: 'hod', jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'hod-hotel', username: 'hod_hotel', password: '123', name: 'Refty Royan Juniarti, S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'hod-tki', username: 'hod_tki', password: '123', name: 'Ryo Maytana, S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'hod-elin03', username: 'hod_elin03', password: '123', name: 'Eldha Luvy Zha, A.Md', role: 'hod', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'hod-tsm03', username: 'hod_tsm03', password: '123', name: 'Heri Supriyanto,S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.TSM },
    { id: 'hod-tkr03', username: 'hod_tkr03', password: '123', name: 'Rahmat Hidayat, S.Pd.Gr', role: 'hod', jurusan_id: JURUSAN_IDS.TKR },
    { id: 't-joko-tkr', username: 'joko_tkr', password: '123', name: 'Joko Setyo Nugroho, S.T', role: 'wali_kelas', kelas: 'ALUMNI TKR 3', jurusan_id: JURUSAN_IDS.TKR },
    { id: 'hod-listrik-astri', username: 'hod_listrik', password: '123', name: 'Astri Afmi Wulandari, S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.LISTRIK },

    // HOD Accounts SMK Mitra Industri 02 Pati
    { id: 'hod-mekatronika-02', username: 'hod_mekatronika_02', password: '123', name: 'Sukoco, S.Pd', role: 'hod', jurusan_id: JURUSAN_IDS.MEKATRONIKA },
    { id: 'hod-mesin-02', username: 'hod_mesin_02', password: '123', name: 'Syahrul Gilang R., S.Tr. T', role: 'hod', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'hod-animasi-02', username: 'hod_animasi_02', password: '123', name: 'M. Iqbal, S.Pd Gr.', role: 'hod', jurusan_id: JURUSAN_IDS.ANIMASI },
    { id: 'hod-ototronik-02', username: 'hod_ototronik_02', password: '123', name: 'Gesit Nandaru Aji, S.T', role: 'hod', jurusan_id: JURUSAN_IDS.OTOTRONIK },


    // Default Teacher Produktif accounts for all majors
    { id: 'p-mesin', username: 'prod_mesin', password: '123', name: 'Guru Produktif Mesin', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'p-tkr', username: 'prod_tkr', password: '123', name: 'Guru Produktif TKR', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.TKR },
    { id: 'p-tsm', username: 'prod_tsm', password: '123', name: 'Guru Produktif TSM', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.TSM },
    { id: 'p-elind', username: 'prod_elind', password: '123', name: 'Guru Produktif Elind', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'p-listrik', username: 'prod_listrik', password: '123', name: 'Guru Produktif Listrik', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'p-kimia', username: 'prod_kimia', password: '123', name: 'Guru Produktif Kimia', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'p-akuntansi', username: 'prod_akuntansi', password: '123', name: 'Guru Produktif Akuntansi', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'p-hotel', username: 'prod_hotel', password: '123', name: 'Guru Produktif Perhotelan', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'p-ototronik', username: 'prod_ototronik', password: '123', name: 'Guru Produktif Ototronik', role: 'teacher_produktif', jurusan_id: JURUSAN_IDS.OTOTRONIK },


    // ==========================================
    // KAMPUS MM2100 - DATA TERBARU
    // ==========================================

    // X CLASSES (MM2100)
    { id: 'mm-w-nasrul-x-tsm1',       username: 'walas_nasrul_x_tsm1',       password: '123', name: 'Ahmad Nasrul, S.Pd',                  role: 'wali_kelas', kelas: 'X TSM 1',     jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-bagus-x-tsm2',        username: 'walas_bagus_x_tsm2',        password: '123', name: 'Bagus Indra Permana',                 role: 'wali_kelas', kelas: 'X TSM 2',     jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-serli-x-tkr1',        username: 'walas_serli_x_tkr1',        password: '123', name: 'Serli Aprodita, S.S',                 role: 'wali_kelas', kelas: 'X TKR 1',     jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-joko-x-tkr2',         username: 'walas_joko_x_tkr2',         password: '123', name: 'Joko Setyo Nugroho, S.Pd',            role: 'wali_kelas', kelas: 'X TKR 2',     jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-dwi-x-mes1',          username: 'walas_dwi_x_mesin1',        password: '123', name: 'Dwi Nugroho, S.T.',                   role: 'wali_kelas', kelas: 'X MESIN 1',   jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-dwi-x-mes2',          username: 'walas_dwi_x_mesin2',        password: '123', name: 'Dwi Nugroho, S.T.',                   role: 'wali_kelas', kelas: 'X MESIN 2',   jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-yuda-x-mes3',         username: 'walas_yuda_x_mesin3',       password: '123', name: 'Yuda Putra Utama',                    role: 'wali_kelas', kelas: 'X MESIN 3',   jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-aula-x-ak1',          username: 'walas_aula_x_ak1',          password: '123', name: 'Aula Al Layali, S.Pd',                role: 'wali_kelas', kelas: 'X AK 1',      jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-alifiyah-x-ak2',      username: 'walas_alifiyah_x_ak2',      password: '123', name: 'Alifiyah Azzahra, S.Pd / Aula',      role: 'wali_kelas', kelas: 'X AK 2',      jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-yurika-x-ak3',        username: 'walas_yurika_x_ak3',        password: '123', name: 'Yurika Mayumi Yuliana Kusnadi',       role: 'wali_kelas', kelas: 'X AK 3',      jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-deden-x-elin1',       username: 'walas_deden_x_elin1',       password: '123', name: 'Mochammad Deden Nuriyana',            role: 'wali_kelas', kelas: 'X ELIND 1',   jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-feri-x-elin2',        username: 'walas_feri_x_elin2',        password: '123', name: 'Feri Hapsara, S.Pd. Gr',             role: 'wali_kelas', kelas: 'X ELIND 2',   jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-feri-x-elin3',        username: 'walas_feri_x_elin3',        password: '123', name: 'Feri Hapsara, S.Pd. Gr',             role: 'wali_kelas', kelas: 'X ELIND 3',   jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-suhaimi-x-elin4',     username: 'walas_suhaimi_x_elin4',     password: '123', name: 'Ahmad Suhaimi, S.Pd',                role: 'wali_kelas', kelas: 'X ELIND 4',   jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-heas-x-elin5',        username: 'walas_heas_x_elin5',        password: '123', name: 'Heas Priyo Wicaksono, S.Pd.,Gr',     role: 'wali_kelas', kelas: 'X ELIND 5',   jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-astri-x-lis1',        username: 'walas_astri_x_lis1',        password: '123', name: 'Astri Afmi Wulandari, S.Pd',         role: 'wali_kelas', kelas: 'X LISTRIK 1', jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-abdulharis-x-lis2',   username: 'walas_abdulharis_x_lis2',   password: '123', name: "Abdul Haris Safa'adi",               role: 'wali_kelas', kelas: 'X LISTRIK 2', jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-ambar-x-hotel1',      username: 'walas_ambar_x_hotel1',      password: '123', name: 'Ambar Tri Laksono, S.Pd.,Gr.',       role: 'wali_kelas', kelas: 'X PERHOTEL 1',jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'mm-w-diva-x-hotel2',       username: 'walas_diva_x_hotel2',       password: '123', name: 'Diva Alysha',                         role: 'wali_kelas', kelas: 'X PERHOTEL 2',jurusan_id: JURUSAN_IDS.HOTEL },
    { id: 'mm-w-ressa-x-tki1',        username: 'walas_ressa_x_tki1',        password: '123', name: 'Ressa Hadi Purwoko, S.Pd',           role: 'wali_kelas', kelas: 'X TKI 1',     jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'mm-w-maharani-x-tki2',     username: 'walas_maharani_x_tki2',     password: '123', name: 'Maharani',                            role: 'wali_kelas', kelas: 'X TKI 2',     jurusan_id: JURUSAN_IDS.KIMIA },

    // XI CLASSES (MM2100)
    { id: 'mm-w-fadly-xi-tsm1',       username: 'walas_fadly_xi_tsm1',       password: '123', name: 'Fadly Narendra U, S.Pd',             role: 'wali_kelas', kelas: 'XI TSM 1',    jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-fadly-xi-tsm2',       username: 'walas_fadly_xi_tsm2',       password: '123', name: 'Fadly Narendra U, S.Pd',             role: 'wali_kelas', kelas: 'XI TSM 2',    jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-purnomo-xi-tkr1',     username: 'walas_purnomo_xi_tkr1',     password: '123', name: 'Purnomo, S.Pd.I',                    role: 'wali_kelas', kelas: 'XI TKR 1',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-munandar-xi-tkr2',    username: 'walas_munandar_xi_tkr2',    password: '123', name: 'Munandar, S.Pd',                     role: 'wali_kelas', kelas: 'XI TKR 2',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-sultan-xi-tkr3',      username: 'walas_sultan_xi_tkr3',      password: '123', name: 'Sultan Saladin',                      role: 'wali_kelas', kelas: 'XI TKR 3',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-gesti-xi-mes1',       username: 'walas_gesti_xi_mesin1',     password: '123', name: 'Gesti Khoriunnisa',                   role: 'wali_kelas', kelas: 'XI MESIN 1',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-esa-xi-mes2',         username: 'walas_esa_xi_mesin2',       password: '123', name: 'Esa Apriadi, S.Pd',                  role: 'wali_kelas', kelas: 'XI MESIN 2',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-dikky-xi-mes3',       username: 'walas_dikky_xi_mesin3',     password: '123', name: 'M. Dikky Apri Setia Nugraha S.Pd',   role: 'wali_kelas', kelas: 'XI MESIN 3',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-viany-xi-ak1',        username: 'walas_viany_xi_ak1',        password: '123', name: 'Viany Lingga Revi, S.E',             role: 'wali_kelas', kelas: 'XI AK 1',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-devin-xi-ak2',        username: 'walas_devin_xi_ak2',        password: '123', name: 'Devin Eldwin, S.Ak',                 role: 'wali_kelas', kelas: 'XI AK 2',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-viany-xi-ak3',        username: 'walas_viany_xi_ak3',        password: '123', name: 'Viany Lingga Revi, S.E',             role: 'wali_kelas', kelas: 'XI AK 3',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-amalia-xi-titl1',     username: 'walas_amalia_xi_titl1',     password: '123', name: 'Amalia Dewi Lestari, S.Pd',          role: 'wali_kelas', kelas: 'XI TITL 1',   jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-amalia-xi-titl2',     username: 'walas_amalia_xi_titl2',     password: '123', name: 'Amalia Dewi Lestari, S.Pd',          role: 'wali_kelas', kelas: 'XI TITL 2',   jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-septi-xi-elin1',      username: 'walas_septi_xi_elin1',      password: '123', name: 'Septiawan Filtra Santosa, S.Pd, Gr', role: 'wali_kelas', kelas: 'XI ELIND 1',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-septi-xi-elin2',      username: 'walas_septi_xi_elin2',      password: '123', name: 'Septiawan Filtra Santosa, S.Pd, Gr', role: 'wali_kelas', kelas: 'XI ELIND 2',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-iqbal-xi-elin3',      username: 'walas_iqbal_xi_elin3',      password: '123', name: 'Muhamad Iqbal, S.Pd',                role: 'wali_kelas', kelas: 'XI ELIND 3',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-maris-xi-elin4',      username: 'walas_maris_xi_elin4',      password: '123', name: 'Maris Catur Dwi Pratiwi',            role: 'wali_kelas', kelas: 'XI ELIND 4',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-maris-xi-elin5',      username: 'walas_maris_xi_elin5',      password: '123', name: 'Maris Catur Dwi Pratiwi',            role: 'wali_kelas', kelas: 'XI ELIND 5',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-haya-xi-tki1',        username: 'walas_haya_xi_tki1',        password: '123', name: 'Haya Suhaela, S.Pd',                 role: 'wali_kelas', kelas: 'XI TKI 1',    jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'mm-w-haya-xi-tki2',        username: 'walas_haya_xi_tki2',        password: '123', name: 'Haya Suhaela, S.Pd',                 role: 'wali_kelas', kelas: 'XI TKI 2',    jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'mm-w-iwan-xi-hotel',       username: 'walas_iwan_xi_hotel',       password: '123', name: 'Iwan Sutiawan',                       role: 'wali_kelas', kelas: 'XI HOTEL',    jurusan_id: JURUSAN_IDS.HOTEL },

    // XII CLASSES (MM2100)
    { id: 'mm-w-tri-xii-tsm1',        username: 'walas_tri_xii_tsm1',        password: '123', name: 'Tri Lestari, S.Pd',              role: 'wali_kelas', kelas: 'XII TSM 1',    jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-nanda-xii-tsm2',      username: 'walas_nanda_xii_tsm2',      password: '123', name: 'Nanda Diansyah, S.Pd',           role: 'wali_kelas', kelas: 'XII TSM 2',    jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-dede-xii-tsm3',       username: 'walas_dede_xii_tsm3',       password: '123', name: 'Dede Rukmayanti, S.Pd',          role: 'wali_kelas', kelas: 'XII TSM 3',    jurusan_id: JURUSAN_IDS.TSM },
    { id: 'mm-w-raihan-xii-elin1',    username: 'walas_raihan_xii_elin1',    password: '123', name: 'Raihan Nurhakim, S.Pd',          role: 'wali_kelas', kelas: 'XII ELIND 1',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-eldha-xii-elin2',     username: 'walas_eldha_xii_elin2',     password: '123', name: 'Eldha Luvy Zha, A.Md',           role: 'wali_kelas', kelas: 'XII ELIND 2',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-azzam-xii-elin3',     username: 'walas_azzam_xii_elin3',     password: '123', name: 'Azzam Izzudin Ramadhan, S.Pd',   role: 'wali_kelas', kelas: 'XII ELIND 3',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-azzam-xii-elin4',     username: 'walas_azzam_xii_elin4',     password: '123', name: 'Azzam Izzudin Ramadhan, S.Pd',   role: 'wali_kelas', kelas: 'XII ELIND 4',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-fadli-xii-elin5',     username: 'walas_fadli_xii_elin5',     password: '123', name: 'M. Fadli Maulana, S.Pd',         role: 'wali_kelas', kelas: 'XII ELIND 5',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-tidtaya-xii-elin6',   username: 'walas_tidtaya_xii_elin6',   password: '123', name: 'Tidtaya Puteri Larasanty',        role: 'wali_kelas', kelas: 'XII ELIND 6',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-salsa-xii-elin7',     username: 'walas_salsa_xii_elin7',     password: '123', name: 'Salsa fatia Azhar',              role: 'wali_kelas', kelas: 'XII ELIND 7',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-nurma-xii-elin8',     username: 'walas_nurmayanti_xii_elin8',password: '123', name: 'Nurmayanti, S.Kom',              role: 'wali_kelas', kelas: 'XII ELIND 8',  jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'mm-w-tisul-xii-titl1',     username: 'walas_tisul_xii_titl1',     password: '123', name: 'Tri Sulistyaningsih, S.S',       role: 'wali_kelas', kelas: 'XII TITL 1',   jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-aldy-xii-titl2',      username: 'walas_aldy_xii_titl2',      password: '123', name: 'M. Aldy Akbar Suopriadi, S.Pd',  role: 'wali_kelas', kelas: 'XII TITL 2',   jurusan_id: JURUSAN_IDS.LISTRIK },
    { id: 'mm-w-azhari-xii-mes1',     username: 'walas_azhari_xii_mesin1',   password: '123', name: 'Azhari Budiriyanto, S.Pd',       role: 'wali_kelas', kelas: 'XII MESIN 1',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-tini-xii-mes2',       username: 'walas_tini_xii_mesin2',     password: '123', name: 'Tini Nurmala, S.Pd',             role: 'wali_kelas', kelas: 'XII MESIN 2',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-azhari-xii-mes3',     username: 'walas_azhari_xii_mesin3',   password: '123', name: 'Azhari Budiriyanto, S.Pd',       role: 'wali_kelas', kelas: 'XII MESIN 3',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-nia-xii-mes4',        username: 'walas_nia_xii_mesin4',      password: '123', name: 'Nia Desnata Hati, S.Pd',         role: 'wali_kelas', kelas: 'XII MESIN 4',  jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'mm-w-hafidz-xii-tkr1',     username: 'walas_hafidz_xii_tkr1',     password: '123', name: 'M. Hafidz Ghufron, S.Pd',        role: 'wali_kelas', kelas: 'XII TKR 1',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-dodi-xii-tkr2',       username: 'walas_dodi_xii_tkr2',       password: '123', name: 'Dodi Perdana Putra, S.Pd',       role: 'wali_kelas', kelas: 'XII TKR 2',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-hafidz-xii-tkr3',     username: 'walas_hafidz_xii_tkr3',     password: '123', name: 'M. Hafidz Ghufron, S.Pd',        role: 'wali_kelas', kelas: 'XII TKR 3',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-trisno-xii-tkr4',     username: 'walas_trisno_xii_tkr4',     password: '123', name: 'Trisno Ngestuti, S.Pd',          role: 'wali_kelas', kelas: 'XII TKR 4',    jurusan_id: JURUSAN_IDS.TKR },
    { id: 'mm-w-isti-xii-tki1',       username: 'walas_isti_xii_tki1',       password: '123', name: 'Istiqomah, S.Pd',                role: 'wali_kelas', kelas: 'XII TKI 1',    jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'mm-w-isti-xii-tki2',       username: 'walas_isti_xii_tki2',       password: '123', name: 'Istiqomah, S.Pd',                role: 'wali_kelas', kelas: 'XII TKI 2',    jurusan_id: JURUSAN_IDS.KIMIA },
    { id: 'mm-w-retno-xii-ak1',       username: 'walas_retno_xii_ak1',       password: '123', name: 'Retno Dwi Astuti',               role: 'wali_kelas', kelas: 'XII AK 1',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-retno-xii-ak2',       username: 'walas_retno_xii_ak2',       password: '123', name: 'Retno Dwi Astuti',               role: 'wali_kelas', kelas: 'XII AK 2',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-fuji-xii-ak3',        username: 'walas_fuji_xii_ak3',        password: '123', name: 'Fuji Sampan Sujana, S.Pd',       role: 'wali_kelas', kelas: 'XII AK 3',     jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'mm-w-putri-xii-hotel',     username: 'walas_putri_xii_hotel',     password: '123', name: 'Putri Nur Azizah, S.S',          role: 'wali_kelas', kelas: 'XII HOTEL',    jurusan_id: JURUSAN_IDS.HOTEL },

    // ==========================================
    // KAMPUS 03 - DATA TERBARU (format: 'X/XI/XII KELAS 03' tanpa kurung)
    // ==========================================

    // X CLASSES (Kampus 03)
    { id: 'k03-w-hafidz-x-tsm1',      username: 'walas_hafidz_x_tsm1_03',      password: '123', name: 'Muhamad Hafidz Firdaus Priatama, S.Pd', role: 'wali_kelas', kelas: 'X TSM 1 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-hafidz-x-tsm2',      username: 'walas_hafidz_x_tsm2_03',      password: '123', name: 'Muhamad Hafidz Firdaus Priatama, S.Pd', role: 'wali_kelas', kelas: 'X TSM 2 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-nida-x-tkr1',        username: 'walas_nida_x_tkr1_03',        password: '123', name: 'Nida Apriliatul Hasanah, S.Pd',         role: 'wali_kelas', kelas: 'X TKR 1 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-maulana-x-tkr2',     username: 'walas_maulana_x_tkr2_03',     password: '123', name: 'Maulana Evendi',                         role: 'wali_kelas', kelas: 'X TKR 2 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-dafiq-x-mes1',       username: 'walas_dafiq_x_mesin1_03',     password: '123', name: 'Ah. Dafiq Najiyullah, S.Pd.I',          role: 'wali_kelas', kelas: 'X MESIN 1 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-yanda-x-mes2',       username: 'walas_yanda_x_mesin2_03',     password: '123', name: 'Yanda Eko Putra, S.Pd',                 role: 'wali_kelas', kelas: 'X MESIN 2 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-yanda-x-mes3',       username: 'walas_yanda_x_mesin3_03',     password: '123', name: 'Yanda Eko Putra, S.Pd',                 role: 'wali_kelas', kelas: 'X MESIN 3 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-dwifajar-x-ak1',     username: 'walas_dwifajar_x_ak1_03',     password: '123', name: 'Dwi fajar, S.Pd',                       role: 'wali_kelas', kelas: 'X AK 1 03',    jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'k03-w-dwifajar-x-ak2',     username: 'walas_dwifajar_x_ak2_03',     password: '123', name: 'Dwi fajar, S.Pd',                       role: 'wali_kelas', kelas: 'X AK 2 03',    jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'k03-w-syaifulloh-x-elin1', username: 'walas_syaifulloh_x_elin1_03', password: '123', name: 'Syaifulloh, S.Pd',                       role: 'wali_kelas', kelas: 'X ELIND 1 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-syaifulloh-x-elin2', username: 'walas_syaifulloh_x_elin2_03', password: '123', name: 'Syaifulloh, S.Pd',                       role: 'wali_kelas', kelas: 'X ELIND 2 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-teguh-x-elin3',      username: 'walas_teguh_x_elin3_03',      password: '123', name: 'M. Teguh Suprihatin, S.Psi',            role: 'wali_kelas', kelas: 'X ELIND 3 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-teguh-x-elin4',      username: 'walas_teguh_x_elin4_03',      password: '123', name: 'M. Teguh Suprihatin, S.Psi',            role: 'wali_kelas', kelas: 'X ELIND 4 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-sukma-x-elin5',      username: 'walas_sukma_x_elin5_03',      password: '123', name: 'Sukma Dwiaugita',                        role: 'wali_kelas', kelas: 'X ELIND 5 03', jurusan_id: JURUSAN_IDS.ELIND },

    // XI CLASSES (Kampus 03)
    { id: 'k03-w-tiara-xi-tsm1',      username: 'walas_tiara_xi_tsm1_03',      password: '123', name: 'Tiara Kusuma Dewi',                    role: 'wali_kelas', kelas: 'XI TSM 1 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-ditta-xi-tsm2',      username: 'walas_ditta_xi_tsm2_03',      password: '123', name: 'Ditta Oktaviani',                      role: 'wali_kelas', kelas: 'XI TSM 2 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-syafrudin-xi-tkr1',  username: 'walas_syafrudin_xi_tkr1_03',  password: '123', name: 'Syafrudin',                            role: 'wali_kelas', kelas: 'XI TKR 1 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-diah-xi-tkr2',       username: 'walas_diah_xi_tkr2_03',       password: '123', name: 'Diah Maulias Dewi P, S.Pd',            role: 'wali_kelas', kelas: 'XI TKR 2 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-novita-xi-mes1',     username: 'walas_novita_xi_mesin1_03',   password: '123', name: 'Novita Hani Pratiwi, S.T/Pandu',       role: 'wali_kelas', kelas: 'XI MESIN 1 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-pandu-xi-mes2',      username: 'walas_pandu_xi_mesin2_03',    password: '123', name: 'Pandu Andariansyah',                   role: 'wali_kelas', kelas: 'XI MESIN 2 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-berty-xi-ak',        username: 'walas_berty_xi_ak_03',        password: '123', name: 'Berty Efira F',                         role: 'wali_kelas', kelas: 'XI AK 03',      jurusan_id: JURUSAN_IDS.AKUNTANSI },
    { id: 'k03-w-ihsan-xi-elin1',     username: 'walas_ihsan_xi_elin1_03',     password: '123', name: 'Muhammad Al Ihsan, S.Pd',              role: 'wali_kelas', kelas: 'XI ELIND 1 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-adhista-xi-elin2',   username: 'walas_adhista_xi_elin2_03',   password: '123', name: 'Adhista Cindy Rahmayani, S.Pd/Eldha',  role: 'wali_kelas', kelas: 'XI ELIND 2 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-adhista-xi-elin3',   username: 'walas_adhista_xi_elin3_03',   password: '123', name: 'Adhista Cindy Rahmayani, S.Pd',        role: 'wali_kelas', kelas: 'XI ELIND 3 03', jurusan_id: JURUSAN_IDS.ELIND },

    // XII CLASSES (Kampus 03)
    { id: 'k03-w-arya-xii-tsm4',      username: 'walas_arya_xii_tsm4_03',     password: '123', name: 'Arya Yudha Satria Tama, S.Pd',        role: 'wali_kelas', kelas: 'XII TSM 4 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-arya-xii-tsm5',      username: 'walas_arya_xii_tsm5_03',     password: '123', name: 'Arya Yudha Satria Tama, S.Pd',        role: 'wali_kelas', kelas: 'XII TSM 5 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-heri-xii-tsm6',      username: 'walas_heri_xii_tsm6_03',     password: '123', name: 'Heri Supriyanto, S.Pd',               role: 'wali_kelas', kelas: 'XII TSM 6 03',   jurusan_id: JURUSAN_IDS.TSM },
    { id: 'k03-w-rahmat-xii-tkr5',    username: 'walas_rahmat_xii_tkr5_03',   password: '123', name: 'Rahmat Hidayat, S.Pd.Gr',             role: 'wali_kelas', kelas: 'XII TKR 5 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-adynda-xii-tkr6',    username: 'walas_adynda_xii_tkr6_03',   password: '123', name: 'Adynda Ray R, S.Sos',                 role: 'wali_kelas', kelas: 'XII TKR 6 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-adynda-xii-tkr7',    username: 'walas_adynda_xii_tkr7_03',   password: '123', name: 'Adynda Ray R, S.Sos',                 role: 'wali_kelas', kelas: 'XII TKR 7 03',   jurusan_id: JURUSAN_IDS.TKR },
    { id: 'k03-w-ayu-xii-mes5',       username: 'walas_ayu_xii_mesin5_03',    password: '123', name: 'Ayu Warestu, S.Pd',                   role: 'wali_kelas', kelas: 'XII MESIN 5 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-intan-xii-mes6',     username: 'walas_intan_xii_mesin6_03',  password: '123', name: 'Intan Chaya Ningtyas',                 role: 'wali_kelas', kelas: 'XII MESIN 6 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-intan-xii-mes7',     username: 'walas_intan_xii_mesin7_03',  password: '123', name: 'Intan Chaya Ningtyas',                 role: 'wali_kelas', kelas: 'XII MESIN 7 03', jurusan_id: JURUSAN_IDS.MESIN },
    { id: 'k03-w-danu-xii-elin9',     username: 'walas_danu_xii_elin9_03',    password: '123', name: 'Danu Purwanto, S.Pd',                 role: 'wali_kelas', kelas: 'XII ELIND 9 03', jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-ridwan-xii-elin10',  username: 'walas_ridwan_xii_elin10_03', password: '123', name: 'Ridwan, S.Pd',                        role: 'wali_kelas', kelas: 'XII ELIND 10 03',jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-noval-xii-elin11',   username: 'walas_noval_xii_elin11_03',  password: '123', name: 'Noval Al Mahdy, S.Pd',                role: 'wali_kelas', kelas: 'XII ELIND 11 03',jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-cecep-xii-elin12',   username: 'walas_cecep_xii_elin12_03',  password: '123', name: 'Cecep Bemana Sakti G, S.Pd',          role: 'wali_kelas', kelas: 'XII ELIND 12 03',jurusan_id: JURUSAN_IDS.ELIND },
    { id: 'k03-w-diah-xii-ak4',       username: 'walas_diah_xii_ak4_03',      password: '123', name: 'Diah Maulias Dewi P, S.Pd',           role: 'wali_kelas', kelas: 'XII AK 4 03',    jurusan_id: JURUSAN_IDS.AKUNTANSI },
];

export function authenticateUser(username: string, password: string, selectedRole?: 'student' | 'teacher'): User | null {
    const user = mockUsers.find((u) => {
        const isUsernameMatch = u.username === username || u.name === username || (u.nisn && u.nisn === username);

        if (u.role === 'student') {
            // For students, NISN is the password
            const isPasswordMatch = u.password === password || (u.nisn && u.nisn === password);
            return isUsernameMatch && isPasswordMatch;
        } else {
            // For teachers/others, use their defined password
            return isUsernameMatch && u.password === password;
        }
    });

    if (user && selectedRole) {
        if (selectedRole === 'student' && user.role !== 'student') return null;
        if (selectedRole === 'teacher' && user.role === 'student') return null;
    }

    if (!user && (!selectedRole || selectedRole === 'student')) {
        const student = mockData.mockSiswa.find((s: any) => {
            const isUsernameMatch = s.nisn === username || s.nama === username;
            const isPasswordMatch = s.nisn === password;
            return isUsernameMatch && isPasswordMatch && !!s.nisn;
        });

        if (student) {
            return {
                id: student.id,
                username: student.nisn || student.nama,
                password: student.nisn || '',
                name: student.nama,
                role: 'student',
                jurusan_id: student.jurusan_id,
                kelas: student.kelas,
                nisn: student.nisn,
                avatar_url: student.avatar_url,
                photo_url: student.photo_url
            } as User;
        }
    }

    return user || null;
}
