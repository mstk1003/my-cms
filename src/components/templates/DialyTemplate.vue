<template>
  <!-- TODO ユーザーIDと月で絞り込んで日記データをfetchする機能を追加する -->
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col sm="12" md="4">
        <DialyList :contents="contents" @viewContent="viewContent"></DialyList>
      </v-col>
      <v-col sm="12" md="8">
        <!-- router-viewに挿入されるコンポーネントの全てにcontentがpropする -->
        <router-view :content="content"></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DialyList from "../organisms/DialyList";

export default {
  name: "diary",
  components: {
    DialyList
  },
  data() {
    return {
      contents: [],
      content: {}
    };
  },
  methods: {
    /**
     * リストから選択した日記をビューワーに表示する
     * @param value 選択した日記インデックス
     */
    viewContent(value) {
      // 選択したコンテンツを取得する
      this.content = this.contents[value];
      // ビューワーに画面を切り替える
      this.$router.push({ name: "dialyViewer" }).catch(error => {
        console.log("現在に遷移しようとしています", error);
      });
    },
    /**
     * 当月の日記を取得する
     */
    getDiaries() {
      // 本日を作成
      const firstDayMonth = new Date();
      // 月初を設定
      firstDayMonth.setDate(1);
      // 月初の始まりの時間に設定
      firstDayMonth.setHours(0, 0, 0, 0);

      // 本日を作成
      const lastDayMonth = new Date();
      // 1ヶ月加えて翌月にする
      lastDayMonth.setMonth(lastDayMonth.getMonth() + 1);
      // 日付に0を設定し、該当月のの0日（つまり、前月末）に設定
      lastDayMonth.setDate(0);
      // 月末の終わりの時間に設定
      lastDayMonth.setHours(23, 59, 59, 999);

      // TODO userIdとgenreIdを動的に入れる
      this.$store.dispatch("getDiariesFromFirestore", {
        userId: "masa",
        genreId: 3,
        firstDayMonth,
        lastDayMonth
      });
      this.contents = this.$store.getters.diaries;
    }
  },
  created() {
    // 当月の日記を取得する
    this.getDiaries();
  },
  beforeRouteUpdate(to, from, next) {
    // 日記を編集・新規作成した際に、当月の日記を取得し直す
    this.getDiaries();
    next();
  }
};
</script>