import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        diaries: [],
        viewingDiaryIndex: 0
    },
    getters: {
      diaries(state){
        return state.diaries;
      },
      viewingDiaryIndex(state) {
          return state.viewingDiaryIndex;
      }
    },
    mutations: {
        /**
         * 日記リストを初期化する
         * @param state ペイロード
         */
        resetDiaries(state) {
            state.diaries = [];
        },
        /**
         * 日記リストを更新する
         * @param state ペイロード
         * @param diaries 日記リスト
         */
        inputDiaries(state, diary) {
            // diary.date.secondsがUNIX時間（1970/1/1からの経過秒数）。
            // new Dateはnano秒を元に日付を計算するので、秒数を1000倍する必要がある。
            diary.date = new Date(diary.date.seconds*1000).toISOString().substr(0, 10)
            state.diaries.push(diary);
        }
    },
    actions: {
        /**
         * Firestoreから指定した月の日記を取得する
         * @param userId ユーザーID
         * @param genreId ジャンルID
         * @param firstDayMonth 月初
         * @param lastDayMonth 月末
         */
        getDiariesFromFirestore({ commit }, {userId, genreId, firstDayMonth, lastDayMonth}){
            // ストアの日記リストを初期化する
            commit('resetDiaries');
            let diariesRef = firebase.firestore().collection("dialy");
            // Firestoreで降順設定しているから、「startDate,endDate」が「startAt,endDate」にマッチしてないからちょっと気持ち悪いが、これで正しい
            let diaries = diariesRef.where("userId","==",userId).where("genreId","==",genreId).orderBy("date", 'desc').startAt(lastDayMonth).endAt(firstDayMonth);
            diaries.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // ストアの日記リストを更新する
                    commit('inputDiaries',{
                        diaryId: doc.id,
                        ...doc.data()
                    });
                });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})

export default store;