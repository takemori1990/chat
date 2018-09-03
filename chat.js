//インスタンスの作成
var ui = new BotUI('chat-app');

var addComment = function(i){

    var roopCount = 10;
    //ボット側のチャット処理
    ui.message.bot({
    
        //メッセージを表示する
        content: 'こんにちは、ボットです！'
    
    }).then(function() {  

       
    }).then(function(){

    }).then(function(){
        //        「ボタン」を表示する
        ui.action.button({
          //「はい」「いいえ」のボタンを作成
          action: [{
              text: 'はい',
              value: true
          }, {
              text: 'いいえ',
              value: false
          }]
          
          });

          return ui.action.text({
  
            action: {
              placeholder: '名前を入力してください'
            }
            
          })
                
    }).then(function(){
        if(i < roopCount){
            i = i + 1;
            addComment(i);
        };
    });

};

addComment(0);