<template>
<div class="container">
  <div class="course-container">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col col-xs-6">
            <h3 class="panel-title">All Courses</h3>
          </div>
        </div>
      </div>

      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Title</th>
              <th scope="col">Author</th>
              <th scope="col">Detail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in courses" v-bind:key="item.id">
              <th scope="row">{{index}}</th>
              <td>{{item.title}}</td>
              <td>{{item.author}}</td>
              <td>
                <button class="btn btn-info" @click="detail(item)">Detail</button>
              </td>
              <td>
                <button class="btn btn-success" @click="enroll(item)">Enroll</button>
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
import UserService from '../services/user.service';
import CourseService from '../services/course.service';
import {User} from '../models/user';
import {Transaction} from '../models/transaction';

export default {
  name: 'home',
  data() {
    return {
      courses: [],
      currentUser: new User(),
    };
  },
  created() {
    UserService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    CourseService.findAllCourses().then(data => {
      this.courses = data.data;
    });
  },
  methods: {
    enroll(course) {
      if(!this.currentUser){
        this.$store.dispatch('error', 'You should sign in to enroll a course.');
        return;
      }
      var transaction = new Transaction(this.currentUser.id, course);
      CourseService.createTransaction(transaction).then(data => {
        this.$store.dispatch('success', 'Enrollment is completed.');
      }, error => {
        console.log(error);
        this.$store.dispatch('error', 'Unexpected error occurred.');
      });
    },
    detail(item){
	console.log(item);
      localStorage.setItem('detailCourse', JSON.stringify(item));
      this.$router.push({name: "detail", params: {id: item.id}});
    }
  },
}
</script>
<style scoped>

</style>

