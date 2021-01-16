// APP CONSTANTS
const COMPLETED_TASK_STATUS = "completed";
const INCOMPLETE_TASK_STATE = "incomplete";

// INITIAL STATE
const initialState = {
    [COMPLETED_TASK_STATUS]: ["task 1", "task 2", "task 3"],
    [INCOMPLETE_TASK_STATE]: ["task 4", "task 5", "task 6"],
}

// APP COMPONENTS
function task(taskName, taskStatus) {
    const taskNode = document.createElement('div');
    const removeButton = document.createElement('button');
    const statusSwitchButton = document.createElement('button');
    const taskNameSpan = document.createElement('span');

    taskNameSpan.innerHTML = taskName;
    removeButton.innerHTML = 'Remove';
    statusSwitchButton.innerHTML = taskStatus === "completed" ? "Mark incomplete" : "Mark completed";

    removeButton.addEventListener("click", function(e) {
        const taskList = taskNode.parentNode;
        taskList.removeChild(taskNode);
    });
    statusSwitchButton.addEventListener("click", function(e) {
        const taskList = taskNode.parentNode;
        const otherTaskStatus = taskList.id === "task-list-completed" ? INCOMPLETE_TASK_STATE : COMPLETED_TASK_STATUS;
        const otherTaskList = document.getElementById("task-list-"+otherTaskStatus);

        this.innerHTML = taskStatus === "completed" ? "Mark completed" : "Mark incomplete";
        taskList.removeChild(taskNode);
        otherTaskList.appendChild(taskNode);
    });

    taskNode.appendChild(taskNameSpan);
    taskNode.appendChild(removeButton);
    taskNode.appendChild(statusSwitchButton);

    return taskNode;
}

function taskList(taskStatus) {
    const taskListNode = document.createElement('div');
    const taskListHeading = document.createElement('h3');

    taskListNode.id = "task-list-"+taskStatus;
    taskListHeading.innerHTML = taskStatus === COMPLETED_TASK_STATUS ? "COMPLETED TASKS" : "INCOMPLETE TASKS";
    taskListNode.appendChild(taskListHeading);

    initialState[taskStatus].forEach(function(taskName) {
        taskListNode.appendChild(task(taskName, taskStatus));
    });

    return taskListNode;
}
function addTask() {
    const addTaskNode = document.createElement('div');
    const input = document.createElement('input');
    const addButton = document.createElement('button');

    addButton.innerHTML = "Add Task";
    addButton.addEventListener('click', function (e) {
        const taskNode = task(input.value, INCOMPLETE_TASK_STATE);
        const taskList = document.getElementById('task-list-'+INCOMPLETE_TASK_STATE);

        input.value = "";
        taskList.appendChild(taskNode);
    });

    addTaskNode.appendChild(input);
    addTaskNode.appendChild(addButton);

    return addTaskNode;
}

const app = document.getElementById('app');
const heading = document.createElement('h2');
heading.innerHTML = "BUILT USING ONLY DOCUMENT OBJECT";
app.appendChild(heading);
app.appendChild(addTask());
app.appendChild(taskList(INCOMPLETE_TASK_STATE));
app.appendChild(taskList(COMPLETED_TASK_STATUS));