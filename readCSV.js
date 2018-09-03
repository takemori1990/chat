var ui = new BotUI('chat-app');

var chat = function(){
    var date = document.getElementById('date');
    //alert(date.value=='20180831.csv');
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", '20180831.csv', true); // アクセスするファイルを指定
    req.overrideMimeType('text/plain; charset=Shift_JIS'); 
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
        
        //convertCSVtoArray(req.responseText,ja,en); // 渡されるのは読み込んだCSVデータ
        var str = req.responseText;
        var result = []; // 最終的な二次元配列を入れるための配列
        var questions = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

        start(questions , 0 , ui);
    }

    req.onerror = function(e){
        alert('failed to read file');
    }

};

var printAction = function(str){
    return ui.action.text({

        action: {
        placeholder: str
        }
        
    })
}
var printBot = function(str){
    ui.message.bot({content: str});
}

var start = function(questions , i , ui){
        if(i==(questions.length-1)){
            return;
        }
        var answer = '';
        var question = questions[i].split(',');
        question[3]=1;//level
        ja=question[1];//javanese
        en=question[2];//english

        //ボット側のチャット処理
        ui.message.bot({
    
            //日本語文
            content: (i+1)+'問目 :  '+ja
        
        }).then(function(){
            //printBot((i+1)+'問目 :  '+ja);
        }).then(function() { 
            //return printAction('解答');  
            return ui.action.text({

                action: {
                placeholder: '解答'
                }
                
            });       
        }).then(function(ret){
            answer = ret.value;
            // if(answe == en.replace('\r','') ){
            //     question[3] = 2;//正解したら２
            // }
            ui.message.bot({
                content: en
            });
        }).then(function(){
            //不正解の場合3回くらい書かせようかな
            if(en.replace('\r','') != answer){
                return printAction('やり直し1');
            }
            
        }).then(function(){
            //不正解の場合3回くらい書かせようかな
            if(en.replace('\r','') != answer){
                return printAction('やり直し2');
            }
            
        }).then(function(){
            //不正解の場合3回くらい書かせようかな
            if(en.replace('\r','') != answer){
                return printAction('やり直し3');
            }
            
        }).then(function(){
            if(i < questions.length){
                i = i + 1;
                start(questions , i , ui);
            }
        });
};

