//elements of the page
const add = document.querySelector("#add");
const close = document.querySelector("#close");
const submit = document.querySelector("#submit");
const webForm = document.querySelector("#websiteF");
const container = document.querySelector(".container");
const userForm = document.querySelector("#usernameF");
const passwordForm = document.querySelector("#passwordF");


//variables
let editI = false;


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
  console.log("Copy : ", tar);
}

function show(tar) {
  console.log("Show : ", tar);
}

function del(tar) {
  const toDelete = tar.parentElement.parentElement;
  console.log(toDelete);
  toDelete.remove();
}
function edit(tar) {
  editI = true;
  const modal = document.querySelector(".popup-content");
  const target = tar.parentElement.parentElement;
  const website = target.children[0].innerText;
  const username = target.children[1].innerText;
  const password = target.children[2].innerText;
  
  modal.children[1].value = website;
  modal.children[2].value = username;
  modal.children[3].value = password;
  document.querySelector(".popup").style.display = "flex";
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
          <p>${obj.password}</p>
        </div>
        <div class="options">
          <img src="assests/eye.png" width="30px" id="show"/>
          <img src="assests/copy.png" width="30px" id="copy"/>
          <img src="assests/cross.png" width="30px" id="delete"/>
          <img src="assests/pencil.png" width="30px" id="edit"/>
        </div>
      </div>`
  container.insertAdjacentHTML("beforeend", toInsert);
}

//producing all ".pass" dynamically when the page loads using onload.
window.addEventListener('load', () => {

})

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
  editI = false;
});

//submitting the values for new password.
submit.addEventListener('click', () => {
  if(!webForm.value || !userForm.value || !passwordForm.value) {
    //throw an error on the #warnings paragraph
    document.querySelector("#warnings").innerHTML = `Enter Valid Credentials`;
    return;
  }
  if(editI) {
    
    editI = false;
  } else {
    arr.push(new pass(count, webForm.value, userForm.value, passwordForm.value));
    createPass(arr[arr.length-1]);
    count++;
    console.log(count);
  }

  webForm.value = '';
  userForm.value = '';
  passwordForm.value = '';
  document.querySelector(".popup").style.display = "none";
});


//here we've done event delegation by dynamically applying eventListener to the 
//parent element of the ".pass" and so when more added it can be handled
container.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG') {
    switch (e.target.id) {
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