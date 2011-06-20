var DEBUG = 1;
var NAMESPACE = 'note';
var service;
function init() {
	if (DEBUG) console.log("init() - BEGIN");
	service = new rpc.ServiceProxy("http://offline.andunix.net/lib/exe/xmlrpc.php", {
		asynchronous: false,
		protocol: "XML-RPC",
		callbackParamName: 'callback'
	});
	if (DEBUG) console.log("DokuWiki version " + service.dokuwiki.getVersion());
	if (DEBUG) console.log("XML-RPC version " + service.wiki.getRPCVersionSupported());
	listLocalPages();
	if (DEBUG) console.log("init() - END");
}
function clear() {
	if (DEBUG) console.log("clear() - BEGIN");
	localStorage.clear();
	listLocalPages();
	if (DEBUG) console.log("clear() - END");
}
function download() {
	if (DEBUG) console.log("download() - BEGIN");
	//clear();
	var pages = service.dokuwiki.getPagelist(NAMESPACE, []);
	if (DEBUG) console.log(pages);
	var pagelist = [];
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		if (DEBUG) console.log('PAGE: '+page.id);
		var page_src = service.wiki.getPage(page.id);
		if (DEBUG) console.log(page_src);
		localStorage.setItem(page.id+"#text", page_src);
		localStorage.setItem(page.id+"#mtime", page.mtime);
		//localStorage.removeItem(page.id+"#mtime");
	}
	listLocalPages();
	if (DEBUG) console.log("download() - END");
}
function listLocalPages() {
	if (DEBUG) console.log("listLocalPages() - BEGIN");
	var pagelist = '<ul id="pagelist">';
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (key.match(/#text$/)) {
			var page = key.replace(/#text$/, "");
			pagelist += "<li>"+page+"</li>";
			if (DEBUG) console.log(page);
		}
	}
	pagelist += '</ul>';
	$(pagelist).replaceAll('#pagelist');
	if (DEBUG) console.log("listLocalPages() - END");
}
function listLocalNodes() {
	if (DEBUG) console.log("listLocalNodes() - BEGIN");
	var pagelist = '<ul id="pagelist">';
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (DEBUG) console.log(key);
		pagelist += "<li><strong>"+key.replace(/#/, '</strong><em>#')+"</em></li>";
		if (DEBUG) console.log(pagelist);
	}
	pagelist += '</ul>';
	$(pagelist).replaceAll('#pagelist');
	if (DEBUG) console.log("listLocalNodes() - END");
}
//
// EVERYTHING BELOW IS TEST CODE AND CAN BE REMOVED
//
function webstorage_test() {
	var pagelist = "";
	console.log("WebStorage Test - BEGIN");
	console.log("PAGES:");
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (key.match(/#text$/)) {
			var page = key.replace(/#text$/, "");
			console.log(page);
			pagelist += "<li>"+page+"</li>";
		}
	}
	$(pagelist).replaceAll('#pagelist');
	console.log("WebStorage Test - END");
}
function xmlrpc_test() {
	console.log("XML-RPC Test - BEGIN");
	/*
	var service = new rpc.ServiceProxy("http://offline.andunix.net/lib/exe/xmlrpc.php", {
		asynchronous: false,
		protocol: "XML-RPC",
		sanitize: false,
		callbackParamName: 'callback'
	});
	*/
	var pages = service.dokuwiki.getPagelist('note', []);
	console.log(pages);
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		console.log('PAGE: '+page.id);
		var page_src = service.wiki.getPage(page.id);
		console.log(page_src);
	}
	console.log("XML-RPC Test - END");
}
/*
function xmlrpc_test_1() {
	console.log("XML-RPC Test - BEGIN");
	var xml='<?xml version="1.0"?><methodCall><methodName>wiki.getRPCVersionSupported</methodName><params></params></methodCall>';
	$.ajax({
		url: "http://offline.andunix.net/lib/exe/xmlrpc.php",
		data: xml,
		dataType: "text",
		contentType:"text/xml",
		type:"post",
		success: function(data, textStatus, jqXHR){
			console.log("XML-RPC Test - SUCCESS: "+data);
		},
		error: function(){
			console.log("XML-RPC Test - ERROR");
		}
	});
	console.log("XML-RPC Test - END");
}
*/
function xmlrpc_download() {
	console.log("XML-RPC: getAllPages - BEGIN");
	/*
	var xml='<?xml version="1.0"?><methodCall><methodName>dokuwiki.getPagelist</methodName><params><param><value><string>note</string></value></param><param><array><data></data></array></param></params></methodCall>';
	$.ajax({
		url: "http://offline.andunix.net/lib/exe/xmlrpc.php",
		data: xml,
		dataType: "text",
		contentType:"text/xml",
		type:"post",
		success: function(data, textStatus, jqXHR){
			console.log("XML-RPC: getAllPages - SUCCESS: "+data);
		},
		error: function(){
			console.log("XML-RPC: getAllPages - ERROR");
		}
	});
	*/
	var pages = service.dokuwiki.getPagelist('note', []);
	console.log(pages);
	var pagelist = [];
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		console.log('PAGE: '+page.id);
		var page_src = service.wiki.getPage(page.id);
		console.log(page_src);
		localStorage.setItem(page.id+"#text", page_src);
		localStorage.setItem(page.id+"#mtime", page.mtime);
		localStorage.removeItem(page.id+"#text");
		localStorage.removeItem(page.id+"#mtime");
		/*
		pagelist.push(page.id);
		console.log("pagelist = "+pagelist);
		localStorage.setItem("pages", pagelist);
		*/
	}
	console.log("XML-RPC: getAllPages - END");
}
