import { StudentProject } from '../types';
import { supabase, isMockMode } from './supabase';
import { compressImage } from './imageUtils';

export const PROJECTS_UPDATED_EVENT = 'student-projects-updated';

const MOCK_STORAGE_KEY = 'skillpas_student_projects';

export const projectStore = {
    async getStudentProjects(siswaId: string): Promise<StudentProject[]> {
        if (!siswaId) return [];

        if (isMockMode) {
            try {
                const saved = localStorage.getItem(MOCK_STORAGE_KEY);
                const all: StudentProject[] = saved ? JSON.parse(saved) : [];
                return all.filter(p => p.siswa_id === siswaId);
            } catch (e) {
                console.error("Error reading mock projects", e);
                return [];
            }
        }

        try {
            const { data, error } = await supabase
                .from('student_projects')
                .select('*')
                .eq('siswa_id', siswaId)
                .order('tanggal', { ascending: false });

            if (error) {
                console.error("Error fetching student projects", error);
                return [];
            }

            return (data || []).map((p: any) => ({
                id: p.id,
                siswa_id: p.siswa_id,
                judul: p.judul,
                kategori: p.kategori || 'project',
                juara: p.juara || undefined,
                anggota: p.anggota || '',
                deskripsi: p.deskripsi || undefined,
                tanggal: p.tanggal || undefined,
                foto_dokumentasi: Array.isArray(p.foto_dokumentasi) ? p.foto_dokumentasi : [],
                created_at: p.created_at
            }));
        } catch (err) {
            console.error("Unexpected error fetching projects", err);
            return [];
        }
    },

    async createProject(project: Omit<StudentProject, 'id' | 'created_at'>): Promise<StudentProject | null> {
        if (isMockMode) {
            const newProject: StudentProject = {
                ...project,
                id: `mock-proj-${Date.now()}`,
                created_at: new Date().toISOString()
            };
            const saved = localStorage.getItem(MOCK_STORAGE_KEY);
            const all: StudentProject[] = saved ? JSON.parse(saved) : [];
            all.unshift(newProject);
            localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(all));
            this.notifyUpdate();
            return newProject;
        }

        try {
            const { data, error } = await supabase
                .from('student_projects')
                .insert([{
                    siswa_id: project.siswa_id,
                    judul: project.judul,
                    kategori: project.kategori,
                    juara: project.juara || null,
                    anggota: project.anggota,
                    deskripsi: project.deskripsi || null,
                    tanggal: project.tanggal || new Date().toISOString().split('T')[0],
                    foto_dokumentasi: project.foto_dokumentasi || []
                }])
                .select()
                .single();

            if (error) {
                console.error("Error creating project:", error);
                throw error;
            }

            this.notifyUpdate();
            return data as StudentProject;
        } catch (err: any) {
            console.error("Failed to create project", err);
            throw err;
        }
    },

    async updateProject(id: string, updates: Partial<StudentProject>): Promise<boolean> {
        if (isMockMode) {
            const saved = localStorage.getItem(MOCK_STORAGE_KEY);
            let all: StudentProject[] = saved ? JSON.parse(saved) : [];
            all = all.map(p => p.id === id ? { ...p, ...updates } : p);
            localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(all));
            this.notifyUpdate();
            return true;
        }

        try {
            const updatePayload: any = {};
            if (updates.judul !== undefined) updatePayload.judul = updates.judul;
            if (updates.kategori !== undefined) updatePayload.kategori = updates.kategori;
            if (updates.juara !== undefined) updatePayload.juara = updates.juara || null;
            if (updates.anggota !== undefined) updatePayload.anggota = updates.anggota;
            if (updates.deskripsi !== undefined) updatePayload.deskripsi = updates.deskripsi || null;
            if (updates.tanggal !== undefined) updatePayload.tanggal = updates.tanggal || null;
            if (updates.foto_dokumentasi !== undefined) updatePayload.foto_dokumentasi = updates.foto_dokumentasi;

            const { error } = await supabase
                .from('student_projects')
                .update(updatePayload)
                .eq('id', id);

            if (error) throw error;
            this.notifyUpdate();
            return true;
        } catch (err) {
            console.error("Failed to update project", err);
            return false;
        }
    },

    async deleteProject(id: string): Promise<boolean> {
        if (isMockMode) {
            const saved = localStorage.getItem(MOCK_STORAGE_KEY);
            if (saved) {
                let all: StudentProject[] = JSON.parse(saved);
                all = all.filter(p => p.id !== id);
                localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(all));
            }
            this.notifyUpdate();
            return true;
        }

        try {
            const { error } = await supabase
                .from('student_projects')
                .delete()
                .eq('id', id);

            if (error) throw error;
            this.notifyUpdate();
            return true;
        } catch (err) {
            console.error("Failed to delete project", err);
            return false;
        }
    },

    async uploadPhoto(file: File, siswaId: string): Promise<string> {
        // Compress image to ensure it is <= 200KB
        let uploadData: File | Blob = file;
        try {
            uploadData = await compressImage(file);
        } catch (e) {
            console.warn("Compression fallback", e);
        }

        if (isMockMode) {
            return URL.createObjectURL(uploadData);
        }

        const fileExt = 'jpg';
        const fileName = `proj-${siswaId}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('student-photos')
            .upload(filePath, uploadData, {
                contentType: 'image/jpeg'
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('student-photos')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    notifyUpdate() {
        window.dispatchEvent(new CustomEvent(PROJECTS_UPDATED_EVENT));
    }
};
