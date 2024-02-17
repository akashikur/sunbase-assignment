let formData = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
];
//to render the form data
function renderForm() {
  const form = document.getElementById("form-designer");
  form.innerHTML = "";

  formData.forEach((data) => {
    const formElement = document.createElement("div");
    formElement.classList.add("form-element");
    formElement.setAttribute("draggable", "true");
    formElement.setAttribute("data-id", data.id);
    formElement.addEventListener("dragstart", dragStart);
    formElement.addEventListener("dragover", dragOver);
    formElement.addEventListener("drop", drop);

    let inputElement;
    switch (data.type) {
      case "input":
        inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", data.placeholder);
        break;
      case "select":
        inputElement = document.createElement("select");
        data.options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          inputElement.appendChild(optionElement);
        });
        break;
      case "textarea":
        inputElement = document.createElement("textarea");
        inputElement.setAttribute("placeholder", data.placeholder);
        break;
    }
    const innerDiv = document.createElement("div");

    const labelElement = document.createElement("label");
    labelElement.textContent = data.label;

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("material-symbols-outlined");

    deleteButton.addEventListener("click", () => deleteElement(data.id));
    innerDiv.appendChild(labelElement);
    innerDiv.appendChild(deleteButton);

    formElement.appendChild(innerDiv);
    formElement.appendChild(inputElement);

    form.appendChild(formElement);
  });
}
//to add the form
function addInput() {
  formData.push({
    id: uuidv4(),
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  });
  renderForm();
}
//add selector
function addSelect() {
  formData.push({
    id: uuidv4(),
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  });
  renderForm();
}
//add the textarea
function addTextarea() {
  formData.push({
    id: uuidv4(),
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  });
  renderForm();
}
//when the drag start set the id of the formelement
function dragStart(event) {
  event.toElement.classList.add("dragged-active");
  event.dataTransfer.setData("text/plain", event.target.dataset.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const draggedId = event.dataTransfer.getData("text/plain");
  const draggedElement = document.querySelector(`[data-id="${draggedId}"]`);
  const droppedElement = event.currentTarget; //get the droped element id
  if (draggedElement !== droppedElement) {
    const draggedindex = Array.from(draggedElement.parentNode.children).indexOf(
      draggedElement
    ); //to get the index of the dragged element
    const droppedIndex = Array.from(droppedElement.parentNode.children).indexOf(
      droppedElement
    ); // to get the id of the droped element

    //swapping the data's based on the id
    const temp = formData[draggedindex];
    formData[draggedindex] = formData[droppedIndex];
    formData[droppedIndex] = temp;
  }
  renderForm();
}
//to delete the data
function deleteElement(id) {
  const filterData = formData.filter((item) => item.id != id);
  formData = filterData;
  renderForm();
}

function saveForm() {
  console.log(formData);
}
//function to get the unique id's
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
renderForm();
