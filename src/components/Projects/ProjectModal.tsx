import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Plus, Image as ImageIcon, Trash2, Calendar, Users, FileText, CheckCircle, Loader2, Sparkles, FolderGit2, Edit2, ExternalLink } from 'lucide-react';
import { StudentProject } from '../../types';
import { projectStore } from '../../lib/projectStore';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    siswaId: string;
    studentName: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
    isOpen,
    onClose,
    siswaId,
    studentName
}) => {
    const [projects, setProjects] = useState<StudentProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);

    // Form state
    const [judul, setJudul] = useState('');
    const [kategori, setKategori] = useState<'project' | 'lomba'>('project');
    const [juara, setJuara] = useState('');
    const [anggota, setAnggota] = useState(studentName || '');
    const [deskripsi, setDeskripsi] = useState('');
    const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
    const [photos, setPhotos] = useState<string[]>([]);

    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadProjects = async () => {
        if (!siswaId) return;
        setLoading(true);
        try {
            const data = await projectStore.getStudentProjects(siswaId);
            setProjects(data);
        } catch (e) {
            console.error('Failed to load projects', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadProjects();
            resetForm();
        }
    }, [isOpen, siswaId]);

    const resetForm = () => {
        setIsEditing(false);
        setSelectedProject(null);
        setJudul('');
        setKategori('project');
        setJuara('');
        setAnggota(studentName || '');
        setDeskripsi('');
        setTanggal(new Date().toISOString().split('T')[0]);
        setPhotos([]);
        setError(null);
    };

    const handleStartEdit = (p: StudentProject) => {
        setSelectedProject(p);
        setJudul(p.judul);
        setKategori(p.kategori);
        setJuara(p.juara || '');
        setAnggota(p.anggota || studentName);
        setDeskripsi(p.deskripsi || '');
        setTanggal(p.tanggal || new Date().toISOString().split('T')[0]);
        setPhotos(p.foto_dokumentasi || []);
        setIsEditing(true);
        setError(null);
    };

    const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setError(null);

        try {
            const newPhotoUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const url = await projectStore.uploadPhoto(file, siswaId);
                if (url) newPhotoUrls.push(url);
            }
            setPhotos(prev => [...prev, ...newPhotoUrls]);
        } catch (err: any) {
            console.error("Upload error", err);
            setError(`Gagal mengupload foto: ${err.message || 'Ukuran terlalu besar'}`);
        } finally {
            setUploading(false);
            if (e.target) e.target.value = '';
        }
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!judul.trim()) {
            setError('Judul proyek atau lomba wajib diisi!');
            return;
        }
        if (!anggota.trim()) {
            setError('Siswa yang ikut / anggota tim wajib diisi!');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            if (selectedProject) {
                // Update
                const success = await projectStore.updateProject(selectedProject.id, {
                    judul: judul.trim(),
                    kategori,
                    juara: juara.trim() || undefined,
                    anggota: anggota.trim(),
                    deskripsi: deskripsi.trim() || undefined,
                    tanggal,
                    foto_dokumentasi: photos
                });
                if (!success) throw new Error('Gagal memperbarui proyek.');
            } else {
                // Create
                await projectStore.createProject({
                    siswa_id: siswaId,
                    judul: judul.trim(),
                    kategori,
                    juara: juara.trim() || undefined,
                    anggota: anggota.trim(),
                    deskripsi: deskripsi.trim() || undefined,
                    tanggal,
                    foto_dokumentasi: photos
                });
            }

            await loadProjects();
            resetForm();
        } catch (err: any) {
            console.error("Error saving project:", err);
            setError(err.message || 'Terjadi kesalahan saat menyimpan.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus portofolio karya ini?')) return;

        try {
            await projectStore.deleteProject(id);
            await loadProjects();
            if (selectedProject?.id === id) {
                resetForm();
            }
        } catch (err) {
            alert('Gagal menghapus portofolio');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-4xl bg-slate-900 [.theme-clear_&]:bg-white border border-slate-800 [.theme-clear_&]:border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-800 [.theme-clear_&]:border-slate-200 flex justify-between items-center bg-slate-900/80 [.theme-clear_&]:bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white [.theme-clear_&]:text-slate-900 tracking-tight uppercase flex items-center gap-2">
                                Portofolio Proyek & Hasil Lomba
                            </h2>
                            <p className="text-xs text-slate-400 [.theme-clear_&]:text-slate-500 font-medium">
                                Dokumentasi karya & prestasi Anda akan tercetak di Buku Paspor Digital
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white [.theme-clear_&]:hover:text-slate-900 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: Form (5 Cols) */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="bg-slate-950/60 [.theme-clear_&]:bg-slate-50 border border-slate-800 [.theme-clear_&]:border-slate-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white [.theme-clear_&]:text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    {isEditing ? 'Edit Portofolio' : 'Tambah Proyek / Lomba Baru'}
                                </h3>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="text-xs text-indigo-400 hover:underline"
                                    >
                                        Batal Edit
                                    </button>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Kategori */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5">
                                        Tipe Kegiatan
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setKategori('project')}
                                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                                                kategori === 'project'
                                                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                                                    : 'bg-white/5 [.theme-clear_&]:bg-slate-100 text-slate-400 [.theme-clear_&]:text-slate-700 border-white/5 [.theme-clear_&]:border-slate-200 hover:bg-white/10'
                                            }`}
                                        >
                                            <FolderGit2 className="w-4 h-4" />
                                            Proyek / Karya
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setKategori('lomba')}
                                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                                                kategori === 'lomba'
                                                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/20'
                                                    : 'bg-white/5 [.theme-clear_&]:bg-slate-100 text-slate-400 [.theme-clear_&]:text-slate-700 border-white/5 [.theme-clear_&]:border-slate-200 hover:bg-white/10'
                                            }`}
                                        >
                                            <Trophy className="w-4 h-4" />
                                            Lomba / Prestasi
                                        </button>
                                    </div>
                                </div>

                                {/* Judul */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5">
                                        Judul Proyek / Nama Lomba <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={judul}
                                        onChange={(e) => setJudul(e.target.value)}
                                        placeholder={kategori === 'lomba' ? 'Contoh: LKS Web Technology 2026' : 'Contoh: Mesin CNC Otomatis Mini'}
                                        className="w-full px-3.5 py-2.5 bg-slate-900 [.theme-clear_&]:bg-white border border-slate-700 [.theme-clear_&]:border-slate-300 rounded-xl text-white [.theme-clear_&]:text-slate-900 text-xs focus:border-indigo-500 outline-none"
                                        required
                                    />
                                </div>

                                {/* Juara / Peringkat */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5 flex items-center justify-between">
                                        <span>Juara / Capaian {kategori === 'project' && '(Opsional)'}</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={juara}
                                        onChange={(e) => setJuara(e.target.value)}
                                        placeholder="Contoh: Juara 1 Tingkat Provinsi / Best Innovation"
                                        className="w-full px-3.5 py-2.5 bg-slate-900 [.theme-clear_&]:bg-white border border-slate-700 [.theme-clear_&]:border-slate-300 rounded-xl text-white [.theme-clear_&]:text-slate-900 text-xs focus:border-indigo-500 outline-none"
                                    />
                                </div>

                                {/* Siswa yang Ikut / Anggota Tim */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5 flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                                        Siswa yang Ikut / Anggota Tim <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={anggota}
                                        onChange={(e) => setAnggota(e.target.value)}
                                        placeholder="Contoh: Ahnaf Abdul Jabbar, Bayu Pratama, Siti Aminah"
                                        className="w-full px-3.5 py-2.5 bg-slate-900 [.theme-clear_&]:bg-white border border-slate-700 [.theme-clear_&]:border-slate-300 rounded-xl text-white [.theme-clear_&]:text-slate-900 text-xs focus:border-indigo-500 outline-none"
                                        required
                                    />
                                    <p className="text-[10px] text-slate-500 mt-1">Tulis nama-nama rekan Anda yang bersama-sama mengerjakan proyek ini.</p>
                                </div>

                                {/* Tanggal & Deskripsi */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Tanggal
                                        </label>
                                        <input
                                            type="date"
                                            value={tanggal}
                                            onChange={(e) => setTanggal(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-900 [.theme-clear_&]:bg-white border border-slate-700 [.theme-clear_&]:border-slate-300 rounded-xl text-white [.theme-clear_&]:text-slate-900 text-xs focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5 flex items-center gap-1">
                                            <FileText className="w-3.5 h-3.5 text-indigo-400" /> Ringkasan
                                        </label>
                                        <input
                                            type="text"
                                            value={deskripsi}
                                            onChange={(e) => setDeskripsi(e.target.value)}
                                            placeholder="Deskripsi singkat karya..."
                                            className="w-full px-3 py-2 bg-slate-900 [.theme-clear_&]:bg-white border border-slate-700 [.theme-clear_&]:border-slate-300 rounded-xl text-white [.theme-clear_&]:text-slate-900 text-xs focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Foto Dokumentasi (Max 200KB auto-compressed) */}
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-slate-400 [.theme-clear_&]:text-slate-600 block mb-1.5 flex items-center justify-between">
                                        <span className="flex items-center gap-1">
                                            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                                            Dokumentasi Foto Karya (Max 200KB)
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-normal">{photos.length} foto terpilih</span>
                                    </label>

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-3 text-center cursor-pointer bg-slate-900/50 [.theme-clear_&]:bg-slate-100 hover:bg-indigo-500/5 transition-all group"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            multiple
                                            accept="image/*"
                                            onChange={handlePhotoSelect}
                                            className="hidden"
                                        />
                                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 group-hover:text-indigo-400">
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                                                    <span>Mengompres & Mengupload...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4" />
                                                    <span>Pilih Foto Dokumentasi</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Preview Photos */}
                                    {photos.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mt-2">
                                            {photos.map((url, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 group">
                                                    <img src={url} alt="Dokumentasi" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePhoto(idx)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving || uploading}
                                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            <span>{isEditing ? 'Simpan Perubahan' : 'Tambahkan ke Portofolio'}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: List of Saved Projects (6 Cols) */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white [.theme-clear_&]:text-slate-900 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-400" />
                                Daftar Karya & Prestasi ({projects.length})
                            </h3>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mb-2 text-indigo-500" />
                                <p className="text-xs">Memuat portofolio...</p>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="border border-dashed border-slate-800 [.theme-clear_&]:border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center text-slate-500 gap-2">
                                <Trophy className="w-10 h-10 stroke-1 text-slate-600 opacity-40" />
                                <p className="text-xs font-semibold">Belum ada portofolio proyek atau hasil lomba.</p>
                                <p className="text-[11px] text-slate-500">Isi formulir di sebelah kiri untuk menambahkan karya pertama Anda!</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                                {projects.map((p) => (
                                    <div
                                        key={p.id}
                                        className={`p-4 rounded-2xl border transition-all ${
                                            p.kategori === 'lomba'
                                                ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
                                                : 'bg-slate-950/40 [.theme-clear_&]:bg-slate-50 border-slate-800 [.theme-clear_&]:border-slate-200 hover:border-indigo-500/40'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                                        p.kategori === 'lomba'
                                                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                            : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                                    }`}>
                                                        {p.kategori === 'lomba' ? '🏆 Lomba' : '🚀 Proyek'}
                                                    </span>
                                                    {p.juara && (
                                                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                            {p.juara}
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="text-sm font-bold text-white [.theme-clear_&]:text-slate-900 leading-snug">
                                                    {p.judul}
                                                </h4>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => handleStartEdit(p)}
                                                    className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-[11px] text-slate-400 [.theme-clear_&]:text-slate-600 space-y-1 mb-2.5">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={12} className="text-indigo-400 shrink-0" />
                                                <span className="truncate"><strong>Anggota:</strong> {p.anggota}</span>
                                            </div>
                                            {p.deskripsi && (
                                                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                                    "{p.deskripsi}"
                                                </p>
                                            )}
                                        </div>

                                        {/* Photos Preview */}
                                        {p.foto_dokumentasi && p.foto_dokumentasi.length > 0 && (
                                            <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-white/5">
                                                {p.foto_dokumentasi.map((imgUrl, i) => (
                                                    <a
                                                        key={i}
                                                        href={imgUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="aspect-video rounded-lg overflow-hidden border border-slate-700/50 bg-black/40 hover:opacity-90 transition-opacity"
                                                    >
                                                        <img src={imgUrl} alt="Karya" className="w-full h-full object-cover" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {p.tanggal && (
                                            <div className="mt-2 text-[9px] text-slate-500 font-mono text-right">
                                                {new Date(p.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 [.theme-clear_&]:border-slate-200 flex items-center justify-between bg-slate-900/50 [.theme-clear_&]:bg-slate-100">
                    <p className="text-[11px] text-slate-400 italic">
                        * Portofolio ini akan otomatis terlampir di halaman khusus Buku Paspor Anda.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};
