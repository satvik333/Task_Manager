<template>
  <div class="table-container">
    <button class="back-button" @click="goBack">Go Back</button>
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { getUsersData } from "../services/userService";
import { ref } from "vue";
import { useRouter } from "vue-router";

const users = ref([]);
const router = useRouter();

onBeforeMount(async () => {
  const response = await getUsersData();
  users.value = response.users;
});

const goBack = () => {
  router.go(-1); 
}
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

table th,
table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

table tr:hover {
  background-color: #f5f5f5;
}

table td button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}

table td button.update-button {
  background-color: #3498db;
}
</style>

