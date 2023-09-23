import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Login from './components/LoginPage.vue'
import CreateTask from './components/CreateTask.vue'
import RegisterUser from './components/RegisterUser.vue'
import store from './store';
import AdminPage from './components/AdminPage.vue'

const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/login', component: Login }, 
    { path: '/createtask', component: CreateTask },
    { path: '/registeruser', component: RegisterUser },
    { path: '/adminpage', component: AdminPage },
    { path: '/', component: Login }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  

  const app = createApp(App)
  app.use(router); 
  app.use(store);
  app.mount('#app')
  
