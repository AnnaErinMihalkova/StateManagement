import { create } from 'zustand';

export const SUBJECTS = ["Математика", "Физика", "Информатика"];

export const useGradeStore = create((set, get) => ({
  students: [
    {
      id: 1,
      name: "Иван Петров",
      grades: { "Математика": [5, 6], "Физика": [4], "Информатика": [6, 5] },
    },
    {
      id: 2,
      name: "Мария Иванова",
      grades: { "Математика": [6], "Физика": [5, 5], "Информатика": [6] },
    },
  ],
  selectedSubject: "all",
  sortBy: "name",

  addStudent: (name) => set((s) => ({
    students: [...(s.students || []), {
      id: Date.now(),
      name,
      grades: {},
    }],
  })),

  addGrade: (studentId, subject, grade) => set((s) => ({
    students: (s.students || []).map(st =>
      st.id === studentId
        ? {
            ...st,
            grades: {
              ...(st.grades || {}),
              [subject]: [...(st.grades?.[subject] || []), grade],
            },
          }
        : st
    ),
  })),

  setSubjectFilter: (subject) => set({ selectedSubject: subject }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export const selectStudents = (state) => state.students;
export const selectAddStudent = (state) => state.addStudent;
export const selectAddGrade = (state) => state.addGrade;
export const selectSelectedSubject = (state) => state.selectedSubject;
export const selectSortBy = (state) => state.sortBy;
export const selectSetSubjectFilter = (state) => state.setSubjectFilter;
export const selectSetSortBy = (state) => state.setSortBy;

export const getFilteredStudents = (state) => {
  const { students, selectedSubject, sortBy } = state;
  if (!students) return [];

  const withAverages = students.map(st => {
    const gradesObj = st.grades || {};
    const allGrades = selectedSubject === "all"
      ? Object.values(gradesObj).flat()
      : gradesObj[selectedSubject] || [];
    
    const average = allGrades.length > 0
      ? allGrades.reduce((a, b) => a + b, 0) / allGrades.length
      : 0;
    return { ...st, average: Math.round(average * 100) / 100 };
  });

  return [...withAverages].sort((a, b) =>
    sortBy === "name"
      ? a.name.localeCompare(b.name, "bg")
      : b.average - a.average
  );
};

export const getClassStats = (state) => {
  const { students } = state;
  if (!students || students.length === 0) return { average: 0, count: 0, min: 0, max: 0 };

  const allGrades = students.flatMap(st =>
    Object.values(st.grades || {}).flat()
  );
  
  if (allGrades.length === 0) return { average: 0, count: students.length, min: 0, max: 0 };
  
  const average = Math.round((allGrades.reduce((a, b) => a + b, 0) / allGrades.length) * 100) / 100;
  const min = Math.min(...allGrades);
  const max = Math.max(...allGrades);
  
  return {
    average,
    count: students.length,
    min,
    max
  };
};
