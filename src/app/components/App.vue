<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
        <a href="/" class="navbar-brand">MEVN</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card text-white bg-dark">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" v-model="task.title">
                </div>
                <div class="form-group">
                  <label for="title">Description</label>
                  <textarea type="text" class="form-control" v-model="task.description"></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-warning btn-block">Add Task</button>
                </template>
                <template v-else>
                  <button class="btn btn-warning btn-block">Update Task</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.title">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-primary">Delete</button>
                  <button @click="updateTask(task._id)" class="btn btn-danger">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</div>
  
</template>

<script>
export default {
  data(){
    return {
      tasks: [],
      task: {
        title: '',
        description: ''
      },
      edit: false,
      taskToEdit:''
    }
  },
 methods : {
   sendTask(){
    if(this.edit === false){
       fetch('/tasks',{
        method: 'POST',
        body: JSON.stringify(this.task),
        headers: {
          'Accept':'application/json',
          'Content-type' : 'application/json'
        }
      })
     .then(res=> res.json())
     .then(data => {
       this.getTasks()
     })
    }else{
      fetch(`/tasks/${this.taskToEdit}`,{
        method : 'PUT',
        body: JSON.stringify(this.task),
        headers: {
          'Accept':'application/json',
          'Content-type' : 'application/json'
        }
      })
      .then(res=> res.json())
      .then(data => {
        this.getTasks()
        
      })
    }
     this.task.title = ''
     this.task.description = ''  
     
   },
   getTasks(){
     fetch('/tasks')
      .then(res => res.json())
      .then(data => { 
        this.tasks = data;
        console.log(tasks);
        
      })
   },
   deleteTask(id){
     fetch(`/tasks/${id}`, {
       method: 'DELETE',
       headers: {
         'Accept':'application/json',
         'Content-type' : 'application/json'
       }
     })
     .then(res => res.json())
     .then(data => {
       this.getTasks();
       this.edit = false;
     })
   },
   updateTask(id){
     fetch(`/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        this.task.title = data.title
        this.task.description = data.description
        this.edit = true;
        this.taskToEdit = data._id;
      })
   }
 },
 created(){
   this.getTasks()
 }
}
</script>

<style>

</style>
