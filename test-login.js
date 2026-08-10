import { authenticateUser } from './src/mocks/mockUsers.js';

console.log("student selected, student user:", authenticateUser('siswa_mesin', '123', 'student'));
console.log("teacher selected, teacher user:", authenticateUser('hod_tkr', '123', 'teacher'));
console.log("student selected, teacher user:", authenticateUser('hod_tkr', '123', 'student'));
console.log("teacher selected, student user:", authenticateUser('siswa_mesin', '123', 'teacher'));
