<template>
  <div class="login-container">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const response = await api.post('/login', {
      username: username.value,
      password: password.value,
    })

    const token = response.data.token
    localStorage.setItem('token', token)

    alert('Login successful')
    
    router.push('/home')
  } catch (err) {
    console.error(err)
    error.value = 'Invalid username or password'
  }
}
</script>
<style scoped>
.login-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.login-container {
  max-width: 400px;
  margin-top: 100px;
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
