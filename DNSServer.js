var dns = require('native-dns')
var named = require('./lib/index')

// eg 12.31.24.43.hfskjdhf.labs.jp
var reg = /(\d+\-\d+\-\d+\-\d+)\.[^.]+\.labs\.jp$/;
var external = '8.8.8.8'

function foward(query, opt) {
	var question = dns.Question({
		name: query.name(),
		type: query.type()
	})
	//var start = Date.now();
	var req = dns.Request({
		question: question,
		server: { address: external, port: 53, type: 'udp' },
		timeout: 1000
	});

	req.on('timeout', opt.ontimeout || function() {
		console.log('timeout');
	});
	req.on('message', opt.onmessage || function(err, ans) {
		console.log(err, ans);
	});
	req.send();
}

function setupServer() {

	var server = named.createServer();
	var ttl = 300;
	var port = process.env.PORT || 53;

	server.listen(port, function() {
		console.log('== DNS Server on port ' + port); 
	});

	server.on('query', function(query) {
		console.log(">> DNS query (%s) %s", query.type(), query.name());

		var domain = query.name();
		var match = domain.match(reg);
		var record;

		if ( match ) {
			var ip = match[1].replace(/\-/g, '.');
			console.log('  ...matched:  ' + match[1] + ' => ' + ip );
			record = new named.ARecord(ip);
			query.addAnswer(domain, record, ttl);
			server.send(query);
		} else {
			console.log('  ...unknown. fowarding to external server');
			foward(query, {
				onmessage: function(err, answer) {
					console.log('  >> response recieved.');
					//console.log(err, answer);
					if ( err ) {
						console.log("    ..error: ", err)
						return;
					}

					var a = answer.answer[0];

					try {
						if ( a ) {
							console.log("    ..resolved: " + a.address);
							record = new named.ARecord(a.address);
							query.addAnswer(domain, record, a.ttl);
							server.send(query); // 404?
						} else {
							console.log("    ..cannot resolve.");
						}
					} catch (e) {
						console.log(e, "answer.answer[0] = ", a);
					}
				},
				ontimeout: function() {
					console.log('    ..timeout');
				}
			});
		}
	});

}

setupServer();

