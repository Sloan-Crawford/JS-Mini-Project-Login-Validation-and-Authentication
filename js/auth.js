class Auth {
 constructor() {
  document.querySelector("body").style.display = "none"; // removes chance of glimpse of dashboard
  const auth = localStorage.getItem("auth");
  this.validateAuth(auth);
 }

 validateAuth(auth) {
  if(auth != 1) {
   window.location.replace("index.html"); // redirect back to login screen
  } else {
     document.querySelector("body").style.display = "block"; // shows it only if authenticated

  }
 }

 logout() {
  localStorage.removeItem("auth");
  console.log(window.location);
  window.location.replace("index.html");
 }
}