let toDo = []
//API lap danh sach cong viec
function getToDoAPI(){
    return axios.get("/todos");
}
//API xoa cong viec
function deleteToDosAPI(id){
    return axios({
        method: "delete",
        url: `/todos/${id}`
    })
}

// API thêm công việc
function addTodoAPI(title) {
    return axios.post("/todos", {
        id: randomId(),
        title: title,
        status: false,
    });
}

function randomId(){
    return Math.floor(Math.random() * 100000)
}

//Lay danh sach toDo
async function getToDos(){
    try {
        const res = await getToDoAPI()
        toDo = res.data
        //render
        renderUI(toDo)
    } catch (error) {
        console.log(error);    
    }
}

async function deleteToDo(id){
    try {
       const res = await deleteToDosAPI(id)
       if(res.status == 200){
           toDo.forEach((todo, index) => {
               if(todo.id == id){
                   toDo.splice(index, 1)
               }
           })
        renderUI(toDo)
       }
    } catch (error) {
        console.log(error);
    }
}

async function createTodo(title) {
    try {
        const res = await addTodoAPI(title)
        toDo.push(res.data)

        renderUI(toDo);

    } catch (error) {
        console.log(error);
    }
}




const toDoList = document.querySelector(".todo-list")
const toDoInput = document.getElementById("todo-input")
const btn_add = document.getElementById("btn-add")

function renderUI(arr){
    toDoList.innerHTML = '';
    // ktra mang rong
    if(arr.length == 0){
        toDoList.innerHTML = "khong co cong viec nao trong danh sach"
        return;
    }
    for(let i = 0; i < arr.length; i++){
        const t = arr[i];
        toDoList.innerHTML +=`<div class="todo-item ${t.status ? "active-todo" : ""}">
        <div class="todo-item-title">
            <input type="checkbox" ${t.status ? "checked" : ""}>
            <p>${t.title}</p>
        </div>
        <div class="option">
            <button class="btn btn-update">
                <img src="./img/pencil.svg" alt="icon">
            </button>
            <button class="btn btn-delete" onclick="deleteToDo(${t.id})">
                <img src="./img/remove.svg" alt="icon">
            </button>
        </div>
    </div>`
    }
}

btn_add.addEventListener('click', function(){
    let toDoTitle = toDoInput.value
    if(toDoTitle == ''){
        alert("tieu de khong dc de rong")
        return
    }
    createTodo(toDoTitle)
    toDoInput.value = ""
})

window.onload = () => {
    getToDos()
}