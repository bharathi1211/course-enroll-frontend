<template>
  <Admin>
    <h2>Staff Management</h2>
<StaffManager/>
  </Admin>
</template>

<script setup>
import StaffManager from '../components/StaffManager.vue';
import Admin from '../layout/admin.vue';
</script>

<style scoped>
h2 {
  text-align: center;
  color: #819A91;
  font-size: 1.4rem;
}
</style>