<template>
  <div>
    <div class="main">
      <div class="header">
        <img src="../assets/img/illustration.png" alt="" />
      </div>
      <div class="title">Today I need to</div>
      <div style="display: flex" class="inp">
        <input
          v-model="newTask"
          type="text"
          placeholder="Add new todo..."
          @keypress.enter="addTask"
        />
        <button @click="addTask">Submit</button>
      </div>

      <div class="todos">
        <div v-for="(task, i) in $store.state.tasks" :key="i" class="todo">
          <img src="../assets/img/frame.png" alt="" style="background: white" />
          <input id="" type="checkbox" name="" :checked="task.done" />
          <span style="background: white">{{ task.content }}</span>
          <img
            style="background: white"
            src="../assets/img/pencil.png"
            alt=""
          />
          <img
            style="background: white"
            src="../assets/img/bin.png"
            alt=""
            @click="removeTask(task)"
          />
        </div>
      </div>

      <div class="completedBlock">
        <div>
          <div>3 tasks</div>
          <div>Completed</div>
          <hr />
        </div>

        <div>
          <div>0 tasks</div>
          <div>To be finished</div>
          <hr />
        </div>
      </div>

      <div style="display: flex" class="chekedBtn">
        <button @click="checkAll">Check all</button>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
        <button>Clear Complited</button>
      </div>

      <!-- <div class="footer">
        <img
          src="../assets/img/checkmark.png"
          alt=""
          style="background: white"
        />
        <span style="background: white"
          >Congrat, you have no more tasks to do</span
        >
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      newTask: '',
    }
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.$store.commit('ADD_TASK', this.newTask)
        this.newTask = ''
      }
    },
    removeTask(task) {
      this.$store.commit('REMOVE_TASK', task)
    },
    toggleDone(task) {
      this.$store.commit('TOGGLE_TAK', task)
    },
    checkAll() {
      this.$store.commit('CHECK_ALL')
    },
  },
}
</script>
