const baseURL = 'http://localhost:4000';

export async function makeApiCall(endpoint, method, body = null) {
  try {
    const token = localStorage.getItem('jwtToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(baseURL + endpoint, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making API call:', error);
  }
}


export async function loginUser(email, password) {
  const endpoint = '/login';
  const method = 'POST';
  const body = {
    email,
    password
  };

  try {
    const response = await makeApiCall(endpoint, method, body);

    if (response.token) {
      localStorage.setItem('jwtToken', response.token);
    }

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

export async function logOutUser() {
  const endpoint = '/logoutuser';
  const method = 'POST';
  const body = null;
  return await makeApiCall(endpoint, method, body);
}

export async function registerUser(userName, email, password) {
  const endpoint = '/registeruser';
  const method = 'POST';
  const body = {
    userName,
    email,
    password
  };

  return await makeApiCall(endpoint, method, body);
}

export async function getUsersData() {
  const endpoint = '/getusers';
  const method = 'GET';
  const body = null;
  return await makeApiCall(endpoint, method, body);
}

export async function addNewTask(payload) {
  const endpoint = '/addtask';
  const method = 'POST';
  const body = payload;

  return await makeApiCall(endpoint, method, body);
}

export async function getTasksData(userId) {
  const endpoint = '/gettasks';
  const method = 'POST';
  const body = {
    userId
  };
  return await makeApiCall(endpoint, method, body);
}

export async function deleteTask(id) {
  const endpoint = `/deletetask`;
  const method = 'DELETE';
  const body = {
    id
  };
  return await makeApiCall(endpoint, method, body);
}

export async function updateTask(payload) {
  const endpoint = `/updatetask`;
  const method = 'PUT';
  const body = payload;
  return await makeApiCall(endpoint, method, body);
}