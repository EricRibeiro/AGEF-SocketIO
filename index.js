let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const dateFormat = require('dateformat');
const https = require('https');


io.on('connection', (socket) => {

  function getTotal(caminho){

    dataHoje = dateFormat(new Date(), "dd/mm/yyyy" );
    https.get("https://agef.herokuapp.com/vendas?dataInicial="+dataHoje+"&dataFinal="+dataHoje, (res) => {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        //io.emit('total',{total:body, nickname: socket.nickname}); AQUI AGORA VOCE PEGA OS JSONS DE CADA
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
 
  socket.on('nickname', (nickname) => {
    socket.nickname = nickname;
  });

  socket.on('total', (message) => {
    //io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
  
  socket.on('vendi', (message) => {

    io.emit('venda', {venda: message, nickname: socket.nickname} );

  });



});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

