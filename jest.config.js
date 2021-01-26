module.exports = {
    // verboseをtrueにすることで、テストケースごとの結果を出力する。なので、trueを設定しておくのが良い。
    // デフォルトはfalseで、テストファイルごとの結果のみの出力となる（各テストケースの結果は不明）
    verbose: true,

    // setupファイルを設定する（vuetifyをテストファイルで読み込むため）
    // setupファイルに記述した内容は、テスト実行前に実行される
    setupFiles: ["./specs/setup.js"],

    // node_moduleを無視する
    transformIgnorePatterns: [ '<rootDir>/node_modules/(?!vee-validate/dist/rules|vuetify)', ],
  
    // Jestがファイル探索するディレクトリを指定する。<rootDir>は、設定ファイルのあるディレクトリを指す。
    // 今回はルートのサブディレクトリである 「srcとspecs」のみがJestのアクセスするファイルとしたいので、下記のように定義する。
    roots: ["<rootDir>/src/", "<rootDir>/specs/"],
  
    // Jestが読み込むファイルの種類を定義
    moduleFileExtensions: ['js', 'vue'],
  
    // ファイルパスのエイリアスを作成
    // 今回は、<rootDir>/src/ のエイリアスを @ に置き換える設定をしている
    // (.*) にあたる部分が $1 で参照されるので、@/test.vue とすると $1 = test.vue となる。
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  
    // ファイルをどのモジュールでトランスパイルするかを設定する
    transform: {
      "^.+\\.js$": "babel-jest",
      // .vueファイルをvue-jestで実行する
      "^.+\\.vue$": "vue-jest",
    },
  
    // snapshotSerializers: [
    //   "<rootDir>/node_modules/jest-serializer-vue"
    // ]
  }