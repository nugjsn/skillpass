export function getGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'E';
}

export function getGradeColor(grade: string): string {
    switch (grade) {
        case 'A': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        case 'B': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        case 'C': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        case 'D': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        default: return 'text-red-500 bg-red-500/10 border-red-500/20';
    }
}
