import axios from "axios";

export async function getPosts() {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const res = await axios.get("http://localhost:3000/Posts", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
export async function storePosts(postData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const res = await axios.post( "http://localhost:3000/Posts",postData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        }
      }
    );

    console.log("Response:", res);
    return res.data; 
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
export async function deletePost(id) {
  try {
   
    const token = localStorage.getItem('token');
     const res =  await axios.delete(`http://localhost:3000/Posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    console.log("Response from server:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error deleting data:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "Error occurred");
    } else {
      throw new Error("Network error or server not reachable.");
    }
  }
}
export async function signup(usernameval, passwordval) {
  try {
    console.log(usernameval);
    const res = await axios.post(
      "http://localhost:3000/signup",
      {
        "username": usernameval,
        "password": passwordval
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Response:", res);
    return res.data;
  } catch (error) {
    console.error("Error during signup:", error.response || error.message);
    if (error.response) {
      console.log("coming");
      throw new Error(
        `Signup failed: ${error.response.data.message}`
      );
    } else {
      throw new Error("Network error or server not reachable.");
    }
  }
}

export async function login(usernameval, passwordval) {
  try {
    const res = await axios.post(
      "http://localhost:3000/login",
      {
        username: usernameval,
        password: passwordval
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Response:", res);
    return res.data;
  } catch (error) {
    console.error("Error during login:", error.response || error.message);

    if (error.response) {
      throw new Error(
        `Login failed:  ${error.response.data
          .message || "Unknown error"}`
      );
    } else {
      throw new Error("Network error or server not reachable.");
    }
  }
}



export async function updatePost(id, title, description) {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.put(
      `http://localhost:3000/Posts/${id}`, 
       {
        "title":title,
        "description": description,
         "date": new Date().toISOString(),
          "date": new Date().toISOString(),
           "date": new Date().toISOString()
       },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        }
      }
    );
    
    return response.data; 
  } catch (error) {
    console.error("Error updating post:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Error occurred while updating the post.");
    } else {
      throw new Error("Network error or server not reachable.");
    }
  }
}


export function getUserIdFromToken(token) {
  try {
   
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const payload = JSON.parse(atob(tokenParts[1]));

    return payload.id || null; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
