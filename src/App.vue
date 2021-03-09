<template>
  <div class="container mx-auto mt-16 bg-white grid grid-cols-3">
    <div class="">
      <Event @event-created="getEvents()" />
    </div>
    <div class="col-span-2">
      <Calendar :events="events" />
    </div>
  </div>
</template>

<script>
import Event from "./components/Event.vue";
import Calendar from "./components/Calendar.vue";
import axios from "axios";
import constants from "./constants.js";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  data() {
    return {
      events: [
        {
          key: uuidv4(),
          customData: {
            title: "",
            class: "",
          },
          dates: null,
        },
      ],
      isLoading: false,
      failedToUpdate: false,
    };
  },
  components: {
    Event,
    Calendar,
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      this.isLoading = true;
      axios
        .get(constants.baseUrl + "/event")
        .then((res) => {
          this.parseEvents(res.data.data);
        })
        .catch(() => {
          this.failedToUpdate = true;
        });

      this.isLoading = false;
    },
    parseEvents(events) {
      this.events = [];
      events.forEach((event) => {
        let startDate = moment(event.start_date);
        let endDate = moment(event.end_date);

        event.days_of_week.forEach((day) => {
          let tmp = startDate.clone().day(day);
          if (tmp.isSame(tmp.startOf("day")) || tmp.isAfter(startDate, "d")) {
            this.events.push({
              key: uuidv4(),
              customData: {
                title: event.name,
              },
              dates: new Date(tmp),
            });
          }
          while (tmp.isBefore(endDate)) {
            tmp.add(7, "days");
            if (!tmp.isAfter(endDate)) {
              this.events.push({
                key: uuidv4(),
                customData: {
                  title: event.name,
                },
                dates: new Date(tmp),
              });
            }
          }
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  --tw-bg-opacity: 1;
  background-color: rgba(156, 163, 175, var(--tw-bg-opacity));
}
</style>
