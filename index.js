let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const DATE_FORMAT = require('dateformat');

io.on('connection', (socket) => {
  socket.on('entrei', (message) => {
    let nickname = formatarNomeLoja(message);
    io.emit('cliente', { url: message, nickname: nickname });
  });

  socket.on('vendi', (message) => {
    let nickname = formatarNomeLoja(message.baseUrl);
    io.emit('venda', { venda: message, nickname: nickname, data: DATE_FORMAT(new Date(), "dd/mm/yyyy") });
  });

});

var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});

function formatarNomeLoja(baseUrl) {
  return baseUrl.split('/')[2].split('.')[0];;
}