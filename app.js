//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


var taskInput = document.querySelector(".new-task__input"); 
var addButton = document.querySelector(".task__button_add");
var incompleteTaskHolder = document.querySelector(".incomplete-tasks__list");
var completedTasksHolder = document.querySelector(".completed-tasks__list");

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    listItem.classList.add("task");
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task__check");
    var label = document.createElement("label");
    label.classList.add("task__container", "task__text");
    label.innerText = taskString;
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("task__container", "task__input");
    var editButton = document.createElement("button");
    editButton.classList.add("task__button", "task__button_edit");
    editButton.innerText = "Edit";
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("task__button", "task__button_delete");
    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("delete-icon");
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function() {
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".task__button_edit");
    var containsClass = listItem.classList.contains("edit-mode");
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("edit-mode");
};

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function() {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".task__button_edit");
    var deleteButton = taskListItem.querySelector(".task__button_delete");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
