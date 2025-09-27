import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // カウントダウンタイマーを作る上で必要になることはなんだろうか？
  // 1. タイマーの開始と停止
  // 2. タイマーのリセット
  // 3. タイマーの表示
  // 4. タイマーの進行
  // 5. タイマーの完了
  // 6. タイマーの表示

  // タイマーは1秒ごとに1sずつ減らしていくもの。
  // setIntervalを使って1秒ごとに1sずつ減らしていく。
  // タイマーの機能はUI描画に関係ないことだから useEffectを使う
  // 秒数を記憶する、つまり状態を記憶する必要があるからuseStateを使う
  // stateの初期値は何がいいんだろうか。
  const [time, setTime] = useState(10);

  // 正しく動いているようには見えるけど、毎回setIntervalを作り直している。
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(time - 1);
  //   }, 1000);
  //   console.log(id);
  //   return () => clearInterval(id);
  // }, [time]);

  // ただ依存配列のtimeを消しても、useEffectの実行時点の古いtimeの値しか参照しないのでtimerは機能しない
  //
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(time - 1);
  //   }, 1000);
  //   console.log(id);
  //   return () => clearInterval(id);
  // }, []);

  // この状態だと 0になったら止まるが、裏では0で更新し続けるという挙動になる。
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime((prev) => (prev > 0 ? prev - 1 : 0));
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(id); // ここで止める！
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(id);
  // }, []);

  // 本当にstateは更新されていないか、intevalはクリアされているのかを確認する方法はあるのか。
  //stateが更新される => レンダリングされる => console.logを差し込んでも良い
  // クリアされているかは クリーンアップが呼ばれているかしか確認できる術はなさそう。
  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          console.log("止まるよ");
          console.log(id);
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      console.log("クリアされるよ");
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <div>
        <h1>{time}</h1>
      </div>
    </>
  );
}

export default App;
