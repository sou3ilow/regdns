# RegDNS

_ip_._any_.labs.jp 形式のドメイン名を<ip>に解決する簡易DNS

* _ip_はハイフン区切りで指定してください。
* マッチしないドメイン名は8.8.8.8に問い合わせます。

例

	12-34-56-78.aabbcc.labs.jp => 12.34.56.78

# install
	$ npm install
	$ patch -p0 < udp4to6.pat 

# 起動
	$ sudo node DNSServer.js
あるいは

	$ PORT=10054 node DNSServer.js

