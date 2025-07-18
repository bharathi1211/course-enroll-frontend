<template>
  <div class="page">
    <div class="left , panel">
      <h2 class="section-title">Add Staff</h2>
      <input v-model="newStaff.id" placeholder="Staff ID" />
      <input v-model="newStaff.name" placeholder="Staff Name" />
      <input v-model="newStaff.department" placeholder="Department" />
      <button @click="createStaff">Create</button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div class="right , panel">
      <h2 class="section-title">Staff List</h2>
      <DataTable 
        :data="staffStore.sortedStaffList" 
        :headers="headers"
        :sortKey="staffStore.sortKey"
        :sortAsc="staffStore.sortAsc"
        @update="handleUpdate" 
        @delete="handleDelete"
        @sort="handleSort"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import { useStaffStore } from '../stores/staff';
import DataTable from './DataTable.vue';
import { validateStaff } from '../validation/staffvalidator';
import {handleApiError} from '../errhandler.js';
import api from '../api';
const error = ref('')
const staffStore = useStaffStore();
onMounted(()=> {
  staffStore.fetchStaff();
});
const newStaff = ref({
  id: '',
  name: '',
  department: ''
});

const headers = ref(['id', 'name', 'department']);

async function createStaff() {
  console.log(newStaff.value);
  const err = validateStaff(newStaff.value);
  if (err) {
    // alert(error);
    error.value=err;
    return;
  }

  const payload = {
    staff_id: Number(newStaff.value.id),
    staff_name: newStaff.value.name,
    department: newStaff.value.department,
  };
  const token = localStorage.getItem('token'); 
  console.log("payload",payload)
  try {
    await api.post('/admin/staff/add', payload,{ headers: {Authorization: `Bearer ${token}`,'Content-Type': 'application/json'}});
    staffStore.addStaff(newStaff.value);
    newStaff.value = { id: '', name: '', department: '' };
  } catch (err) {
    handleApiError(err, 'Failed to create course');
  }
}

async function handleUpdate(index, updatedStaff) {
  const payload = {
    staff_id : updatedStaff.id,
    staff_name : updatedStaff.name,
    department : updatedStaff.department}
  console.log(payload);
  try {
    const token = localStorage.getItem('token');
    await api.put(`/admin/staff/${payload.staff_id}`, payload,{headers:{Authorization:`Bearer ${token}`,'Content-Type': 'application/json'}});
    staffStore.updateStaff(index,{
      name: payload.staff_name,
      department: payload.department,
      id: payload.staff_id
    });
    newStaff.value = { id: '', name: '', department: ''};
  } catch (err) {
    handleApiError(err, 'Failed to update staff');
  }
}

async function handleDelete(index) {
const staff = staffStore.staffList[index];
  if (!staff) return;

  try {
    const token = localStorage.getItem("token");
    await api.delete(`/admin/staff/${staff.id}`,{headers:{Authorization:`Bearer ${token}`,'Content-Type': 'application/json'}});
    staffStore.deleteStaff(index); 
  } catch (err) {
    handleApiError(err, 'Failed to delete course');
  }
}

function handleSort(key, direction) {
  staffStore.setSort(key, direction);
}

</script>

<style scoped>
.page {
  display: flex;
  /* justify-content: space-between; */
  align-items: flex-start;
  gap: 2rem;
  padding: 0 0 0 15rem;
}

.left,
.right {
  /* width: 45%; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error{
  color:rgb(174, 79, 79);
}
input {
  display: block;
  margin: 0.5rem 0;
  padding: 6px;
  width: 80%;
  border-color:transparent;
  border-radius: 5px;
}
button:hover {
  background-color: #b9d1a4;
}
.panel {
  background-color: #EEEFE0; /* lighter than background */
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #d3e4cd;
  width: 100%;
  max-width: 400px;
  margin: 2rem;
}
button {
  margin-top: 0.5rem;
  padding: 6px 12px;
  cursor: pointer;
  outline: none; 
}

table {
  width: 100%;
  max-width: 500px;
  table-layout: fixed;
  border-collapse: collapse;
  background-color: white; 
}

th,
td {
  padding: 8px;
  text-align: left;
  background-color: white; 
}
body {
  height: 100%;
  min-height: 100vh;
  background-color: #f4f9f4;
  margin: 0;
  padding: 0;
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
