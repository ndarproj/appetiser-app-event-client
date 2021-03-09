<template>
  <div>
    <form
      @submit.prevent="createEvent()"
      class="grid grid-cols-2 shadow-xl rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="col-span-2">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="eventName"
        >
          Event Name:
        </label>
        <input
          type="text"
          class="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="event.eventName"
        />
      </div>

      <div class="">
        <label
          class="block text-gray-700 text-sm font-bold mb-2 pt-3"
          for="startDate"
        >
          From / Start Date:
        </label>
        <input
          type="date"
          class="shadow appearance-none border-black border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="event.startDate"
        />
      </div>
      <div class="">
        <label
          class="block text-gray-700 text-sm font-bold mb-2 pt-3"
          for="endDate"
        >
          To / End Date:
        </label>
        <input
          type="date"
          class="shadow appearance-none border-black border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="event.endDate"
        />
      </div>

      <div class="pt-5 col-span-2">
        <h2 class="block text-gray-700 text-sm font-bold mb-2">Days of Week</h2>
        <input type="checkbox" v-model="event.daysOfWeek" value="1" />
        <label class="pl-1 pr-1" for="daysOfWeek">Mon</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="2" />
        <label class="pl-1 pr-1" for="daysOfWeek">Tue</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="3" />
        <label class="pl-1 pr-1" for="daysOfWeek">Wed</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="4" />
        <label class="pl-1 pr-1" for="daysOfWeek">Thu</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="5" />
        <label class="pl-1 pr-1" for="daysOfWeek">Fri</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="6" />
        <label class="pl-1 pr-1" for="daysOfWeek">Sat</label>

        <input type="checkbox" v-model="event.daysOfWeek" value="0" />
        <label class="pl-1 pr-1" for="daysOfWeek">Sun</label>
      </div>

      <div class="pt-5 col-span-2">
        <button
          :disabled="isLoading"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Event
        </button>
        <p class="text-red-500" v-for="error in errors" :key="error">
          <small> {{ error }} </small>
        </p>

        <p class="text-green-500" v-if="successMessage">
          {{ successMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import constants from "../constants.js";

export default {
  name: "Event",
  data() {
    return {
      event: {
        eventName: "",
        daysOfWeek: [],
        startDate: "",
        endDate: "",
      },
      errors: "",
      successMessage: "",
      isLoading: false,
    };
  },
  methods: {
    emits: ["event-created"],
    createEvent() {
      this.isLoading = true;
      axios
        .post(constants.baseUrl + "/event", {
          name: this.event.eventName,
          days_of_week: this.event.daysOfWeek,
          start_date: this.event.startDate,
          end_date: this.event.endDate,
        })
        .then(() => {
          this.$emit("event-created");
          this.successMessage = "Success";
          this.errors = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });

      this.isLoading = false;
    },
  },
};
</script>

