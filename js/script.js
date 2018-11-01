// 音声認識関連
let btn = document.querySelector('#speech');
let speech = new webkitSpeechRecognition();

speech.lang = "ja";

btn.addEventListener('click', function() {
    speech.start();
});

speech.addEventListener('result', function(e) {
    // console.log(e);
    var text = e.results[0][0].transcript;
    $("#content").val(text);
});

// メモ表示
window.onload = function(){
    for(let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    // console.log(value);
    data = JSON.parse(value);
    // console.log(data);
    $('#memo-list').append(
        '<tr class="memo" id="memo_' + String(key) + '">' +
        '<td>' + '<input type="checkbox">' +
        '</td>' + '<td>' + data.title + '</td>' +
        '<td>' + data.content + '</td>' + '</tr>'
    );
    }
};
// localstorage用のkeyを作る
const makeKey = function() {
    let keys = [0];
    for(let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    let maxNum = Math.max.apply(null,keys);
    return 1 + maxNum;
}

// Save
$("#save").on('click', function() {
    let key = makeKey();
    // console.log(key);
    // 変数で入力を受け取る
    const title = $("#title").val();
    const content = $("#content").val();
    // 連想配列に入れる
    const data = {title: title, content: content};
    // ストレージへ格納
    localStorage.setItem(key, JSON.stringify(data));
    // 入力を消す
    $("#title").val("");
    $("#content").val("");
    // アラート
    alert("Saved!");
    // リロード
    window.location.reload();
});

// delete
$("#delete").on('click', function() {
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if ($('#memo_' + key + " > td > input[type='checkbox']").prop("checked")) {
            // console.log($('#memo_' + key).has($("input[type='checkbox']:checked")).length);
            localStorage.removeItem(key)
            console.log(key + "番目は削除成功")
        } else {
            console.log(key + "番目は削除しない")
        }
    }
    window.location.reload();
});
    

