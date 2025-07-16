<script setup>
import CourseManager from '../components/CourseManager.vue';
import Admin from '../layout/admin.vue';
</script>

<template>
  <Admin>
    <h2>Course Management</h2>
<CourseManager />
</Admin>
</template>

<style scoped>
h2 {
  text-align: center;
  color: #819A91;
  font-size: 1.4rem;
}
</style>