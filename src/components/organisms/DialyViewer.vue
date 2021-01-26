<template>
  <div>
    <h2>{{ content.title }}</h2>
    <p>{{ content.date }}</p>
    <!-- TODO ジャンルIDからジャンル名に変換する -->
    <p>{{ content.genreId }}</p>
    <h3>リスニング</h3>
    <v-rating
      :value="content.listeningRating"
      color="amber"
      dense
      half-increments
      size="14"
      readonly
    ></v-rating>
    <div class="text-area">
      <span>日本語で日記</span>
      <br />
      <span>{{ content.dialyJp }}</span>
    </div>
    <div class="text-area">
      <span>英語で日記</span>
      <br />
      <span>{{ content.dialyEn }}</span>
    </div>
    <v-btn block @click="goEditor"> Edit </v-btn>
    <v-btn
      class="mx-2 fixed-button"
      fab
      dark
      color="indigo"
      @click="goNewEditor"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "diaryViewer",
  props: ["content"],
  methods: {
    goEditor() {
      this.$router.push({
        name: "dialyEditor",
        // TODO（優先度低） 本当はeditor/editというURLにしたい
        params: { clearContent: false }
      });
    },
    goNewEditor() {
      this.$router.push({
        name: "dialyEditor",
        // TODO（優先度低） 本当はeditor/newというURLにしたい
        params: { clearContent: true }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fixed-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.text-area {
  margin: 50px auto;
}
</style>