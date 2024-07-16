let namee = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("number");
let div = document.getElementById("contacts");
let array = [];

if (localStorage.getItem("contact")) {
  array = JSON.parse(localStorage.getItem("contact"));
}

getdata();

function save() {
  if (namee.value !== "") {
    add(namee.value && phone.value && email.value);
    namee.value = "";
    email.value = "";
    phone.value = "";
  } 
  else {
    alert("Enter name");
  }
}

div.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deletewith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }})

function add() {
  const contact = {
    id: Date.now(),
    namee: namee.value,
    email: email.value,
    phone: phone.value,
  };
  array.push(contact);
  addelement(array);
  addDatalocal(array);
}
function addelement(array) {
  div.innerHTML = "";
  div.style.display='block';
  array.forEach((contact) => {
    let divv = document.createElement("div");
    let br = document.createElement("br");

    let nameee = document.createElement("td");
    let email = document.createElement("td");
    let phone = document.createElement("td");

    divv.setAttribute("data-id", contact.id);
    nameee.setAttribute("name", contact.namee)

    nameee.appendChild(document.createTextNode(contact.namee));
    phone.appendChild(document.createTextNode(contact.phone));
    email.appendChild(document.createTextNode(contact.email));

    let deletee_b = document.createElement("td");
    deletee_b.className = "del";
    deletee_b.appendChild(document.createTextNode("Delete"));

    let update_b = document.createElement("td");
    update_b.className = "upd";
    update_b.appendChild(document.createTextNode("Update"));
     update_b.addEventListener("click", () => {
      // Call the update function when the Update button is clicked
      updateContact(contact.id);
    });

    divv.appendChild(nameee);
    divv.appendChild(phone);
    divv.appendChild(email);
    divv.appendChild(deletee_b);
    divv.appendChild(update_b);
    div.appendChild(divv);
    div.appendChild(br);
  });
}

function addDatalocal(array) {
  window.localStorage.setItem("contact", JSON.stringify(array));
}

function getdata() {
  let data = window.localStorage.getItem("contact");
  if (data) {
    let contact = JSON.parse(data);
    addelement(contact);
  }
}

function deletewith(contactid) {
  array = array.filter((contact) => contact.id != contactid);
  addDatalocal(array);
  if(array.length===0){
    div.style.display='none';
  }
}

function updateContact(contactId) {
  // Find the contact with the given contactId
  const contact = array.find((c) => c.id === contactId);


  if (!contact) {
    alert("Contact not found");
    return;
  }

  // Display a form for updating contact information
  const updateForm = document.createElement("div");

  const nameInput = document.createElement("input");
  nameInput.value = contact.namee;

  const phoneInput = document.createElement("input");
  phoneInput.value = contact.phone;

  const emailInput = document.createElement("input");
  emailInput.value = contact.email;

  const saveUpdateBtn = document.createElement("button");
  saveUpdateBtn.appendChild(document.createTextNode("Save Update"));
  
  const cancel = document.createElement("button");
  cancel.appendChild(document.createTextNode("Cancel"));

  saveUpdateBtn.addEventListener("click", () => {
    // Update the contact information
    contact.namee = nameInput.value;
    contact.phone = phoneInput.value;
    contact.email = emailInput.value;

    // Save the updated data and re-render the contact list
    addDatalocal(array);
    addelement(array);

    // Remove the update form
    updateForm.remove();
  });
  
    cancel.addEventListener("click", () => { 
            updateForm.remove();
    });

  updateForm.appendChild(nameInput);
  updateForm.appendChild(phoneInput);
  updateForm.appendChild(emailInput);
  updateForm.appendChild(saveUpdateBtn);
  updateForm.appendChild(cancel);

  div.appendChild(updateForm);
}


