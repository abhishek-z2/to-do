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

        let todos =[];
        const projects = new Set()

        function saveToLocalStorage(){
            localStorage.setItem('todos',JSON.stringify(todos))
            localStorage.setItem('projects',JSON.stringify([...projects]))

        }

        function loadFromLocalStorage(){
            const storedTodos = localStorage.getItem('todos')
            if(storedTodos){
                todos = JSON.parse(storedTodos)
            }
            const storedProjects = localStorage.getItem('projects')
            if(storedProjects){
                const loadedProject = JSON.parse(storedProjects)
                loadedProject.forEach((project)=>{
                    projects.add(project)
                })
            }
        }
        
        function getProject(){
            return projects
        }

        function addProject(project){
            if(project){
                projects.add(project)
                console.log('project added')
            }
        }
        function newTodo(title,description,dueDate,priority,notes,project){
            return createTodo(title,description,dueDate,priority,notes,project)
        }

        function formatDate(dueDate){
            return format(dueDate,'dd/MM/yy')
        }

        function addToArray(todo){
            todos.push(todo)
            saveToLocalStorage()
        }
        
        function addTodo(title,description,dueDate,priority,notes,project){
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
            saveToLocalStorage()
        }

        function getStatus(todo){
            return todo.isComplete
        }

        function getAllProjects(){
            return Array.from(projects)
        }

        loadFromLocalStorage()

        return {todos,newTodo,addToArray,filterByProject,addTodo,setComplete,getStatus,getAllProjects,addProject,getProject}
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
        const projectDialog = document.querySelector('#project-dialog')
        const projectAddButton = document.querySelector('.add-project')
        const projectSubmitButton = document.querySelector('#project-submit-button')
        const projectDialogInput = document.querySelector('#project')

        projectAddButton.addEventListener('click',()=>{
            projectDialog.showModal()
        })

        projectSubmitButton.addEventListener('click',()=>{
            todoList.addProject(projectDialogInput.value)
            console.log(projectDialogInput.value)
            console.log(todoList.getProject())
            DOMdisplay.projectDisplay()
            DOMdisplay.updateProjectDropdown()
            projectDialog.close()
        })

        DOMdisplay.projectDisplay()
        DOMdisplay.updateProjectDropdown()
        DOMdisplay.loadTodo()
        
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
            DOMdisplay.projectDisplay()

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
        const projectHeader = document.querySelector('#project-header')
        const projectDropdown = document.querySelector('#select-project')


        function updateProjectDropdown(){
            projectDropdown.innerHTML=''

            const defaultProjectItem = document.createElement('option')
            defaultProjectItem.textContent='Default'
            projectDropdown.appendChild(defaultProjectItem)

            const projects = todoList.getProject()
            projects.forEach((project)=>{
                const projectItem = document.createElement('option')
                projectItem.textContent= project
                projectDropdown.appendChild(projectItem)
            })
            
        }

        function makeTodoCard(todo,index){
            const todoCard = document.createElement('div')
            todoCard.classList.add('todo-card')
            const title = document.createElement('div')
            title.classList.add('title')
            title.textContent=todo.title
            todoCard.appendChild(title)
            const description = document.createElement('div')
            description.classList.add('description')
            description.textContent=todo.description
            todoCard.appendChild(description)
            const dueDate = document.createElement('div')
            dueDate.classList.add('due-date')
            dueDate.textContent=todo.dueDate
            todoCard.appendChild(dueDate)
            const notes = document.createElement('div')
            notes.classList.add('notes')
            notes.textContent=todo.notes
            todoCard.appendChild(notes)
            const priority = document.createElement('div')
            priority.classList.add('priority')
            priority.textContent=todo.priority
            todoCard.appendChild(priority)
            const completeButton = document.createElement('button')
            completeButton.classList.add('todo-complete')
            if (todo.isComplete) {
                todoCard.classList.add('complete')
                completeButton.textContent = 'completed';
            } else {
                completeButton.textContent = 'complete';
                todoCard.classList.add('incomplete')
            }
            completeButton.dataset.index = index

            completeButton.addEventListener('click',()=>{
                todoList.setComplete(todo)
                console.log(todo)
                loadTodo()
            })
            todoCard.appendChild(completeButton)

            return todoCard

        }
        function loadTodo(project){
            console.log('worked',todoList.todos)

            todoContainer.innerHTML=''
            if(project){
                const filteredTodoList= todoList.filterByProject(project)
                filteredTodoList.forEach((todo,index)=>{
                    const todoCard = makeTodoCard(todo,index)
                    todoContainer.appendChild(todoCard)

                })
                return
            }
            todoList.todos.forEach((todo,index)=>{
                const todoCard = makeTodoCard(todo,index)
                todoContainer.appendChild(todoCard)
            })


        }
        const projectList = document.querySelector('.project-list')
        


        function projectDisplay(){
            projectList.innerHTML=''
            const defaultProjectItem = document.createElement('li')
            defaultProjectItem.textContent='All'
            defaultProjectItem.addEventListener('click',()=>{
                projectHeader.textContent='All'
                loadTodo()
            })
            projectList.appendChild(defaultProjectItem)
            const projects = Array.from(todoList.getProject())
            console.log(projects)
            projects.forEach((project)=>{
                const projectItem = document.createElement('li')
                projectItem.textContent=project
                projectItem.addEventListener('click',()=>{
                    projectHeader.textContent=project
                    loadTodo(project)
                })
                projectList.appendChild(projectItem)
            })
        }
        return {loadTodo,projectDisplay,updateProjectDropdown}
    })()


 
    // console.log(todoList.getAllProjects())


