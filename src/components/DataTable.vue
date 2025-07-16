<template>
  <input
      v-model="searchQuery"
      placeholder="Search"
      class="search-box"
    />
  <div class="table-container">
    <table cellspacing="0" cellpadding="8" >
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            @click="toggleSort(header)"
            :class="{
              'sort-asc': sortKey === header && sortAsc,
              'sort-desc': sortKey === header && !sortAsc
            }"
            style="cursor: pointer">
            {{ header }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <template v-if="!item.editing">
            <td v-for="(key, i) in headers" :key="i">
              {{ item[key] }}
            </td>
            <td class="action-buttons">
  <button class="small-btn" @click="item.editing = true">Edit</button>
  <button class="small-btn" @click="emit('delete', index)">Delete</button>
</td>

          </template>
          <template v-else>
            <td v-for="(key, i) in headers" :key="i">
              <input  v-model="item[key]" :type="['id', 'staffId'].includes(key) ? 'number' : 'text'" />
            </td>
            <td class="action-buttons">
              <button  class="small-btn" @click="save(index, item)">Save</button>
              <button  class="small-btn" @click="item.editing = false">Cancel</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
   <div class="pagination-container">
    <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref ,computed } from 'vue';

const props = defineProps(['data', 'headers', 'sortKey', 'sortAsc']);
const emit = defineEmits(['update', 'delete', 'sort']);
const searchQuery = ref('');
const sortState = ref({
  key: props.sortKey,
  asc: props.sortAsc,
});

const searchdata = computed(()=>{
  if(!searchQuery.value.trim()) {
    return props.data;
  }
  return props.data.filter( (item) => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
})
const currentPage = ref(1)
const itemsPerPage = 5

const totalPages = computed(() => Math.ceil(searchdata.value.length / itemsPerPage))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return searchdata.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function toggleSort(header) {
  if (sortState.value.key === header) {
    sortState.value.asc = !sortState.value.asc;
  } else {
    sortState.value.key = header;
    sortState.value.asc = true;
  }

  const direction = sortState.value.asc ? 'asc' : 'desc';
  emit('sort', header, direction);
}

function save(index, item) {
  const cleanedItem = {
    course_id: Number(item.id),
    course_name: item.name?.trim(),
    department: item.department?.trim(),
    staff_id: Number(item.staffId),
  };

  if (
    isNaN(cleanedItem.course_id) ||
    isNaN(cleanedItem.staff_id) ||
    !cleanedItem.course_name ||
    !cleanedItem.department
  ) {
    alert("Please fill in all fields correctly before saving.");
    return;
  }
  item.editing = false;
  emit('update', index, cleanedItem);
}

</script>



<style scoped>
.table-container {
  width: 100%;
  /* display: flex; */
  border-color: aliceblue;
  /* justify-content: center; */
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow-x: auto;
  /* min-width: 0; */
  /* flex: 1; */
  box-sizing: border-box;
}

.sort-asc::after {
  content: " 🔼";
}
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}

.sort-desc::after {
  content: " 🔽";
}
.action-buttons {
  display: flex;
  gap: 10px;
  flex-direction: column;
  vertical-align: middle;
}

.small-btn {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: pointer;
  }

.small-btn:hover {
  background-color: #e0e0e0;
}

th {
  background-color: #A7C1A8;
  cursor: pointer;
}
td{
  background-color:#D1D8BE;
  vertical-align: middle;
  height: 100%;
}
td,
th {
  text-align: left;
  color:darkolivegreen;
  vertical-align: middle;
  border: 1px solid white;
  overflow-wrap: break-word;
}

input {
  width: 90%;
}

button {
  margin-right: 2px;
}
.search-box {
  margin-bottom: 1rem;
  padding: 6px 10px;
  width: 100%;
  max-width: 300px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position:relative;
  top:13px;
  bottom: 0px;
  left: 0;
  right: 0;
  margin-top: auto;
}

.pagination-button {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #aaa;
  background-color: #f2f2f2;
  cursor: pointer;
  transition: background 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>
