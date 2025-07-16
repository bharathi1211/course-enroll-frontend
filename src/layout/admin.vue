<template>
  <div class="app-container">
    <div class="top-bar">
      <button class="hamburger" @click="toggleSidebar">☰</button>
      <h1>Course Enrollment</h1>
    </div>

    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <router-link to="/staff" class="nav-link" @click="closeSidebar">Staff</router-link>
      <router-link to="/courses" class="nav-link" @click="closeSidebar">Courses</router-link>
    </div>

    <div class="main-content" @click="closeSidebar">
        <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #feffef;
}

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  left: 0%;
  flex-direction: column;
}

.top-bar {
  display: flex;
  align-items: center;
  background-color: #819A91;
  color: white;
  padding: 0.6rem 1rem;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
}

h1 {
  font-size: 1.3rem;
  margin: 0;
}

.hamburger {
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-right: 0.6rem;
  cursor: pointer;
  color: white;
}

.sidebar {
  position: absolute;
  top: 60px; 
  left: -200px;
  width: 180px;
  height: calc(100% - 60px); 
  background-color: #819A91;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  transition: left 0.3s ease;
}

.sidebar.open {
  left: 0;
}

.nav-link {
  display: block;
  padding: 0.75rem 1rem;
  background-color: #819A91;
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav-link:hover {
  background-color: #778d85;
}

.main-content {
  padding: 1rem;
}
</style>
