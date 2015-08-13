var mandrill = require('mandrill-api/mandrill');
var mandrillApiKey = process.env.MANDRILL_API_KEY;
var mandrillClient = new mandrill.Mandrill(mandrillApiKey);

var sendMessage = function(from, text, done) {
  var message = {
    'text': text,
    'subject': 'New Cofounder Sign Up',
    'from_email': from,
    'to': [{
      'email': 'co-founder@finleap.com',
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

var handleCofounderEmail = function(email, profileUrl, done) {
  if(email !== '' && profileUrl !== '') {
    var text = 'Cofounder:\n' + email + '\n' + profileUrl;
    sendMessage(email, text, done);
  } else {
    done(new Error('Email and Profile URL SHOULD NOT be empty.'));
  }

};

module.exports = function(req, res, next){
  var body = req.body;
  handleCofounderEmail(body.email, body.profile_url, function(err) {
    if(err !== null) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};
