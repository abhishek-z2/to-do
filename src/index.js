const TodoArray = [];

function Todo(title,description,dueDate,priority,notes,project){
    this.title= title
    this.description=description
    this.dueDate=dueDate
    this.priority=priority
    this.notes=notes
    this.project=project
    this.isComplete=false

}

const todoList = (()=>{
    function newTodo(title,description,dueDate,priority,notes,project){
        return new Todo(title,description,dueDate,priority,notes,project)
    }

    function addToArray(todo){
        TodoArray.push(todo)
    }
     
    function addToList(title,description,dueDate,priority,notes,project){
        addToArray(newTodo(title,description,dueDate,priority,notes,project))
    }

    function filterByProject(project){
        return TodoArray.filter((item)=>{
            return item.project==project
        })
    }

    function setComplete(todo){
        todo.isComplete=true
    }

    function getStatus(todo){
        return todo.isComplete
    }


    return {newTodo,addToArray,filterByProject,addToList,setComplete,getStatus}
})()



const consoleDisplay = (()=>{
    function displayDefaultList(){
        for(let i = 0 ; i<TodoArray.length;i++){
            console.log(TodoArray[i])
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


todoList.addToList("study","for",10,"min","only","rocks")
todoList.addToList("study","for",10,"min","only","smash")
todoList.addToList("study","for",10,"min","only","rocks")
todoList.addToList("study","for",10,"min","only","smash")
todoList.addToList("study","for",10,"min","only","smash")
todoList.addToList("study","for",10,"min","only","rocks")
todoList.addToList("study","for",10,"min","only","smash")

console.log(new Date(), "this i sthe new date")


// consoleDisplay.displayProject("smash")


// console.log(TodoArray,"this is the list")
