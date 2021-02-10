const inputBox = document.getElementById('add'),
    todo = document.getElementById('todo'),
    todoList = document.getElementById('list'),
    deleteList = document.getElementById('deleteList');

inputBox.addEventListener('keypress', keyInput);
deleteList.addEventListener('click', (e)=>{
    //let nodes = document.querySelectorAll('deleteList'); 
    let parent = e.target.parentElement;
    let index = [].indexOf.call(parent.children, e.target);
    console.log(index);
});
// load localstorage data if present
if (localStorage.length > 0) {

    Object.entries(localStorage).forEach((el) => {
        // Textinit = JSON.parse(el[1]).value;
        // console.log(Textinit);
        // listInit(Textinit);


        // console.log(JSON.parse(el[1]).state);
        // const divList = document.createElement('div');
        // divList.className = 'item';
        // const textList = document.createTextNode(JSON.parse(el[1]).value);
        // divList.appendChild(textList);
        // todoList.appendChild(divList);
        //console.log(JSON.parse(el[1]).value, JSON.parse(el[1]).state);


        const divList = document.createElement('div'),
            textList = document.createTextNode(JSON.parse(el[1]).value),
            divDelete = document.createElement('div');
        // textDelete = document.createTextNode('<i class="far fa-trash-alt"></i>');
        // divDelete.innerHTML = '<span class="far fa-trash-alt"></span>';
        // list item 
        divList.className = 'item';
        divList.appendChild(textList);
        todoList.appendChild(divList);
        // delete button
        divDelete.className = 'itemDelete';
        //divDelete.appendChild(textDelete);
        deleteList.appendChild(divDelete);


        if (JSON.parse(el[1]).state == 'none') {
            divList.style.color = 'white';
            divList.style.textDecoration = '';
        } else {
            divList.style.color = 'lightgray';
            divList.style.textDecoration = 'line-through';
        }
    })
    Array.from(todoList.children).forEach(el => {
        el.addEventListener('click', lineItem);
    });
}

function keyInput(e) {
    if (e.key == 'Enter') {
        let char = String(inputBox.value).length;
        if (char < 5) {
            return alert(`there are few characters (${char}/5)`);
        }

        addList();
        Array.from(todoList.children).forEach(el => {
            el.addEventListener('click', lineItem);
        });
    }
}

function lineItem(e) {

    let objList = {};
    if (e.target.style.textDecoration == '') {
        e.target.style.textDecoration = 'line-through';
        e.target.style.color = 'lightgray';
        objList = {
            "value": e.target.textContent,
            "state": "active"
        }
        // save localstorage data
        localStorage.setItem(e.target.textContent, JSON.stringify(objList));
    } else {
        e.target.style.textDecoration = '';
        e.target.style.color = 'white';
        objList = {
            "value": e.target.textContent,
            "state": "none"
        }
        // save localstorage data
        localStorage.setItem(e.target.textContent, JSON.stringify(objList));
    }
}

function addList() {
    let Textinit = inputBox.value;
    listInit(Textinit);
    let objList = {};
    objList = {
        "value": inputBox.value,
        "state": "none"
    }
    // save localstorage data
    localStorage.setItem(inputBox.value, JSON.stringify(objList));
    inputBox.value = '';
    inputBox.focus;
}

function listInit(Textinit) {
    const divList = document.createElement('div'),
        textList = document.createTextNode(Textinit),
        divDelete = document.createElement('div');
    // divDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    // textDelete = document.createTextNode('<i class="far fa-trash-alt"></i>');
    // list item 
    divList.className = 'item';
    divList.appendChild(textList);
    todoList.appendChild(divList);
    // delete button
    divDelete.className = 'itemDelete';
    // divDelete.appendChild(textDelete);
    deleteList.appendChild(divDelete);
}