// APP CONSTANTS
const COMPLETED_TASK_STATUS = "completed";
const INCOMPLETE_TASK_STATE = "incomplete";
const INVERSE = {
    [COMPLETED_TASK_STATUS]: INCOMPLETE_TASK_STATE,
    [INCOMPLETE_TASK_STATE]: COMPLETED_TASK_STATUS,
}


// INITIAL STATE
const initialState = {
    [COMPLETED_TASK_STATUS]: ["task 1", "task 2", "task 3"],
    [INCOMPLETE_TASK_STATE]: ["task 4", "task 5", "task 6"],
}


// EVENT HANDLERS
const removeTaskHandler = function(e) {
    const taskStatus = e.target.parentNode.getAttribute('taskType');
    const taskListNode = document.querySelector(`[nodeId=task-list-${taskStatus}]`);

    taskListNode.removeChild(e.target.parentNode);
}
const switchTaskStatusHandler = function(e) {
    const taskStatus = e.target.parentNode.getAttribute('taskType');
    const currentTaskList = document.querySelector(`[nodeId=task-list-${taskStatus}]`)
    const otherTaskList = document.querySelector(`[nodeId=task-list-${INVERSE[taskStatus]}]`);
    const taskNode = e.target.parentNode;

    e.target.innerText = `Mark ${[taskStatus]}`;
    currentTaskList.removeChild(taskNode);
    taskNode.setAttribute('taskType', INVERSE[taskStatus]);
    otherTaskList.appendChild(taskNode);
}
const editTaskNameHandler = function(e) {
    const editInput = document.createElement('input');
    const oldTaskName = e.target.innerText;
    editInput.value = oldTaskName;

    editInput.addEventListener('change', (function(e) {
        const taskNameSpan = document.createElement('span');

        taskNameSpan.className = 'task-name';
        taskNameSpan.innerText = e.target.value.trim() === '' ? oldTaskName : e.target.value;
        taskNameSpan.addEventListener('dblclick', editTaskNameHandler);

        e.target.parentNode.replaceChild(taskNameSpan, e.target);
    }));
    e.target.parentNode.replaceChild(editInput, e.target);
}


// TASK LIST COMPONENT
function TaskList(taskStatus) {
    this.taskStatus = taskStatus;
    this.node = null;
    this.initComponent();
}
TaskList.prototype.makeAddTaskNode = function() {
    if(this.node !== null) return;

    const addTaskNode = document.createElement('div');
    const input = document.createElement('input');
    const addIcon = document.createElement('span');

    input.placeholder = "Add new task";
    input.className = 'add-task-input';
    input.addEventListener('change', this.addTaskHandler.bind(this));

    addIcon.innerText = "add_circle_outline";
    addIcon.className = "material-icons green-color";
    addIcon.addEventListener('click', this.addTaskHandler.bind(this));

    addTaskNode.appendChild(input);
    addTaskNode.appendChild(addIcon);

    return addTaskNode;
}
TaskList.prototype.makeTaskNode = function(taskName) {
    const taskNode = document.createElement('div');
    const removeButton = document.createElement('button');
    const statusSwitchButton = document.createElement('button');
    const taskNameSpan = document.createElement('span');

    taskNode.setAttribute('taskType', this.taskStatus);
    taskNode.className = `task`;

    taskNameSpan.innerText = taskName;
    taskNameSpan.className = 'task-name';
    taskNameSpan.addEventListener('dblclick', editTaskNameHandler);

    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', removeTaskHandler);
    removeButton.className = 'remove-button';

    statusSwitchButton.innerText = `Mark ${INVERSE[this.taskStatus]}`;
    statusSwitchButton.addEventListener('click', switchTaskStatusHandler);
    statusSwitchButton.className = 'status-switch-button';

    taskNode.appendChild(taskNameSpan);
    taskNode.appendChild(removeButton);
    taskNode.appendChild(statusSwitchButton);

    return taskNode;
}
TaskList.prototype.addTaskHandler = function(e) {
    const addTaskInput = e.target.tagName !== 'INPUT' ? e.target.previousSibling : e.target;
    const taskName = addTaskInput.value;
    if(taskName.trim().length < 1) return;

    addTaskInput.value = "";
    this.node.appendChild(this.makeTaskNode(taskName));
}
TaskList.prototype.initComponent = function() {
    if(this.node !== null) return;

    const taskListNode = document.createElement('div');
    const taskListHeading = document.createElement('h3');

    taskListNode.setAttribute('nodeId', "task-list-"+this.taskStatus);
    taskListHeading.innerHTML = `${this.taskStatus.toUpperCase()} TASKS`;
    if(this.taskStatus !== COMPLETED_TASK_STATUS) taskListNode.appendChild(this.makeAddTaskNode());
    taskListNode.appendChild(taskListHeading);

    initialState[this.taskStatus].forEach((function(taskName) {
        taskListNode.appendChild(this.makeTaskNode(taskName));
    }).bind(this));

    this.node = taskListNode;
}
TaskList.prototype.getNode = function() {
    return this.node;
}


// APP INIT
const app = document.getElementById('app');
const heading = document.createElement('h1');
heading.innerHTML = "TODOS APP";
app.appendChild(heading);
app.appendChild((new TaskList(INCOMPLETE_TASK_STATE)).getNode());
app.appendChild((new TaskList(COMPLETED_TASK_STATUS)).getNode());