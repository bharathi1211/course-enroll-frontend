<template>
  <div class="app-container">
    <div class="top-bar">
      <button class="hamburger" @click="toggleSidebar">☰</button>
      <h1 class="heading">Course Enrollment</h1>

      <!-- Profile Dropdown Section -->
      <div class="profile-section" @click="toggleDropdown">
        <div class="profile-circle">👤</div>
        <div v-if="showDropdown" class="dropdown" @click.stop>
          <p class="username">Hi, {{ username }}</p>
          <button @click="logout">Logout</button>
        </div>
      </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isSidebarOpen = ref(false)
const showDropdown = ref(false)
const username = ref(sessionStorage.getItem('username') || 'admin')
const router = useRouter()

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function logout() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  router.push('/')
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
.top-bar {
  display: flex;
  justify-content: space-between; /* Pushes profile to right */
  align-items: center;
  background-color: #819A91;
  color: white;
  padding: 0.6rem 1rem;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  position: relative;
}

.heading {
  flex-grow: 1;
  text-align: center;
}

.profile-section {
  position: relative;
  cursor: pointer;
}

.profile-circle {
  width: 40px;
  height: 40px;
  background-color: white;
  color: #819A91;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  color: #333;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  width: 160px;
  z-index: 999;
}

.username {
  font-weight: bold;
  margin-bottom: 8px;
}

</style>
