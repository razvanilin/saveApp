var oauth = require('oauth');
var util = require('util');

module.exports = function(app, route) {

	var consumer = new oauth.OAuth(
  		app.settings.base_url + '/oauth/initiate',
  		app.settings.base_url + '/oauth/token',
		app.settings.consumer_key,
		app.settings.consumer_secret,
		'1.0',                             //rfc oauth 1.0, includes 1.0a
		'http://localhost:'+app.settings.port+'/callback',
		'HMAC-SHA1');

	
	app.get('/test', function(req, res, next) {
		return res.send("hello");
	});

	/*app.get('*', function(req, res) {
		res.redirect('/connect');
	});*/

	app.get('/connect', function(req, res){
		console.log("yo");
	  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
	    if (error) {
	      res.status(500).send("Error getting OAuth request token : " + util.inspect(error));
	    } else {
	      req.session.oauthRequestToken = oauthToken;
	      req.session.oauthRequestTokenSecret = oauthTokenSecret;
	      res.redirect(app.settings.base_url + "/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
	    }
	  });
	});

	app.get('/callback', function(req, res){
	  consumer.getOAuthAccessToken(
	    req.session.oauthRequestToken,
	    req.session.oauthRequestTokenSecret,
	    req.query.oauth_verifier,
	    function(error, oauthAccessToken, oauthAccessTokenSecret, result) {
	      if (error) {
	        //oauthAccessToken, -Secret and result are now undefined
	        res.status(500).send("Error getting OAuth access token : " + util.inspect(error));
	      } else {
	        //error is now undefined
	        req.session.oauthAccessToken = oauthAccessToken;
	        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
	        res.redirect('/signed_in');
	      }
	    }
	  );
	});

	app.get('/signed_in', function(req, res){
	  res.status(200).send('Signing in by OAuth worked. Now you can do API calls on private data like this one: <br><a href="/getBanks">Get private banks</a>')
	});

	app.get('/getBanks', function(req, res){
	  consumer.get("https://https://rbs.openbankproject.com/obp/v1.4.0/banks/rbs/accounts/private",
	  req.session.oauthAccessToken,
	  req.session.oauthAccessTokenSecret,
	  function (error, data, response) {
	      var parsedData = JSON.parse(data);
	      res.status(200).send(parsedData)
	  });
	});


	return function(req, res, next) {
		next();
	}
}