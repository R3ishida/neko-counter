var bgc = "rgba(250,250,250, 0.4)"
var src = chrome.extension.getURL("dat/yoshi.jpeg");
var tageq = "tag=";
var tta = "-22&";
var el = document.getElementsByTagName("body");
let lesson = [];
let count = [];
let lesson_number = [];

if(!localStorage.getItem('getCount')) {
    count = [];
} else {
    count = localStorage.getItem('getCount').split(',')
}

if(!localStorage.getItem('getLesson')) {
    lesson = [];
} else {
    lesson = localStorage.getItem('getLesson').split(',');
}

if(!localStorage.getItem('getLessonNumber')) {
    lesson_number = [];
} else {
    lesson_number = localStorage.getItem('getLessonNumber').split(',');
}

$(function() {
    $(".button").click(function() {
        let lesson_elm = document.getElementById("lesson_element").value;
        let lesson_number_elm = document.getElementById("lesson_number_element").value;
        let count_elm = "";
        for (let i = 0; i < lesson_number_elm; i++) {
            count_elm += "0"
        }
        lesson.push(lesson_elm);
        lesson_number.push(Number(lesson_number_elm));
        count.push(count_elm);
        load();
        localStorage.setItem('getCount',count);
        localStorage.setItem('getLesson',lesson);
        localStorage.setItem('getLessonNumber',lesson_number);
        console.log("セーブ更新");
    })
})

//表を示す関数
function makeTable(x) {
    console.log("表を作ってるよ")
    str += "<tr><th>" + lesson[x] + "</th>"
    if(lesson_number[x] <= 15){
        for(let i = 0; i < lesson_number[x]; i++) {
            let j = i+1;
            str += "<td id=\""+x+"-"+i+"\">"+j+"</td>";   
        }
        str += "</tr>";
        console.log("15以下のやつできた")
    } else {
        let repeat_times = Math.floor(lesson_number[x] / 15);
        console.log("repeat-timesの型"+repeat_times)
        for(let i = 0; i < repeat_times; i++) {
            for(let j = i*15; j < (i+1)*15; j++) {
                let k = j+1;
                str += "<td id=\"" + x + "-" + j + "\">" + k + "</td>"
            }
            str += "</tr><tr><th></th>";
        }
        for(let i = repeat_times*15; i < lesson_number[x]; i++) {
            let j = i+1
            str += "<td id=\"" + x + "-" + i + "\">" + j + "</td>"
        }
        console.log("15よりでかいやつできた")
    }
    str += "<tr class=\"row-space\"></tr>";
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
function load() {
    str = "";
    let elm = document.getElementsByTagName('table');
    for(let i = 0; i < Number(lesson.length); i++) {
        makeTable(i);
    }
    elm[0].innerHTML = str;
    console.log("ロードしました")
    console.log(lesson)
};
  

$(function() {
    load(); 
    if(!localStorage.getItem('getCount')) {
        $('td').css("background-color","white")
    } else {
        count = localStorage.getItem('getCount').split(',')
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
        } else { 
            // 白にする
            $(this).css("background-color", "white");
            getId = $(this).attr('id').split('-');  
            setColor(getId[0],getId[1],0)
        }
        localStorage.setItem('getCount',count);
        console.log("セーブ更新");
        
    });
});

$(function() {
    $(".delete").click(function() {
        answer = confirm("消していいんやな？");
        if(answer) {
            lesson = [];
            count = [];
            lesson_number = [];
            localStorage.setItem('getCount',count);
            localStorage.setItem('getLesson',lesson);
            localStorage.setItem('getLessonNumber',lesson_number);
            load();
        }
    })
})
