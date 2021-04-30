var bgc = "rgba(250,250,250, 0.4)"
var src = chrome.extension.getURL("dat/yoshi.jpeg");
var am = "www.amazon.co.jp";
var tageq = "tag=";
var tta = "-22&";
var mtag = "amazonasociate05";
var el = document.getElementsByTagName("body");
var lesson = ['哲学的人間学','医学英語Ⅰ','地域医療学','免疫','遺伝','生体と微生物','ホメオ','組織']
let count = ["","","","","","","",""]
var lesson_number = [15,15,15,4,14,26,39,25]

for (let i = 0; i < Number(lesson.length); i++) {
    for (let j=0; j < lesson_number[i]; j++) {
        count[i] += "0"
    }
}

//チェックにする関数（count[x]のy文字目をz（0or1）に置き換え）
function setColor(x,y,z){
    let result = "";
    for(let i = 0; i < lesson_number[x]; i++) {
        if(i == y){
            result += z
        } else {
            result += count[x].charAt(i);
        }
    }
    count[x] = result
    console.log("count["+x+"]の"+y+"文字目を"+z+"に置き換え")
}


//チェックを外す関数（n文字目を1から0に置き換え）

//文字列にある数の合計値を計算する関数

window.onload = function() {

    let elm = document.getElementsByTagName('table');
    let str = "";
    for (let i = 0; i < 5; i++) {
        str += "<tr id=\"data-"+i+"\">";
        str += "<th>" + lesson[i] +"</th>";
        for(var j=1; j <= lesson_number[i]; j++){
            let k = j-1;
            str += "<td id=\""+i+"-"+k+"\">"+j+"</td>";
        }
        str += "</tr>";
        str += "<tr class=\"row-space\"></tr>";
    }

    str += "<tr><th>生体と微生物</th>";
    for (let i = 1; i < 16; i++) {
        let k = i-1;
        str += "<td id=\"5-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr><th></th>";
    for (let i = 16; i < 27; i++) {
        let k = i-1;
        str += "<td id=\"5-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr class=\"row-space\"></tr>";
    

    str += "<tr><th>ホメオ</th>";
    for (let i = 1; i < 16; i++) {
        let k = i-1;
        str += "<td id=\"6-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr><th></th>";
    for (let i = 16; i < 31; i++) {
        let k = i-1;
        str += "<td id=\"6-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr><th></th>";
    for (let i = 31; i < 40; i++) {
        let k = i-1;
        str += "<td id=\"6-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr class=\"row-space\"></tr>";


    str += "<tr><th>組織</th>";
    for (let i = 1; i < 16; i++) {
        let k = i-1;
        str += "<td id=\"7-"+k+"\">"+i+"</td>";
    }
    str += "</tr><tr><th></th>";
    for (let i = 16; i < 26; i++) {
        let k = i-1;
        str += "<td id=\"7-"+k+"\">"+i+"</td>";
    }
    
    str += "</tr><tr class=\"row-space\"></tr>";

    elm[0].innerHTML = str
};
  

$(function() {
    console.log("あああああああ")
    if(!localStorage.getItem('getColor')) {
      $('td').css("background-color","white")
    } else {
        count = localStorage.getItem('getColor').split(',')
        for (let i = 0; i < Number(lesson.length); i++) {
            for (let j = 0; j < lesson_number[i]; j++){
                if(count[i].charAt(j)=="0"){
                    $("#"+i+'-'+j+"").css("background-color","white")
                    console.log("white")
                } else {
                    $("#"+i+'-'+j+"").css("background-color","rgba(255, 217, 0, 0.6)")
                }
            }
        }
    }
    $("td").click(function() {
        // 現在のセルの色が白かを判別
        if($(this).css("background-color")=="rgb(226, 224, 224)" || $(this).css("background-color")=="rgb(255, 255, 255)")  {
            // 黄色に染める
            $(this).css("background-color", "rgba(255, 217, 0, 0.6)");         
            getId = $(this).attr('id').split('-');  
            setColor(getId[0],getId[1],1)
            console.log(count)
        } else { 
            // 白にする
            $(this).css("background-color", "white");
            getId = $(this).attr('id').split('-');  
            setColor(getId[0],getId[1],0)
            console.log(count)
        }
        localStorage.setItem('getColor',count)
        console.log("セーブ更新")
    });
});
