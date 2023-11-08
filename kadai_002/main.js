// 変数 untyped の初期化
let untyped = "";
// 必要なHTML要素 untypedの取得
const untypedfield = document.getElementById("untyped");

// 変数 typed の初期化
let typed = "";
// 必要なHTML要素 typedの取得
const typedfield = document.getElementById("typed");

// 変数scoreの初期化
let score = 0;

// 必要なHTML要素 wrapの取得
const wrap = document.getElementById("wrap");

// 必要なHTML要素 startの取得
const start = document.getElementById("start");

// 必要なHTML要素 countの取得
const count = document.getElementById("count");

// 必要なHTML要素 timeupの取得(タイマーが0になるまで非表示にする)
// const timeup = document.getElementById("timeup");
// timeup.style.display = "none";

// 必要なHTML要素 typecountの取得(スタート前は非表示にする)
const typecount = document.getElementById("typecount");
typecount.style.display = "none";

// 複数のテキストを格納する配列
// 変数・定数を宣言するときはコードの上部に記述するのが一般的
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = "";
    typedfield.textContent = typed;

    // textListsの文字列をランダムに取得するための変数random を定義
    // floor：小数点以下を切り捨てる(小数点切り上げは cell を用いる)
    let random = Math.floor(Math.random() * textLists.length);

    // 変数untyped に配列textList の文字列をランダムに代入する
    untyped = textLists[random];
    // textContent：作成したHTML要素にテキストを追加する
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    // 「●●が押されたら」のような判定をしたいときは event.key または event.code のどちらかで判定することができる
    console.log(e.key);

    // substring()メソッド：文字列の一部を抽出する
    // substring(開始インデックス, 終了インデックスの1つ前)

    // 誤タイプの場合
    if (e.key !== untyped.substring(0, 1)) {
        // 誤タイプ時にclassList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更する
        wrap.classList.add("mistyped");

        // 100ms後に背景色を元に戻す
        // setTimeout()メソッド：一定時間後に一度だけ特定の処理を行う
        setTimeout(() => {
            wrap.classList.remove("mistyped");
        }, 100);

        return;
    };

    // 正タイプの場合
    // 正タイプ時にclassList.remove()メソッドでclass属性（mistyped）を削除し、背景色を元に戻す
    wrap.classList.remove("mistyped");

    // スコアのインクリメント
    score++;
    typecount.textContent = score;

    // 変数typed：変数untypedの先頭文字を変数typedの末尾に追加する(typed = typed + untyped.substring(0, 1);と同じ)
    typed += untyped.substring(0, 1);
    // 変数untyped：未入力の先頭文字から最後までを取得する　
    untyped = untyped.substring(1)

    // textContent：作成したHTML要素にテキストを追加する
    // タイプした内容を反映させる
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // 未入力文字がなくなったら新しいテキストを表示
    if (untyped === "") {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = "";
    
    // スコアに応じて異なるメッセージを変数textに格納する
    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};;

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
    wrap.textContent = "タイムアップ！"
    // console.log("ゲーム終了！");
    // confirm()メソッド：「OK」「キャンセル」ボタン付きのダイアログを表示する
    // const result = confirm(rankCheck(score));

    // タイムアップ画面を表示
    setTimeout(() => {
        const result = confirm(rankCheck(score));
        // OKボタンをクリックされたらリロードする
        if (result == true) {
        window.location.reload();
    }},0);
};

// カウントダウンタイマー
const timer = () => {
    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;
    // setInterval():一定の間隔で処理を実行し続けるメソッド
    const id = setInterval(() => {

        time--;
        count.textContent = time;
        // clearInterval()：タイマー処理を止めるメソッド
        // clearInterval()メソッドの引数にsetInterval()メソッドの戻り値（id）を渡すことで、タイマーを止めることができる
        if (time <= 0) {
            // clearInterval(id);
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理：スタートボタンをクリックすると
start.addEventListener("click", () => {
    // カウントダウンタイマー開始
    timer();
    // ランダムなテキストを表示する
    createText();
    // スタートボタンを非表示にする
    start.style.display = "none";

    // スコアを表示する
    typecount.style.display = "block";
    // キーを押したときに関数keyPress が実行されるようにする
    document.addEventListener("keypress", keyPress);
});

// 定数untypedfield にテキストを追加
untypedfield.textContent = "スタートボタンで開始";