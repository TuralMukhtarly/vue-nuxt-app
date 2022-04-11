<template>
  <div>
    <b-container>
      <b-col class="bv-example-row">
        <b-row>
          <b-img
            thumbnail
            fluid
            src="../assets/img/illustration.png"
            alt="Image 1"
          ></b-img>
        </b-row>
        <b-row>
          <b-col>
            <h3>Today i need to</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="8">
            <b-form-input
              v-model="newTask"
              type="text"
              placeholder="Add new todo..."
              style="width: 240px"
              @keypress.enter="addTask"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-button v-if="newTask !== ''" variant="primary" @click="addTask"
              >Submit</b-button
            >
          </b-col>
        </b-row>
        <b-row style="overflow-y: scroll; width: 500px; height: 100px">
          <draggable>
            <b-row
              v-for="(task, i) in allTasks"
              :key="i"
              class="todo"
              style="margin: 20px 0 0 0"
            >
              <b-col cols="1">
                <b-iconstack font-scale="1" style="cursor: pointer">
                  <b-icon stacked icon="dot" shift-h="-3" shift-v="4"></b-icon>
                  <b-icon stacked icon="dot" shift-h="-3"></b-icon>
                  <b-icon stacked icon="dot" shift-h="-3" shift-v="-4"></b-icon>
                  <b-icon stacked icon="dot" shift-h="3" shift-v="4"></b-icon>
                  <b-icon stacked icon="dot" shift-h="3"></b-icon>
                  <b-icon stacked icon="dot" shift-h="3" shift-v="-4"></b-icon>
                </b-iconstack>
              </b-col>
              <b-col cols="1"
                ><b-form-checkbox
                  id="checkbox-1"
                  :checked="task.completed"
                  name="checkbox-1"
                  @change="doCheck(i)"
                >
                </b-form-checkbox
              ></b-col>
              <b-col cols="7">
                <h5 v-if="!task.editing">{{ task.content }}</h5>
                <b-form-input
                  v-if="task.editing"
                  v-model="editTaskName"
                  type="text"
                  placeholder="Add new todo name..."
                  style="width: 240px"
                  @keypress.enter="editTask(task)"
                ></b-form-input
              ></b-col>
              <b-col cols="1">
                <b-icon icon="pencil-fill" @click="editTask(task)"></b-icon>
              </b-col>
              <b-col> </b-col>
              <b-col cols="1">
                <b-icon
                  icon="trash-fill"
                  variant="danger"
                  @click="removeTask(task)"
                ></b-icon>
              </b-col>
            </b-row>
          </draggable>
        </b-row>

        <b-row align-h="around" style="margin: 20px 0 60px 0">
          <b-col style="width: 200px">
            <b-row
              ><h6>{{ completedTasks.length }} tasks</h6></b-row
            >
            <b-row><h5>Completed</h5></b-row>
            <b-progress
              :value="completedTasks.length"
              :max="10"
              animated
              variant="primary"
            ></b-progress>
          </b-col>
          <b-col style="width: 200px">
            <b-row
              ><h6>{{ finishedTasks.length }} tasks</h6></b-row
            >
            <b-row><h5>To be finished</h5></b-row>
            <b-progress
              :value="finishedTasks.length"
              :max="10"
              animated
              variant="danger"
            ></b-progress>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              v-for="btn in buttonsArray"
              v-show="btn.state"
              :key="btn.id"
              variant="outline-primary"
              style="margin-left: 6px"
              @click="btn.method"
              >{{ btn.name }}</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'IndexPage',
  components: {
    draggable,
  },
  data() {
    return {
      newTask: '',
      editTaskName: '',
      buttonsArray: [
        { id: 1, name: 'Check all', state: true, method: this.checkAll },
        { id: 2, name: 'All', state: true, method: this.getAll },
        { id: 3, name: 'Active', state: true, method: this.active },
        { id: 4, name: 'Complited', state: true, method: this.complited },
        {
          id: 5,
          name: 'Clear Complited',
          state: true,
          method: this.clearComplited,
        },
      ],
    }
  },

  computed: {
    allTasks() {
      return this.$store.getters.allTasks
    },
    completedTasks() {
      return this.$store.getters.completedTasks
    },
    finishedTasks() {
      return this.$store.getters.finishedTasks
    },
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.$store.commit('ADD_TASK', this.newTask)
        this.newTask = ''
      }
    },
    doCheck(index) {
      this.$store.commit('DO_CHECK', index)
    },
    removeTask(task) {
      this.$store.commit('REMOVE_TASK', task)
    },
    getAll() {
      this.$store.commit('GET_ALL')
      this.buttonsArray.forEach((btn) => {
        btn.state = true
      })
    },
    checkAll(event) {
      this.$store.commit('CHECK_ALL', event)
    },
    active() {
      this.buttonsArray.forEach((btn) => {
        if (btn.name === 'Check all') {
          btn.state = false
        } else if (btn.name === 'Clear Complited') {
          btn.state = false
        }
      })
      this.$store.commit('ACTIVE', this.tasks)
    },
    complited() {
      this.buttonsArray.forEach((btn) => {
        if (btn.name === 'Check all') {
          btn.state = false
        } else if (btn.name === 'Clear Complited') {
          btn.state = false
        }
      })
      this.$store.commit('COMPLITED')
    },
    clearComplited() {
      this.$store.commit('CLEAR_COMPLITED')
    },
    editTask(task) {
      this.$store.commit('EDIT_CONTENT', this.editTaskName)
      this.$store.commit('EDIT_TASK', task)
      this.editTaskName = ''
    },
  },
}
</script>
