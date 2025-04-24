//elements of the page
const add = document.querySelector("#add");
const close = document.querySelector("#close");
const submit = document.querySelector("#submit");
const webForm = document.querySelector("#websiteF");
const container = document.querySelector(".container");
const userForm = document.querySelector("#usernameF");
const passwordForm = document.querySelector("#passwordF");


//start of the storage or existing values
let storedPasswords;
let passToEdit = null;
let editV = false;
const data = localStorage.getItem("passwords");
storedPasswords = data ? JSON.parse(data) : [];

//functions
class pass {
  constructor (id, website, username, password) {
    this.id = id;
    this.website = website;
    this.username = username;
    this.password = password;
  }
}

function copy(tar) {
  //https://www.freecodecamp.org/news/copy-text-to-clipboard-javascript/

  const toCopyOnClipBoard = tar.parentElement.parentElement.children[2].innerText;
  navigator.clipboard.writeText(toCopyOnClipBoard)
  .then(() => {
    showToast("password copied");
  })
  .catch(() => {
    showToast("didn't copied");
  })
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function show(tar) {
  const target = tar.closest(".pass").children[2].children[0];
  const btn = tar.closest(".pass").children[3].children[0];
  const isVisible = btn.getAttribute("data-visible");
  if(isVisible === "true") {
    btn.src = "assests/eye.png";
    target.innerHTML = "********";
    btn.setAttribute("data-visible", false);
  } else {
    btn.src = "assests/hide.png";
    target.innerHTML = target.getAttribute("data-password");
    setTimeout(() => {
      btn.src = "assests/eye.png";
      target.innerHTML = "********";
      btn.setAttribute("data-visible", false);
      return;
    }, 5000);
    btn.setAttribute("data-visible", true);
  }
}

function del(tar) {
  const toDelete = tar.closest(".pass");
  storedPasswords = storedPasswords.filter(pass => parseInt(pass.id) !== parseInt(toDelete.id));
  localStorage.setItem("passwords", JSON.stringify(storedPasswords));
  toDelete.remove();
}
function edit(tar) {
  editV  = true
  const modal = document.querySelector(".popup-content");
  const target = tar.closest(".pass");
  const website = target.children[0].innerText;
  const username = target.children[1].innerText;
  const password = target.children[2].children[0].getAttribute("data-password");
  passToEdit = parseInt(target.id);
  modal.children[1].value = website;
  modal.children[2].value = username;
  modal.children[3].value = password;
  document.querySelector(".popup").style.display = "flex";
}

function render() {
  document.querySelector(".container").innerHTML = "";
  if(storedPasswords.length > 0) {
    const passwords = JSON.parse(localStorage.getItem("passwords"));
    passwords.forEach((pass) => {
      createPass(pass);
  });
}
}
function createPass(obj) {
  const container = document.querySelector(".container");
  const toInsert = `<div class="pass" id="${obj.id}">
        <div class="website">
          <img src="assests/internet.png" height="30px" />
          <h3>${obj.website}</h3>
        </div>
        <div class="user">
          <p>${obj.username}</p>
        </div>
        <div class="password">
          <p class="password-text" data-password="${obj.password}">********</p>
        </div>
        <div class="options">
          <img src="assests/eye.png" width="30px" class="show" data-visible="false"/>
          <img src="assests/copy.png" width="30px" class="copy"/>
          <img src="assests/cross.png" width="30px" class="delete"/>
          <img src="assests/pencil.png" width="30px" class="edit"/>
        </div>
      </div>`
  container.insertAdjacentHTML("beforeend", toInsert);
}



//producing all ".pass" dynamically when the page loads using onload.
window.addEventListener('load', () => {
  render();
})

// document.addEventListener("click", function(e) {
//   console.log("runs")
//   if (e.target && e.target.id === "show") {
//     const passContainer = e.target.closest(".pass");
//     const passText = passContainer.querySelector(".password-text");

//     const isHidden = passText.textContent.includes("•");

//     if (isHidden) {
//       // Show real password
//       passText.textContent = passText.getAttribute("data-password");
//       e.target.src = "assests/eye-off.png"; // Optional: change icon
//     } else {
//       // Hide it back
//       passText.textContent = "********";
//       e.target.src = "assests/eye.png"; // Back to original icon
//     }
//   }
// });

//adding a new password
add.addEventListener('click', () => {
  document.querySelector(".popup").style.display = "flex";
});

//closing the modal
close.addEventListener('click', () => {
  document.querySelector(".popup").style.display = "none";
  webForm.value = '';
  userForm.value = '';
  passwordForm.value = '';
});

//submitting the values for new password.
submit.addEventListener('click', (e) => {
  if(!webForm.value || !userForm.value || !passwordForm.value) {
    //throw an error on the #warnings paragraph
    document.querySelector("#warnings").innerHTML = `Enter Valid Credentials`;
    return;
  }
  if(editV) {
    const modal = document.querySelector(".popup-content");
    storedPasswords = storedPasswords.filter((pass) => {
      if(parseInt(pass.id) === passToEdit) {
        pass.website = modal.children[1].value;
        pass.username = modal.children[2].value;
        pass.password = modal.children[3].value;
      }
      return pass;
    });
    editV = false;
    passToEdit = null;
  } else {
    storedPasswords.push(new pass(Date.now(), webForm.value, userForm.value, passwordForm.value));
  }
  localStorage.setItem("passwords", JSON.stringify(storedPasswords)); 
  render();
  webForm.value = '';
  userForm.value = '';
  passwordForm.value = '';
  document.querySelector(".popup").style.display = "none";
});


//here we've done event delegation by dynamically applying eventListener to the 
//parent element of the ".pass" and so when more added it can be handled
container.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG') {
    switch (e.target.className) {
      case "delete" :
        del(e.target);
        break;
      case "edit" :
        edit(e.target);
        break;
      case "show" : 
        show(e.target);
        break;
      case "copy" : 
        copy(e.target);
        break; 
    }
  }
});