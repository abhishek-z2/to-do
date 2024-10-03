



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

    function addToArray(todo){
        todos.push(todo)
    }
     
    function addTodo(title,description,dueDate,priority,notes,project){
        projects.add(project)
        addToArray(newTodo(title,description,dueDate,priority,notes,project))
    }

    function filterByProject(project){
        return todos.filter((item)=>{
            return item.project==project
        })
    }

    function setComplete(todo){
        todo.isComplete=true
    }

    function getStatus(todo){
        return todo.isComplete
    }

    function getAllProjects(){
        return Array.from(projects)
    }


    return {newTodo,addToArray,filterByProject,addTodo,setComplete,getStatus,getAllProjects}
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





console.log(todoList.getAllProjects())


