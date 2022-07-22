const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const taskContainer = document.querySelector('[data-tasks]');



const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';


let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listContainer.addEventListener("click", e => {
    if(e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})


newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if(listName == null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
});

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

function createList(name){
    return {id: Date.now().toString(), name:name,tasks: [] }
}

function saveAndRender(){
    save();
    render();
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render(){
    clearElement(listContainer);
    renderList();
    const seletedList = lists.find(list => list.id === selectedListId); 
    if(selectedListId == null){
        listDisplayContainer.style.display = 'none';
    }else{
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = seletedList.name;
        renderTaskCount(seletedList);
        clearElement(taskContainer);
        renderTasks(seletedList);

    }

}


function renderTasks(){
    
}

function renderTaskCount(seletedList){
    const incompleteTaskCount = seletedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTaskCount === 1 ? 'Task' : 'Tasks';
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} Remaining`;
}

function renderList(){
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;
        if(list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listContainer.appendChild(listElement)
    })
}


function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render();

