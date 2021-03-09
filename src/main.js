import Vue from 'vue'
import App from './App.vue'
import './index.css'
import VCalendar from 'v-calendar';


Vue.config.productionTip = false
Vue.use(VCalendar, {
  locales: {
    'pt-PT': {
      firstDayOfWeek: 1,
      masks: {
        L: 'YYYY-MM-DD', // Default for formatting/parsing dates
      },
    },
    // Added for GitHub Issue #330
    hu: {
      firstDayOfWeek: 2,
      masks: {
        L: 'YYYY.MM.DD',
        title: 'YYYY MMMM', // <- this doesn't work
      },
    },
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app')
