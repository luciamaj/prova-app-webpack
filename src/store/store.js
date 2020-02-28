import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        flavor: '',
        applications: [],
        generalCommands: [],
        credentials: [],
        types: [],
        sale: [],
        auth: false,
        sets:[],
        machConf:[],
    },
    mutations: {
        change(state, flavor) {
          state.flavor = flavor
        },
        applicationsSet(state, applications) {
            state.applications = applications
        },
        generalCommandsSet(state, generalCommands) {
            state.generalCommands = generalCommands
        },
        credentialsSet(state, credentials) {
            state.credentials = credentials
        },
        typesSet(state, types) {
            state.types = types
        },
        saleSet(state, sale) {
            state.sale = sale
        },
        authSet(state, auth) {
            state.auth = auth
        },
        setsSet(state,sets){
            state.sets=sets
        },
        machConfSet(state,machConf){
            state.machConf=machConf
        },
    },
    getters: {
        flavor: state => state.flavor,
        applications: state => state.applications,
        generalCommands: state => state.generalCommands,
        credentials: state => state.credentials,
        types: state => state.types,
        sale: state => state.sale,
        getSalaById: (state) => (id) => {
            return state.sale.find(sala => sala.id == id)
        },
        getSaleBySetId: (state) => (id) => {
            let sale = state.sale
            console.log(sale);
            console.log("set id", id);
            let saleToReturn = [];

            sale.forEach(sala => {
                if(sala.set.id == id) {
                    saleToReturn.push(sala);
                }
            });

            console.log(saleToReturn);

            return saleToReturn;
        },
        getMachbySetId:(state) => (id) => {
            let mach = state.machConf
            console.log(mach);
            console.log("set id", id);
            let machToReturn = [];

            mach.forEach(machConf => {
                if(machConf.configure.id == id) {
                    machToReturn.push(machConf);
                }
            });

            console.log("mach return"+machToReturn);

            return machToReturn;
        },
        /*getMachbySetSalaId:(state) => (setId, salaId) => {
            let mach = state.machConf
            console.log(mach);
            console.log("set id", setId + salaId);
            let machToReturn = [];

            mach.forEach(machConf => {
                if(machConf.configure.id == setId) {
                    if(machConf.machine.sala == salaId) {
                        machToReturn.push(machConf);
                    } 
                }
            });
            console.log("set id" +machToReturn);
            return machToReturn;
        },*/
        auth: state => state.auth,
        sets: state => state.sets,
        machConf: state => state.machConf,
    }
});