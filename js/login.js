class Login {
 constructor(form, fields) {
  this.form = form; // to allow these to be passed between functions
  this.fields = fields;
  this.validateOnSubmit();
 }

 // when submitted it runs this function:
 validateOnSubmit() {
  let self = this; // to lock the value of this to self (context independent now)

  this.form.addEventListener("submit", (e) => {
   e.preventDefault(); // stop automatic submssion of the form
   var error = 0;
   self.fields.forEach((field) => {
    const input = document.querySelector(`#${field}`);
    if(self.validateFields(input) == false) {
     error++; // if it doesn't validate, increase the error, error prevents from displaying something
    }
   });
   if(error == 0) {
   // console.log('success');
   // -------- do login api here -----------
   localStorage.setItem("auth", 1); // store an application variable ("key", value)
   this.form.submit();
   }
  });
 }

 validateFields(field) {
  if(field.value.trim() === '') { // trim() removes whitespace from both sides of a string
   this.setStatus(
    field,
    `${field.previousElementSibling.innerText} cannot be blank`,
    "error"
   );
   return false;
  } else { // if it's not blank, run something for the password:
   if(field.type == "password") {
    if(field.value.length < 8) {
     this.setStatus(
    field,
    `${field.previousElementSibling.innerText} must be at least 8 characters`,
    "error"
   );
   return false;
    } else {
     this.setStatus(field, null, "success");
     return true;
    }
   } else {
     this.setStatus(field, null, "success");
     return true;
   }
  }
 }

 setStatus(field, message, status) {
  const errorMessage = field.parentElement.querySelector(".error-message");

  if(status == "success") {
   if(errorMessage) {
    errorMessage.innerText = '';
   }
   field.classList.remove("input-error");
  }

  if(status == "error") {
   errorMessage.innerText = message;
   field.classList.add("input-error");
  }
 }
}

const form = document.querySelector(".loginform");
if(form) {
 const fields = ["username", "password"];
 const validator = new Login(form, fields);
}