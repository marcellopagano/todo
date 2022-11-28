const input = document.getElementById('add')
const todoList = document.getElementById('todo-list')

let todoData = []
let todoDelete = null
let todoUpdate = null
let todoItem = null

const todoHtml = () => {
    // load localStorage data
    const loadTodo = JSON.parse(localStorage.getItem('todo')) || []
    todoData = [...loadTodo]
    console.log(todoData)
    let html = ''
    todoList.innerHTML = ''
    for (const obj of loadTodo) {
        html += `
    <div class="todo-item">
        <div class="col-wrap">
            <div class="item ${obj.marks ? 'marks' : ''}">${obj.todo}</div>
            <div class="dtime">${obj.date}</div>
        </div>
        <div class="item-update"></div>
        <div class="item-delete"></div>
    </div>
    `
    }
    todoList.insertAdjacentHTML('beforeend', html)
    todoDelete = document.querySelectorAll('.item-delete')
    todoUpdate = document.querySelectorAll('.item-update')
    todoItem = document.querySelectorAll('.item')
    deleteFn(todoDelete)
    updateFn(todoUpdate)
    marksFn(todoItem)
}

function deleteFn(todoDelete) {
    Array.from(todoDelete).forEach((buttonDelete, idx) => {
        buttonDelete.addEventListener('click', () => {
            if (confirm(`Delete : ${todoData[idx].todo} ?`)) {
                todoData.splice(idx, 1)
                localStorage.setItem('todo', JSON.stringify(todoData))
                todoHtml()
            }
        })
    })
}

function updateFn(todoUpdate) {
    Array.from(todoUpdate).forEach((buttonUpdate, idx) => {
        buttonUpdate.addEventListener('click', () => {
            const updateTodo = prompt(`Update todo : ${todoData[idx].todo}`)
            updateTodo !== null && updateTodo !== ''
                ? todoData[idx].todo = updateTodo
                : null
            localStorage.setItem('todo', JSON.stringify(todoData))
            todoHtml()
        })
    })
}

function marksFn(todoItem) {
    Array.from(todoItem).forEach((todo, idx) => {
        todo.addEventListener('click', () => {
            todoData[idx].marks = !todoData[idx].marks
            todoItem[idx].classList.toggle('marks')
            localStorage.setItem('todo', JSON.stringify(todoData))
            todoHtml()
        })
    })
}

input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value !== '') {
        const text = e.target.value
        const marks = false
        const date = new Intl.DateTimeFormat('it-IT', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
        todoData.unshift({ todo: text, marks: marks, date: date })
        localStorage.setItem('todo', JSON.stringify(todoData))
        e.target.value = ''
        todoHtml()
    }
})
// init
todoHtml()