let host = null;
let base = null;

var currentPage = window.location.pathname.replace(host + base, "");
var socket = io.connect('http://localhost:4000');

export function recievedDatiConfig() {
    socket.emit('client');
    socket.on('url', function (url) {
        if(currentPage != url) {
            window.location.href = host + base + url;
        }
        currentPage = url;
    });

    socket.on('configuration', function (data) {
        host = data.host;
        base = data.base;
        router(data.generalConf.application.url, data.generalConf.type.name);
    });
}

function router(link, typeName) {
    if(currentPage != base + typeName + link) {
        window.location.href = host + base + typeName + link;
    }
}