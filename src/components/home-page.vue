<template>
  <v-container>
    <v-card class="pa-5 mx-auto" max-width="900" color="rgba(255,255,255,0.03)">
      <v-card-title class="text-h4 text-white">Today</v-card-title>
      <v-card-subtitle class="text-white">
        Wake up, go ahead, do the thing not tomorrow, do it today.
      </v-card-subtitle>

      <v-row>
        <v-col cols="6">
          <v-card class="pa-3" color="rgba(255,255,255, 0.05)" elevation="2">
            <v-card-title class="text-h5 text-white">Todo List</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item v-for="(task, index) in tasks" :key="index" color="rgba(255,255,255,0.07)">
                <v-row align="center">
                  <v-col>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold text-white">{{ task.name }}</v-list-item-title>
                      <v-list-item-subtitle class="text-grey-lighten-1">{{ task.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn icon @click="removeTask(index)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="pa-5 text-center" color="rgba(255,255,255,0.03)" elevation="2">
            <v-card-title class="text-h5 text-white">Finished Tasks</v-card-title>
            <v-card-text class="text-h2 text-white">{{ finishedTasks }}</v-card-text>
          </v-card>

          <v-card class="pa-4 mt-5" color="rgba(255,255,255,0.03)" elevation="2">
            <v-card-title class="text-h5 text-white">Add New to do</v-card-title>
            <v-text-field v-model="newTask.name" label="Task Name" color="white"></v-text-field>
            <v-text-field v-model="newTask.description" label="Task Description" color="white"></v-text-field>
            <v-btn class="text-black" color="white" block @click="addTask">Create Todo</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="chuck-norris-card" color="transparent" elevation="0">
      <v-card-subtitle class="text-caption text-grey-darken-1">
        "{{ chuckNorrisJoke }}"
      </v-card-subtitle>
      <v-card-text class="text-caption font-italic text-grey-darken-1">
        By Chuck Norris.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
    const finishedTasks = ref(Number(localStorage.getItem("finishedTasks")) || 0);
    const newTask = ref({ name: "", description: "" });
    const chuckNorrisJoke = ref("");

    const addTask = () => {
      if (newTask.value.name.trim() && newTask.value.description.trim()) {
        tasks.value.push({ ...newTask.value });
        localStorage.setItem("tasks", JSON.stringify(tasks.value));
        newTask.value = { name: "", description: "" };
      }
    };

    const removeTask = (index) => {
      tasks.value.splice(index, 1);
      finishedTasks.value += 1;
      localStorage.setItem("tasks", JSON.stringify(tasks.value)); 
      localStorage.setItem("finishedTasks", finishedTasks.value); 
    };

    const fetchChuckNorrisJoke = async () => {
      try {
        const response = await axios.get("https://api.chucknorris.io/jokes/random");
        chuckNorrisJoke.value = response.data.value;
      } catch (error) {
        chuckNorrisJoke.value = "Error fetching joke.";
      }
    };

    onMounted(fetchChuckNorrisJoke);

    return {
      tasks,
      newTask,
      addTask,
      removeTask,
      finishedTasks,
      chuckNorrisJoke,
    };
  },
};
</script>

<style scoped>
.chuck-norris-card {
  position: fixed;
  bottom: 10px;
  left: 10px;
  max-width: 360px;
}
</style>