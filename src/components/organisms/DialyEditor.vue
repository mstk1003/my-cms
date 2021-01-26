<template>
  <div>
    <h2>エディター</h2>
    <v-text-field
      v-model="title"
      counter
      maxlength="25"
      label="Title"
    ></v-text-field>
    <v-text-field
      v-model="date"
      label="Today"
      @click="switchHidden"
      readonly
    ></v-text-field>
    <div :class="{ hidden: isHidden }">
      <v-date-picker v-model="date" @change="switchHidden"></v-date-picker>
    </div>
    <v-select :items="genres" label="Genre"></v-select>
    <span>Today's Listening</span>
    <v-rating
      v-model="rating"
      color="amber"
      dense
      half-increments
      hover
      size="50"
    ></v-rating>
    <slot class="rating">{{ rating }}/5</slot>
    <v-textarea
      v-model="dialyJp"
      outlined
      label="日本語で日記を入力"
      counter
      placeholder="今日の日記を日本語つけてください"
    ></v-textarea>
    <v-textarea
      v-model="dialyEn"
      outlined
      label="Translate your dialy in English!"
      counter
      placeholder="Write today's dialy..."
    ></v-textarea>
    <v-btn @click="register">Register</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "diaryEditor",
  props: ["content", "clearContent"],
  data() {
    return {
      diaryId: "",
      title: "",
      // TODO 動的にジャンルIDを入れる
      genres: ["1", "2", "3"],
      date: new Date().toISOString().substr(0, 10),
      isHidden: true,
      rating: 0,
      dialyJp: "",
      dialyEn: ""
    };
  },
  methods: {
    switchHidden() {
      this.isHidden ? (this.isHidden = false) : (this.isHidden = true);
    },
    register() {
      // thisをselfに格納して、vueインスタンスを引き継ぐ
      const self = this;

      if (self.diaryId) {
        firebase
          .firestore()
          .collection("dialy")
          .doc(self.diaryId)
          .update({
            // TODO userId,genreIdを動的に入力する
            userId: "masa",
            genreId: 3,
            title: self.title,
            date: new Date(self.date),
            listeningRating: self.rating,
            dialyJp: self.dialyJp,
            dialyEn: self.dialyEn
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      } else {
        firebase
          .firestore()
          .collection("dialy")
          .add({
            // TODO userId,genreIdを動的に入力する
            userId: "masa",
            genreId: 3,
            title: self.title,
            date: new Date(self.date),
            listeningRating: self.rating,
            dialyJp: self.dialyJp,
            dialyEn: self.dialyEn
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
      this.$router.push({ name: "dialyViewer" });
    }
  },
  created() {
    if (this.clearContent) {
      // TODO 要修正：propsで渡った来た値を直接変えてはいけない
      this.content = {};
    }

    this.diaryId = this.content.diaryId;
    this.title = this.content.title;
    this.date = this.content.date;
    // TODO ジャンルを動的に入力する
    // this.genres = xxxxxxx
    this.rating = this.content.listeningRating;
    this.dialyJp = this.content.dialyJp;
    this.dialyEn = this.content.dialyEn;
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.v-input {
  :hover {
    cursor: pointer;
  }
}
.v-rating {
  display: inline-block;
}
.v-btn {
  float: right;
}
</style>