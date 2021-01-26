<template>
  <div>
    <div class="dialy-list">
      <DialyCard
        v-for="(content, index) in contents"
        :key="index"
        v-bind="content"
        @clickCard="getDiariesIndex(index)"
      ></DialyCard>
    </div>
  </div>
</template>

<script>
import DialyCard from "./DialyCard";

export default {
  components: {
    DialyCard
  },
  props: {
    contents: Array
  },
  methods: {
    /**
     * 選択したカードに対応した日記をビューワーに表示する
     * @param index 日記インデックス
     */
    getDiariesIndex(index) {
      this.$emit("viewContent", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialy-list {
  height: 100vh;
  overflow: scroll;
}
</style>