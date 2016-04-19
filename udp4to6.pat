--- node_modules/node-named/lib/server.js.orig	2016-04-19 15:19:08.000000000 +0900
+++ node_modules/node-named/lib/server.js	2016-04-19 15:19:25.000000000 +0900
@@ -50,7 +50,7 @@
 
         var self = this;
 
-        this._socket = dgram.createSocket('udp6');
+        this._socket = dgram.createSocket('udp4');
         this._socket.once('listening', function () {
                 self.emit('listening');
                 if (typeof (callback) === 'function')
@@ -71,7 +71,7 @@
                 };
 
                 var src = {
-                        family: 'udp6',
+                        family: 'udp4',
                         address: rinfo.address,
                         port: rinfo.port
                 };
