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
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" v-model="task.title">
                </div>
                <div class="form-group">
                  <label for="title">Description</label>
                  <textarea type="text" class="form-control" v-model="task.description"></textarea>
                </div>
                <input type="submit" class="btn btn-warning btn-block" value="Add Task">
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
      }
    }
  },
 methods : {
   addTask(){
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
