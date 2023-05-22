<template>
    <b-tooltip noninteractive triggers=hover v-if="hasMounted && tooltipText.length !== 0"
    :target="getElementByName(targetElementName)">
      <div :key="line" v-for="line in getToolTipLines">
        {{line}}
      </div>
    </b-tooltip>
</template>

<script>
export default {
  name: 'CustomToolTip',
  props: {
    tooltipText: {
      default: 'Tooltip',
      type: String,
    },
    targetElementName: {
      default: '',
      type: String,
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
    };
  },
  computed: {
    getToolTipLines() {
      return this.splitTextBySeparator(this.tooltipText, '\\n');
    },
  },
  methods: {
    getElementByName(name) {
      return document.getElementsByName(name)[0];
    },
    splitTextBySeparator(text, separator) {
      let list = [];
      list = text.split(separator);
      return list;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
