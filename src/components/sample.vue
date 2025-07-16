<template>
  <div class="container">
    <h2>Staff List</h2>

    <input
      v-model="searchQuery"
      placeholder="Search by ID, Name or Department"
      class="search-box"
    />

    <table border="1" cellspacing="0" cellpadding="8">
      <thead>
        <tr>
          <th>Staff ID</th>
          <th>Staff Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(staff, index) in filteredStaff" :key="index">
          <td>{{ staff.staffId }}</td>
          <td>{{ staff.staffName }}</td>
          <td>{{ staff.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const staffList = ref([
  { staffId: 'S001', staffName: 'Alice', department: 'HR' },
  { staffId: 'S002', staffName: 'Bob', department: 'Finance' },
  { staffId: 'S003', staffName: 'Charlie', department: 'IT' },
  { staffId: 'S004', staffName: 'David', department: 'HR' },
])

const filteredStaff = computed(() => {
  if (!searchQuery.value.trim()) return staffList.value
  const query = searchQuery.value.toLowerCase()
  return staffList.value.filter(
    (staff) =>
      staff.staffId.toLowerCase().includes(query) ||
      staff.staffName.toLowerCase().includes(query) ||
      staff.department.toLowerCase().includes(query)
  )
})
</script>
<style scoped>
.container {
  padding: 1rem;
}
.search-box {
  margin-bottom: 1rem;
  padding: 6px 10px;
  width: 100%;
  max-width: 300px;
}
</style>
