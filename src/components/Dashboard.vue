<template>
  <div>
    <button class="buttons" @click="navigateToCreateTask">Create Task</button>
    <button
      class="buttons"
      v-if="store.state.user.user.userType === 'admin'"
      @click="navigateToAdminPage"
    >
      Click Here to Admin Page
    </button>
    <button class="buttons" @click="logOut">Log Out</button>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th @click="sortTable('taskTitle')">Title</th>
            <th @click="sortTable('taskDescription')">Description</th>
            <th @click="sortTable('taskStatus')">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in paginatedTasks" :key="task._id">
            <td>{{ task.taskTitle }}</td>
            <td>{{ task.taskDescription }}</td>
            <td>{{ task.taskStatus }}</td>
            <td>
              <button @click="editTask(task)">Edit</button>
              <button @click="deleteCurrentTask(task._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>

  <div v-if="showEditModal" class="modal">
    <div class="modal-content">
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTask">
        <div class="form-group">
          <label for="editTitle">Title:</label>
          <input
            v-model="taskToUpdate.taskTitle"
            type="text"
            id="editTitle"
            required
          />
        </div>
        <div class="form-group">
          <label class="edit-label" for="editDescription">Description:</label>
          <textarea
            class="edit-textarea"
            v-model="taskToUpdate.taskDescription"
            id="editDescription"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="editStatus">Status:</label>
          <select v-model="taskToUpdate.taskStatus" id="editStatus" required>
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="button" @click="cancelEdit">Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getTasksData,
  deleteTask,
  logOutUser,
  updateTask as updateTaskApi,
} from "../services/userService";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
let tasks = ref([]);
const sortedTasks = ref([]);
const itemsPerPage = ref(10);
const currentPage = ref(1);
const taskToUpdate = ref(null);
const showEditModal = ref(false);

const deleteCurrentTask = async (taskId) => {
  await deleteTask(taskId);
  getTasks();
};

const logOut = async () => {
  const res = await logOutUser();
  if (res.message) router.push('login');
}

const editTask = (task) => {
  taskToUpdate.value = { ...task };
  showEditModal.value = true;
};

const cancelEdit = () => {
  taskToUpdate.value = null;
  showEditModal.value = false;
};

const updateTask = async () => {
  try {
    await updateTaskApi(taskToUpdate.value);

    taskToUpdate.value = null;
    showEditModal.value = false;
    getTasks();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const navigateToCreateTask = () => {
  router.push("/createtask");
};

const navigateToAdminPage = () => {
  if (store.state.user.user.userType === "admin") router.push("/adminpage");
};

const sortTable = (property) => {
  sortedTasks.value = [...tasks.value].sort((a, b) => {
    return a[property].localeCompare(b[property]);
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const totalPages = computed(() => {
  return Math.ceil(sortedTasks.value.length / itemsPerPage.value);
});

const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return sortedTasks.value.slice(startIndex, endIndex);
});

const getTasks = async () => {
  let response = await getTasksData(store.state.user.user._id);
  tasks.value = response.tasks;
  sortTable("taskTitle");
};

onBeforeMount(async () => {
  getTasks();
});
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 0 auto;
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
  cursor: pointer;
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

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
}

.modal h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 30px;
}

.form-group label {
  font-weight: bold;
  font-size: 16px;
}

.form-group input[type="text"],
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

.form-group select {
  width: 100%;
  height: 40px;
}

.modal button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.modal button[type="button"] {
  background-color: #e74c3c;
}

.edit-label {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.edit-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}

.buttons {
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

.buttons:hover {
  background-color: #0056b3;
}
</style>


