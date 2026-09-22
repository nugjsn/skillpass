import React from 'react';
import type { CompetencyHistory, LevelSkill, SiswaWithSkill, StudentProject } from '../types';
import { PassportBook } from './Passport/PassportBook';

interface StudentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentId: string;
    studentName: string;
    studentNisn?: string;
    studentKelas: string;
    avatarUrl?: string;
    photoUrl?: string;
    jurusanName: string;
    history: CompetencyHistory[];
    levels: LevelSkill[];
    hodName?: string;
    walasName?: string;
    evidencePhotos?: string[];
    evidenceVideos?: string[];
    projects?: StudentProject[];
}

export const StudentHistoryModal: React.FC<StudentHistoryModalProps> = ({
    isOpen,
    onClose,
    studentId,
    studentName,
    studentNisn,
    studentKelas,
    avatarUrl,
    photoUrl,
    jurusanName,
    history,
    levels,
    hodName,
    walasName,
    evidencePhotos = [],
    evidenceVideos = [],
    projects = [],
}) => {
    if (!isOpen) return null;

    // Construct a SiswaWithSkill object for the PassportBook
    const studentData: SiswaWithSkill = {
        id: studentId,
        nama: studentName,
        nisn: studentNisn,
        kelas: studentKelas,
        jurusan_id: '', // Not critical for display as we pass jurusanName
        created_at: '',
        riwayat_kompetensi: history,
        avatar_url: avatarUrl,
        photo_url: photoUrl,
        skill_siswa: [], // Not needed for passport display currently
        evidence_photos: evidencePhotos,
        evidence_videos: evidenceVideos,
        projects: projects,
    };

    return (
        <PassportBook
            siswa={studentData}
            jurusanName={jurusanName}
            levels={levels}
            onClose={onClose}
            hodName={hodName}
            walasName={walasName}
        />
    );
};
