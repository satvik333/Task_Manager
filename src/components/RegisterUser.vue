<template>
  <div>
    <h1>User Registration</h1>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="userName">User Name:</label>
        <input type="text" id="userName" v-model="userName" required />
      </div>
      <div class="form-group">
        <label for="userEmail">Email:</label>
        <input type="text" id="userEmail" v-model="userEmail" required />
        <span v-if="!isEmailValid" class="error">Invalid email format</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <span v-if="!isPasswordValid" class="error"
          >Password must be at least 6 characters</span
        >
      </div>
      <h2 v-if="isNoUserCreated" class="error">Failed to Create User</h2>
      <div class="form-group">
        <button type="submit" class="register-button">Register</button>
      </div>
    </form>
    <button class="back-button" @click="goBack">Go Back</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "../services/userService";

const router = useRouter();

const userName = ref("");
const userEmail = ref("");
const password = ref("");
let isNoUserCreated = ref(false);
const isEmailValid = ref(true);
const isPasswordValid = ref(true);

const register = async () => {
  if (!validateEmail(userEmail.value) || !validatePassword(password.value)) {
    return;
  }

  const res = await registerUser(
    userName.value,
    userEmail.value,
    password.value
  );
  if (!res) isNoUserCreated.value = true;
  else router.push("/login");
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailPattern.test(email);
  return isEmailValid.value;
};

const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
  const hasNumber = /\d/.test(password);

  const isValid =
    password.length >= 6 && hasUppercase && hasSpecialChar && hasNumber;

  isPasswordValid.value = isValid;
  return isPasswordValid.value;
};

const goBack = () => {
  router.go(-1); 
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.back-button {
  background-color: #007bff;
  color: white;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
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

.register-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.register-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}
</style>
