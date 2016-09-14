
var options = {
  twilio: {
    user: 'AC729cdb295dbb7f29c57c27c5314c39d0',
    pass: 'fa870373ba786433c4425a423ed4d242',
    number: '6137020289'
  },
  mailer: {
    user: 'notificationsystem1335@gmail.com',
    pass: '4nXTiBoEjczaCaZjn',
    type: '@smtp.gmail.com'
  }
};

var nodemailer = require('nodemailer').createTransport('smtps://' +
      options.mailer.user + ':' +
      options.mailer.pass +
      options.mailer.type);
var twilio = require('twilio')(options.twilio.user, options.twilio.pass);

exports.email = function (to, msg) {
  var mailOptions = {
      from: 'Smart Home 👥 <' + options.mailer.user + '>',
      to: to,
      subject: 'Smart Home',
      text: msg
  };
  nodemailer.sendMail(mailOptions, function(err, info) {});
}

exports.phone = function(to, msg) {
  twilio.sendMessage({
      to:'+1' + to,
      from: '+1' + options.twilio.number,
      body: msg

  }, function(err, responseData) {});
}
