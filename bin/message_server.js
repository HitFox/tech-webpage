var mandrill = require('mandrill-api/mandrill');
var mandrillApiKey = process.env.MANDRILL_API_KEY;
var mandrillClient = new mandrill.Mandrill(mandrillApiKey);

var sendMessage = function(from, text, done) {
  var message = {
    'text': text,
    'subject': 'TechDev homepage contact request',
    'from_email': from,
    'to': [{
      'email': 'jan.varwig@hitfoxgroup.com',
      'type': 'to'
    }],
    'headers': {
        'Reply-To': from
    }
  };

  mandrillClient.messages.send({
    'message': message,
    'async': false
  }, function(result) {
    done(null);
  }, function(err) {
    done(err);
  });
};

var handleEmail = function(email, text, done) {
  if(email !== '' && text !== '') {
    sendMessage(email, text, done);
  } else {
    done(new Error('Email and Profile URL SHOULD NOT be empty.'));
  }
};

module.exports = function(req, res, next){
  var body = req.body;
  handleEmail(body.email, body.text, function(err) {
    if(err !== null) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
