<template>
  <div class="login-wrap">
  <div class="login-container">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login" style="color:#60736c;">Login</button>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const successMessage = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const response = await api.post('/login', {
      username: username.value,
      password: password.value,
    })

    const token = response.data.token
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', username.value)

    // alert('Login successful')
    successMessage.value = 'Login successful';
    if(username.value==='admin'){
      console.log("yes");
      setTimeout(() => {router.push('/home')}, 1000);
    }
  } catch (err) {
    console.error(err)
    error.value = 'Invalid username or password'
  }
}
</script>
<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #feffef;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: #EEEFE0;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  border-radius: 5px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  border-color:transparent;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: rgb(165, 66, 66);
  margin-top: 10px;
}
h2{
color: #819A91;
}
button:hover {
  background-color: #b9d1a4;
  /* //color: #60736c */
}

</style>
