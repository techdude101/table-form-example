<template>
  <div class="accordion text-break" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header>
        <strong class="px-2">{{ title }}</strong>
      </b-card-header>
      <b-card-body>
      <slot></slot>
    </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
  },

};
</script>
