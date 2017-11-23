require('dotenv').config()
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.BOT_TOKEN);

bot.start();
var bookPages = 100;

function getPagination( current, maxpage ) {
  var keys = [];
  if (current>1) keys.push({ text: `«1`, callback_data: '1' });
  if (current>2) keys.push({ text: `‹${current-1}`, callback_data: (current-1).toString() });
  keys.push({ text: `-${current}-`, callback_data: current.toString() });
  if (current<maxpage-1) keys.push({ text: `${current+1}›`, callback_data: (current+1).toString() })
  if (current<maxpage) keys.push({ text: `${maxpage}»`, callback_data: maxpage.toString() });

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [ keys ]
    })
  };
}

bot.on(/\/book/, function(msg) {
  bot.sendMessage(msg.chat.id, 'Page: 25', getPagination(25,bookPages));
});

bot.on('callback_query', function (message) {
    var msg = message.message;
    var editOptions = Object.assign({}, getPagination(parseInt(message.data), bookPages), { chat_id: msg.chat.id, message_id: msg.message_id});
    bot.editMessageText('Page: ' + message.data, editOptions);
});
