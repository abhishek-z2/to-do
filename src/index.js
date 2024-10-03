    import "./styles.css"
    import {format} from 'date-fns'
    // import todoList from "./todo"


    





    function createTodo(title,description,dueDate,priority,notes,project){
        return {
            title,
            description,
            dueDate,
            priority,
            notes,
            project,
            isComplete:false
        }
    }

    const todoList = (()=>{

        const projects = new Set()

        const todos =[];

        function newTodo(title,description,dueDate,priority,notes,project){
            return createTodo(title,description,dueDate,priority,notes,project)
        }

        function formatDate(dueDate){
            return format(dueDate,'dd/MM/yy')
        }

        function addToArray(todo){
            todos.push(todo)
        }
        
        function addTodo(title,description,dueDate,priority,notes,project){
            projects.add(project)
            dueDate=formatDate(dueDate)
            addToArray(newTodo(title,description,dueDate,priority,notes,project))
        }

        function filterByProject(project){
            return todos.filter((item)=>{
                return item.project==project
            })
        }

        function setComplete(todo){
            todo.isComplete = !todo.isComplete
        }

        function getStatus(todo){
            return todo.isComplete
        }

        function getAllProjects(){
            return Array.from(projects)
        }


        return {todos,newTodo,addToArray,filterByProject,addTodo,setComplete,getStatus,getAllProjects}
    })()



    const consoleDisplay = (()=>{
        function displayDefaultList(){
            for(let i = 0 ; i<todos.length;i++){
                console.log(todos[i])
            }
        }

        function displayProject(project){
            let filteredList = todoList.filterByProject(project)
            for(let i of filteredList){
                console.log(i)
            }
        }



        return {displayDefaultList,displayProject}
    })()


    
    document.addEventListener('DOMContentLoaded', () => {
        const todoDialog = document.querySelector('#todo-dialog');
        const titleInput = document.querySelector('#title');
        const descriptionInput = document.querySelector('#description');
        const dateInput = document.querySelector('#date');
        const notesInput = document.querySelector('#notes');
        const projectInput = document.querySelector('#select-project');
        // const completeButton = document.querySelector('.todo-complete')
    
        const addNewTodo = document.querySelector('.add-todo');
        addNewTodo.addEventListener('click', () => {
            todoDialog.showModal();
        });

        // completeButton.addEventListener('click',)
    
        const todoSaveButton = document.querySelector('#todo-save');
        todoSaveButton.addEventListener('click', (e) => {
            e.preventDefault()
            const title = titleInput.value;
            const description = descriptionInput.value;
            const date = new Date(dateInput.value);
            const notes = notesInput.value;
            const project = projectInput ? projectInput.value : "this";
    
            const priorityInput = document.querySelector('input[name="priority"]:checked');
            const priority = priorityInput ? priorityInput.value : "mid";
    
            todoList.addTodo(title, description, date, priority, notes, project);
            DOMdisplay.loadTodo()
            // Reset input fields
            titleInput.value = '';
            descriptionInput.value = '';
            dateInput.value = '';
            notesInput.value = '';
            projectInput.selectedIndex = 0; // Reset to first option
            
                console.log(todoList.todos)
                // console.log(typeof todoList.todos[0].title)

            // Close the dialog
            todoDialog.close();
        });



    });


    const DOMdisplay =(()=>{

        const todoContainer = document.querySelector('#todo-container')
        const projectHeader = document.querySelector('#header')

        function makeTodoCard(title_,description_,dueDate_,notes_,priority_,index){
            const todoCard = document.createElement('div')
            todoCard.classList.add('todo-card')
            const title = document.createElement('div')
            title.classList.add('title')
            title.textContent=title_
            todoCard.appendChild(title)
            const description = document.createElement('div')
            description.classList.add('description')
            description.textContent=description_
            todoCard.appendChild(description)
            const dueDate = document.createElement('div')
            dueDate.classList.add('due-date')
            dueDate.textContent=dueDate_
            todoCard.appendChild(dueDate)
            const notes = document.createElement('div')
            notes.classList.add('notes')
            notes.textContent=notes_
            todoCard.appendChild(notes)
            const priority = document.createElement('div')
            priority.classList.add('priority')
            priority.textContent=priority_
            todoCard.appendChild(priority)
            const completeButton = document.createElement('button')
            completeButton.classList.add('.todo-complete')
            completeButton.textContent='complete'
            completeButton.dataset.index = index

            completeButton.addEventListener('click',(event)=>{
                const buttonIndex = event.target.dataset.index
                todoList.setComplete(todoList.todos[buttonIndex])
                loadTodo()
            })
            todoCard.appendChild(completeButton)

            return todoCard

        }
        function loadTodo(project){
            console.log('worked',todoList.todos)

            todoContainer.innerHTML=''
            if(project!=null){
                const filteredTodoList= todoList.filterByProject(project)
                filteredTodoList.forEach((todo,index)=>{
                    const todoCard = makeTodoCard(todo.title,todo.description,todo.dueDate,todo.notes,todo.priority,index)
                    todoContainer.appendChild(todoCard)

                })
                return
            }
            todoList.todos.forEach((todo,index)=>{
                const todoCard = makeTodoCard(todo.title,todo.description,todo.dueDate,todo.notes,todo.priority,index)
                todoContainer.appendChild(todoCard)
            })


        }
        return {loadTodo}
    })()

    // console.log(todoList.getAllProjects())


