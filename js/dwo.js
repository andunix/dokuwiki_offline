var DEBUG = 1;
var NAMESPACE = 'note';
//var XMLRPCURL = 'http://offline.andunix.net/lib/exe/xmlrpc.php';
var XMLRPCURL = '../../exe/xmlrpc.php';
var loaded_page = '';
var service;
function init() {
	if (DEBUG) console.log("init() - BEGIN");
	service = new rpc.ServiceProxy(XMLRPCURL, {
		asynchronous: false,
		protocol: "XML-RPC",
		callbackParamName: 'callback'
	});
	//if (DEBUG) console.log("DokuWiki version " + service.dokuwiki.getVersion());
	//if (DEBUG) console.log("XML-RPC version " + service.wiki.getRPCVersionSupported());
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
			pagelist += '<li><a href="javascript:load(\''+page+'\')">'+page+'</a></li>';
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
function load(name) {
	$('#editarea').val(localStorage.getItem(name+"#text"));
	$('<span id="loaded_page">'+name+'</span>').replaceAll('#loaded_page');
	loaded_page = name;
}
function save() {
	
}
function empty() {
	loadedpage = '';
	$('<span id="loaded_page"></span>').replaceAll('#loaded_page');
	$('#editarea').val('');
}
