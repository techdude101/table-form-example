<template>
  <div id="app" class="container">
    <div id="form-container" class="col-sm-12 col-md-6 mx-auto">
      <b-row>
        <h1 v-if="browserVersion == 'IE' || browserVersion == 'Edge'">Please use a real browser</h1>
      </b-row>
      <b-row v-if="hasMounted">
        <accordion title="Measurements">
          <custom-form-table
          :items="items"
          :columnNames="['Temperature (°C)', 'Humidity (%)', 'Battery Level (%)']"
          @handle-form-data-submitted="onHandleFormDataSubmitted"
          ></custom-form-table>
        </accordion>
    </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Accordion from './components/Accordion.vue';
import CustomFormTable from './components/CustomFormTable.vue';
import {
  getBrowserVersion,
} from './utils/helpers';

import urls from './constants/urls';

export default {
  name: 'App',
  components: {
    CustomFormTable,
    Accordion,
  },
  async mounted() {
    document.title = 'Table Form Example';
    const response = await this.getDataForDevice();

    if (!response || !('data' in response)) {
      console.warn('Something went wrong :-(');
    } else {
      const {
        temperature, humidity, battery,
      } = response.data[0];

      this.items[0].temperature = temperature;
      this.items[0].battery = battery;
      this.items[0].humidity = humidity;
    }

    this.$nextTick(() => {
      this.hasMounted = true;
    });
  },
  data() {
    return {
      hasMounted: false,
      items: [
        {
          temperature: '25.4', humidity: '54', battery: '100',
        },
        // {
        //   name: 'Freezer', temperature: '-16.2', humidity: '-', battery: '99',
        // },
        // {
        //   col1: '-', col2: '-', col3: '-', col4: '-',
        // },
      ],
    };
  },
  computed: {
    browserVersion() {
      return getBrowserVersion();
    },
  },
  methods: {
    handleChange(event) {
      this.$root.$emit('bv::hide::tooltip');
      switch (event.target.name) {
        default:
          break;
      }
    },
    onHandleFormDataSubmitted(data) {
      // TODO: Fix this - breaks when more than one device (row)
      console.dir(this.items);

      const formDataArray = Object.fromEntries(data);
      console.log(formDataArray);
      this.items[0] = formDataArray;
    },
    async getDataForDevice() {
      let response = null;

      try {
        response = await axios.get(urls.API_URL);
      } catch (error) {
        response = null;
      }
      return response;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
