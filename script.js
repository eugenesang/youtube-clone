function getAllUsers() {
  fetch("http://localhost:3001/api/user")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
 
function setCredentials(button) {
  // Find the parent div of the clicked button
  const parentDiv = button.closest("div");

  // Find the input elements within the same parent div
  const emailInput = parentDiv.querySelector('input[name="email"]');
  const passwordInput = parentDiv.querySelector('input[name="password"]');
  const usernameInput = parentDiv.querySelector('input[name="username"]');

  // Set the test credentials
  if (usernameInput) {
    usernameInput.value = "user1" + `${Math.floor(Math.random() * 10000)}`;
    emailInput.value = "user1" + `${Math.floor(Math.random() * 10000)}`;
    passwordInput.value = "user1" + `${Math.floor(Math.random() * 10000)}`;
    return
  }
  
  emailInput.value = "user1";
  passwordInput.value = "user1"; 
}
const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //   method-1
  const formdata = new FormData(signupForm);
  //   const bodyObj = {
  //     username: formdata.get("username"),
  //     password: formdata.get("password"),
  //   };
  // method-2
  const data = Object.fromEntries(formdata.entries()); //convert form data into  JS object
  //  console.log(data);

  fetch("http://localhost:3001/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Important for sending cookies
    body: JSON.stringify(data), //send file in json
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const logindata = new FormData(loginForm);
  const loginObj = Object.fromEntries(logindata.entries());
  fetch("http://localhost:3001/api/auth/login", {
    method: "Post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(loginObj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});

function getUserDetail() {
  fetch("http://localhost:3001/api/user/test", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function getProfile() {
  fetch("http://localhost:3001/api/user/profile", {
    method: "GET",
    credentials: "include",  // This ensures cookies are sent with the request
    
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

