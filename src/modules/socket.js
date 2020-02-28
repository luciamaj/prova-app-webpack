import { store } from './../store/store.js'
var socket = io.connect();

export function sendCmdPeri(cmd, socketId) {
    socket.emit('cmd-periferica', { "cmd": cmd, "socketId": socketId});
}

export function emitDatiDashboard() {
    socket.emit('dashboard');
}

export function recievedDatiDashboard() {
    socket.on('dati-dashboard', d => {
        store.commit('saleSet', d.museo);
    });
}

export function recievedDatiConfig() {
    socket.on('config', d => {
        store.commit('applicationsSet', d.applications);
        store.commit('generalCommandsSet', d.generalCommands);
        store.commit('credentialsSet', d.credentials);
        store.commit('typesSet', d.types);
        store.commit('setsSet',d.sets);
        store.commit('machConfSet',d.machConf);
    });
}