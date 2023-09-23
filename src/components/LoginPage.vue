<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="userEmail">Email:</label>
        <input type="text" id="userEmail" v-model="userEmail" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button type="submit" class="login-button">Login</button>
      </div>
    </form>
    <h2 v-if="isNotValidUser" class="error">Invalid Credentials</h2>
    <button @click="navigateToRegister" class="login-button">
      Click Here to Register
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const userEmail = ref("");
const password = ref("");
let isNotValidUser = ref(false);

const login = async () => {
  let user = { userEmail: userEmail.value, password: password.value };
  await store.dispatch("loginUser", user);
  if (store.state.user) router.push("/dashboard");
  else {
    isNotValidUser.value = true;
    router.push("/login");
  }
};

const navigateToRegister = () => {
  router.push("/registeruser");
};
</script>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form {
  width: 100%; 
  max-width: 500px; 
  margin: 0 auto; 
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  margin-left: 10px;
}

.login-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}
</style>
