import { defineStore } from 'pinia'
import api from '../api' 
export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    sortKey: '',
    sortAsc: true
  }),

  actions: {
    
async fetchCourses() {
  try {
    const token = localStorage.getItem('token'); 

    const response = await api.get('/admin/course', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Courses response:', response.data.course);

    this.courses = response.data.course.map(course => ({
      id: course.courseId,
      name: course.courseName,
      department: course.department,
      staffId: course.staffId,
      editing: false
    }));

    console.log('Fetched courses:', this.courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
},

    addCourse(course) {
      this.courses.push({ ...course, editing: false });
    },

    updateCourse(index, updatedCourse) {
      this.courses[index] = { ...updatedCourse, editing: false };
    },

    deleteCourse(index) {
      this.courses.splice(index, 1);
    },

    setSort(key, direction) {
      this.sortKey = key;
      this.sortAsc = direction === 'asc';
    }
  },

  getters: {
    sortedCourseList(state) {
      if (!state.sortKey) return state.courses;

      return [...state.courses].sort((a, b) => {
        const valA = a[state.sortKey] ?? '';
        const valB = b[state.sortKey] ?? '';

        const isNumber = !isNaN(Number(valA)) && !isNaN(Number(valB));

        if (isNumber) {
          return state.sortAsc ? valA - valB : valB - valA;
        }

        return state.sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
  }
});
