<template>
  <v-card @click="switchContent">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ date }}</v-card-text>
    <v-rating
      :value="listeningRating"
      color="amber"
      dense
      half-increments
      size="14"
      readonly
    ></v-rating>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "TITLE"
    },
    date: {
      type: String,
      required: true,
      default: "2020/1/1"
    },
    listeningRating: {
      type: Number,
      required: true,
      default: 3.5
    }
  },
  methods: {
    /**
     * 選択したカードに対応した日記をビューワーに表示する
     */
    switchContent() {
      this.$emit("clickCard");
    }
  }
};
</script>