<template>
  <div class="page">
    <div class="left , panel">
    <h2 class="section-title">Add Course</h2>
    <input v-model="newCourse.id" placeholder="Course ID" />
    <input v-model="newCourse.name" placeholder="Course Name" />
    <input v-model="newCourse.department" placeholder="Department" />
    <input v-model="newCourse.staffId" placeholder="StaffId" />
    <button @click="createCourse">Create</button>
    </div>

    <div class="right , panel">
    <h2 class="section-title">Course List</h2>
    <DataTable
      :data="courseStore.sortedCourseList"
      :headers="headers"
      :sortKey="courseStore.sortKey"
      :sortAsc="courseStore.sortAsc"
      @update="handleUpdate"
      @delete="handleDelete"
      @sort="handleSort"
    />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref  } from 'vue'
import DataTable from './DataTable.vue'
import { useCourseStore } from '../stores/course'
import api from '../api';
import { validateCourse } from '../validation/coursevalidator'
import { handleApiError } from '../errhandler';
const newCourse = ref({
  id: '',
  name: '',
  department: '',
  staffId: ''
})
const headers = ref(['id', 'name','department','staffId']);
const courseStore = useCourseStore();
onMounted(()=> {
  courseStore.fetchCourses();
});
// const staffStore = useStaffStore();

    // const idExists = courseStore.courses.some(course => course.id === Number(newCourse.value.id));
    // if (idExists) {
    //   alert('Course ID already exists');
    //   return;
    // }
    // const enteredStaffId = Number(newCourse.value.staffId);
    // if (!staffStore.staffList.some(staff => staff.id === enteredStaffId)) {
    //   alert('Enter a valid Staff ID');
    //   return;
    // }


async function createCourse() {
  const error = validateCourse(newCourse.value);
  if (error) {
    alert(error);
    return;
  }

  const payload = {
    course_id: Number(newCourse.value.id),
    course_name: newCourse.value.name,
    department: newCourse.value.department,
    staff_id: Number(newCourse.value.staffId)
  };

  try {
    //payload.course_id = Number(payload.course_id);
    //payload.staff_id = Number(payload.staff_id);
    console.log(payload);
    
    await api.post('/admin/course/add', payload);
    courseStore.addCourse(newCourse.value);
    newCourse.value = { id: '', name: '', department: '', staffId: '' };
  } catch (err) {
    handleApiError(err, 'Failed to create course');
  }
}


async function handleUpdate(index,course) {
  const payload = course;
  //console.log("payload",payload);
  try {
    await api.put(`/admin/course/${payload.course_id}`, payload);
    courseStore.updateCourse(index,{
      id: payload.course_id,
      name: payload.course_name,
      department: payload.department,
      staffId: payload.staff_id
    });
    newCourse.value = { id: '', name: '', department: '', staffId: '' };
  } catch (err) {
    handleApiError(err, 'Failed to update course');
  }
}

async function handleDelete(index) {
  const course = courseStore.courses[index];
  if (!course) return;

  try {
    await api.delete(`/admin/course/${course.id}`);
    courseStore.deleteCourse(index); 
  } catch (err) {
    handleApiError(err, 'Failed to delete course');
  }
}


function handleSort(key, direction) {
  courseStore.setSort(key, direction);
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 0 0 0 15rem;
}

.left,
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.panel {
  background-color: #EEEFE0; /* lighter than background */
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #d3e4cd;
  width:100%;
  max-width: 400px;
  margin: 2rem;
}

input {
  display: block;
  margin: 0.5rem 0;
  padding: 6px;
  width: 80%;
}
button:hover {
  background-color: #b9d1a4;
}

button {
  margin-top: 0.5rem;
  outline: none; 
}

table {
  width: 100%;
  max-width: 500px;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: white; 
}
th, td {
  padding: 8px;
  text-align: left;
  cursor: default;
}
.section-title {
  text-align: center;
  margin-bottom: 1rem;
  color:#819A91;
}

button {
  margin: 5px 0;
}
</style>
