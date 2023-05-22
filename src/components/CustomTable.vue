<template>
<div>
  <table class="table text-center">
    <thead>
      <tr><th v-for="columnName in columnNames" :key="columnName">{{ columnName }}</th></tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.value">
        <td v-for="property in item" :key="property">{{ property }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'CustomTable',
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
      values: [24, 25, 26],
    };
  },
};
</script>
