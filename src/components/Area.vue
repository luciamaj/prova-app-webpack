<template>
  <div class="Area">
    <template v-if="sala">
      <div class='container'>
        <div class="row sala-name">
            <div class='col'>
                <h2>{{sala.name}}</h2>
            </div>
        </div>
        <div class='row'>
            <div class='col'>
                <img src="./../assets/logo.png" alt="logo">
                <nav v-on:click="clear">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link tab active"  data-toggle="tab" href="#all" role="tab"
                        aria-selected="true">tutte</a>
                        
                        <a v-bind:key="type" v-for="type in sala.types" class="nav-item nav-link tab"  data-toggle="tab" v-bind:href="'#'+getType(type).name" role="tab"
                        aria-selected="false">{{getType(type).name}}</a>
                    </div>
                </nav>
                <div class='row'>
                    <div class='col-lg-8 col-sm-12'>     
                        <div class="tab-content" id="nav-tabContent">
                          <!-- PRIMO TAB tutte macchine  -->
                          <div class="tab-pane fade active show" id="all" role="tabpanel"> 
                            <div class="row sala">
                              <template v-for="machine in sala.machines">
                                <div v-bind:key="machine" class="col-lg-4 col-md-3 machines">
                                  <button class="btn" id="screen1" data-id="macchina4">
                                    <div class="card" id="my-element" v-on:click="click(machine)">
                                      <div :class="'card-body ' + color(machine.status)">
                                        <div class="entità">
                                          <i :class="'flaticon-' + icon(machine.type)"></i>
                                          <h5 class="card-title">{{machine.name}}</h5>
                                          <p> state: {{machine.status}}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              </template>
                            </div>
                          </div>
                          <!-- altri tab  -->
                          <div v-bind:key="type" v-for="type in sala.types"  class="tab-pane fade" :id="getType(type).name" role="tabpanel"> 
                            <div class="row sala">
                              <template v-for="machine in sala.machines">
                                <div v-bind:key="machine" v-if="machine.type==type" class="col-lg-4 col-md-3 machines">
                                  <button class="btn" id="screen1" data-id="macchina4">
                                    <div class="card" id="my-element" v-on:click="click(machine)">
                                      <div :class="'card-body ' + color(machine.status)">
                                        <div class="entità">
                                          <i :class="'flaticon-' + icon(machine.type)"></i>
                                          <h5 class="card-title">{{machine.name}}</h5>
                                          <p> state: {{machine.status}}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                  <div class="warning-message" :id="machine.id">{{machine.status}}</div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div> 
                    </div>
                    <div class="col-lg-4  col-sm-12">
                        <div id="content-side" :key="contentPanel"> 
                          <h3>{{ $t('operations') }}</h3> 
                            <div v-if="contentPanel==null">
                              <p id="sideDef" >Seleziona un dispositivo</p>
                            </div>
                            <div v-else id="operazioni" >
                              <p id="risorsa">{{contentPanel.name}}</p>
                              <hr> 
                              <h4 >{{ $t('controls') }}</h4> 
                              <p>{{ $t('state') }}</p>
                              <div><p>{{contentPanel.status}}</p></div>
                              <br>
                              <div class='commands'>
                                <template v-for="command in getType(contentPanel.type).commands">
                                  <button :key="command" :class="'btn '+classBtn(command.commands)" v-on:click="commSocket('CMD '+ command.commands, contentPanel.socketId)">{{command.commands}}</button> 
                                </template>
                              </div>
                              <!--template v-if="getType(contentPanel.type).applications.length > 0">
                                <div id="app">
                                  <h4>{{ $t('applications') }}</h4>
                                  <div class="input-group mb-3">
                                    <select class="custom-select appList" id="inputGroupSelect01">
                                      <template v-for="(application, index) in applications">
                                        <option :key="application" v-if="application.name == contentPanel.application.name" :data-url="application.url" value="1" selected>{{application.name}}</option>
                                        <option v-else-if="application.type.id==contentPanel.type.id"  :key="application" :data-url="application.url" :value="index">{{application.name}}</option>
                                      </template>
                                    </select>
                                  </div>
                                </div> 
                              </template vedere se serve ancora-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
          </div>
      </div>
    </template>
  </div>
</template>

<script>

import { sendCmdPeri } from './../modules/socket.js'

export default {
  mounted () {
    //
  },
  data: function () {
    return {
      name: name,
      contentPanel: null
    }
  },
  computed: {
    sala () {
      return this.$store.getters.getSalaById(this.$route.params.id);
    },
    types () {
      console.log(this.$store.getters.types);
      return this.$store.getters.types;
    },
    applications () {
      return this.$store.getters.applications;
    }
  },
  methods: {
    color(status) {
      switch (status) {
        case "success":
            return 'on'
          break;
        case "warning":
            return 'warning'
          break;
        case "off":
            return 'off'
          break;
        default:
          return 'warning'
      }
    },
    icon(type) {
      switch (type) {
        case 1:
            return 'flat-screen'
          break;
        case 2:
            return 'projector'
          break;
        case 3:
            return 'sensor'
          break;
        default:
          console.log("WUT");
      }
    },
    classBtn(cmdName){
       switch (cmdName) {
        case "ACCENDI":
            return 'btn-success'
          break;
        case "SPEGNI":
            return 'btn-danger'
          break;
        case "RIAVVIA":
            return 'btn-warning'
          break;
        default:
          console.log("WUT"+cmdName);
      }

    },
    getType(idType) {
      let typeFound = {};

      for (let typeData of this.types) {
        if (typeData.id == idType) {
          typeFound = typeData
        }
      }

      return typeFound;
    },
    click(machine) {
      this.contentPanel = machine;
    },
    clear(){
      this.contentPanel =null;
    },
    commSocket(command, socketId) {
      console.log("send " + command + " " + socketId);
      sendCmdPeri(command, socketId);
    }
  }
}
</script>