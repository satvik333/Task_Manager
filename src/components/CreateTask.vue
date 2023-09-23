<template>
  <div class="form-container">
    <h1>Create Task</h1>
    <form @submit.prevent="createTask" class="task-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" required />
      </div>
      <div class="form-group">
        <label for="dropdown">Status:</label>
        <select id="dropdown" v-model="selectedOption">
          <option value="" disabled>Select a Status</option>
          <option
            v-for="option in dropdownOptions"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="create-button">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addNewTask } from "../services/userService";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const title = ref("");
const description = ref("");
const selectedOption = ref("");
const dropdownOptions = ["To-Do", "In-Progress", "Completed"];

const createTask = () => {
  let payload = {
    taskTitle: title.value,
    taskDescription: description.value,
    taskStatus: selectedOption.value,
    userId: store.state.user.user._id,
    userEmail: store.state.user.user.email,
  };
  addNewTask(payload);
  router.push("/dashboard");
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.task-form {
  width: 100%;
  max-width: 600px;
  padding: 20px;
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

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.create-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}
</style>
