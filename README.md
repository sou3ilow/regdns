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

# エラー

	Error: bind EACCES 0.0.0.0:53

権限がない可能性があります。sudoをつけて実行するか、PORTを指定してください。


	Error: bind EADDRINUSE 0.0.0.0:53

他のインスタンスを動作させていない場合は、システムのDNSが動作している可能性があります。
インターネット共有等を一旦OFFにすると53番が開放されることがあります。


