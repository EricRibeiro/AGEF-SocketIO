let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var servidor = "https://agef.herokuapp.com/vendas?dataInicial=";
const dateFormat = require('dateformat');
const https = require('https');
dataHoje = dateFormat(new Date(), "dd/mm/yyyy" );


io.on('connection', (socket) => {

  function getTotal(caminho){

    https.get(caminho+dataHoje+"&dataFinal="+dataHoje, (res) => {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        io.emit('total',{total:body, nickname: socket.nickname});
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
 
  socket.on('nickname', (nickname) => {
    socket.nickname = nickname;
  });

  socket.on('total', (message) => {

    getTotal(servidor);

    //io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
  
  socket.on('venda', (message) => {

    if (socket.nickname.toString() == "loja1"){
      
    }else if( socket.nickname.toString() == "loja2" ){
    }else{

    }
    io.emit('message', {venda: message, nickname: socket.nickname});    
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

