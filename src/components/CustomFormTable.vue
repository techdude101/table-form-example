<template>
<div>
  <form @submit.prevent="handleSubmit">
  <table class="table text-center">
    <thead>
      <tr><th v-for="columnName in columnNames" :key="columnName">{{ columnName }}</th></tr>
    </thead>
    <tbody>
        <tr v-for="item in items" :key="item.value">
          <td v-for="(property, name, index) in item" :key="property + index">
            <input :name="name" type="text" size=""
              :value="property" @focus="handleShowSubmitButton">
          </td>
        </tr>
        <tr v-if="showSubmitButton">
          <td :colspan="columnNames.length - 1"></td>
          <td><input type="submit" value="Save"></td>
        </tr>
      </tbody>
    </table>
  </form>
</div>
</template>

<script>
export default {
  name: 'CustomFormTable',
  props: {
    columnNames: {
      type: Array,
      required: true,
      default: () => [],
    },
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.hasMounted = true;
    });
  },
  data() {
    return {
      hasMounted: false,
      showSubmitButton: false,
    };
  },
  methods: {
    handleSubmit(event) {
      this.$emit('handle-form-data-submitted', new FormData(event.target));
      this.showSubmitButton = false;
    },
    handleShowSubmitButton() {
      this.showSubmitButton = true;
    },
  },
};
</script>

<style scoped>
input {
  border: none;
  text-align: center;
  width: 100%;
}
</style>
