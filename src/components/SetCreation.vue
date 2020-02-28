<template>
    <div class="container">
        
            <div class="row"> 
                <h3 v-if="this.$route.params.id==1"  class="col">Nuovo set</h3>
                <h3 v-else  class="col">{{sets[this.$route.params.id-1].name}}</h3>
                <div class="col save">
                <input id="submitone-form" type="submit" class="saveBtn pointer" value="SALVA">
                </div>
            </div>

        
        <div class="formCont">
            <form enctype='application/json'>

                <div v-if="this.$route.params.id==1" class="row">

                    <div  class="col-4">
                        <div class="form-group">
                            <label for="inputName">Name</label>
                            <input name='set[name]' type="text" v-model="name" class="form-control"  id="inputName" aria-describedby="setHelp">
                            <small id="setHelp" class="form-text text-muted">Inserisci un nome per il set</small>
                        </div>
                        
                    </div>
                    <div class="col-8">
                        <div class="form-group">
                            <label for="inputDesc">Short Description</label>
                            <input  name='set[desc]' type="text" v-model="description"  class="form-control " id="inputDesc">
                        </div>
                    </div>
                </div>
                <div v-else class="row">

                    <div  class="col-4">
                        <h4 class="descH"> Description
                        </h4>
                        <p class="desc"> {{sets[this.$route.params.id-1].description}}
                        </p>   
                    </div>    
                </div>
                <h4>Sale</h4>
               
                    <div class="accordion" id="accordionSale">
                        <div v-for="sala in $store.getters.sale" v-bind:key="sala">
                            <template >
                            
                            <div class="card">

                                <div class="card-header" :id="'cardH'+sala.id" >
                                    <div class="row">
                                        <div class="col-4">
                                        <button class="btn btn-link" type="button" :id="'heading'+sala.id" data-toggle="collapse" :data-target="'#collapse'+sala.id" v-bind:data-id="sala.id" aria-expanded="true" aria-controls="collapseOne" v-on:click="clickTab(sala.id)">
                                        <h4> {{ sala.name }}</h4>         
                                        </button>
                                    </div>
                                    
                                    <div class="col-1">
                                        <div class="form-check">
                                            <input class="form-check-input"  type="checkbox"  value="on" :id="'check'+sala.id"   v-on:click="check(sala.id)" checked>
                                            <label class="form-check-label" :for="'check'+sala.id">
                                               set on
                                            </label>
                                        </div>

                                    </div>
                                    </div>
                                    
                                </div>

                                <div :id="'collapse'+sala.id" class="collapse" :aria-labelledby="'heading'+sala.id" data-parent="#accordionSale"  >
                                    <div class="card-body">

                                        <div v-bind:key="type" v-for="type in sala.types"  > 
                                           
                                            <h5>{{getType(type).name}}</h5>

                                            <template v-for="conf in machConf">
                                                    <!--div v-bind:key="conf" class="row machSet">
                                                        <div>{{conf.machine.name}}</div>
                                                    </div-->


                                                <div v-bind:key="conf" v-if="conf.machine.sala==sala.id && conf.machine.type==type" class="row machSet">

                                                    <div class="col-4 machNome">
                                                        <p :id="'machN'+conf.machine.id">{{conf.machine.name}}</p>
                                                    </div>

                                                    <div class="col-4 onOff">
                                                        <div  class="custom-control custom-switch">
                                                            <div v-if="conf.on==true"> 
                                                                <input class="custom-control-input" type="checkbox" value="on" :id="'checkM'+conf.machine.id" 
                                                                v-on:click="change(conf.machine.id)" v-on:change="mod(sala.id, conf.machine.id)" checked>
                                                                <label class="custom-control-label" :for="'checkM'+conf.machine.id">on</label>
                                                            </div>
                                                            <div v-else>
                                                                 <input class="custom-control-input" type="checkbox" value="on" :id="'checkM'+conf.machine.id" 
                                                                v-on:click="change(conf.machine.id)" v-on:change="mod(sala.id, conf.machine.id)" >
                                                                <label class="custom-control-label" :for="'checkM'+conf.machine.id">off</label>


                                                            </div>
                                                            
                                                        </div>
                                                    </div>


                                                    <!--template v-if="getType(machine.type.name).applications.length > 0">
                                                        <div class="col-4 applist">
                                                            <div class="input-group mb-3">
                                                                <select class="custom-select" :id="'drop'+machine.id" v-on:change="mod(sala.id, machine.id)">
                                                                    <template v-for="application in applications" >
                                                                        <option :key="application" v-if="application.name == machine.application.name" :data-url="application.url" :id="'def'+machine.id" :value="application.name" selected>{{application.name}}</option>
                                                                        <option v-else-if="application.type.id==machine.type.id"  :key="application" :data-url="application.url" :value="application.name" >{{application.name}}</option>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    
                                                </div-->
                                            </template>  
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            </template>
                        </div>
                    </div> 
                        
                    <input type="submit" id="submit-form" class="saveBtn pointer" value="salva">     
            </form>
        </div>
    </div>
</template>

<script>


import JQuery from 'jquery';
let $ = JQuery;

    
    var app= [];
   var checkList = [];
   var accordionsOpen = [];
    var state="on";
    var description="";
    var name="";

export default {
    methods:{
        getType(idType) {
            let typeFound = {};

            for (let typeData of this.types) {
                if (typeData.id == idType) {
                typeFound = typeData
                }
            }

            return typeFound;
        },
        check(id) {
           var box=document.getElementById("check"+id);
            var cardHeader=document.getElementById('cardH'+id);
            console.log("checked", id);

            if(box.checked == false) {
               cardHeader.style.cssText = 'background-color:rgba(8,8,8,.055) !important';
                document.getElementById('heading'+id).disabled = true;
                if(this.accordionsOpen.includes("collapse"+id)) {
                    console.log("sono qui e sono aperto")
                    var cane = document.getElementById("collapse" + id);
                    $("#collapse" + id).collapse('hide');
                }
            }else{
                document.getElementById('heading'+id).disabled = false;
            }

            console.log(this.checkList);
        },
        
        clickTab(id) {
           var box= document.getElementById('check'+ id)
            console.log("ooo" +'check'+ id)


                if (!(this.accordionsOpen.includes(id))) {
                    this.accordionsOpen.push("collapse"+id);
                } else {
                    this.accordionsOpen.filter(function (item) {
                        return item !== id;
                    });
                }
            
        },

        /*clickTab: function(e, id) {
            console.log('check' + id)

            if(!(this.checkList.includes('check' + id))) {
                e.stopPropagation();
            }

            if (!(this.accordionsOpen.includes(id))) {
                this.accordionsOpen.push("collapse"+id);
            } else {
                this.accordionsOpen.filter(function (item) {
                    return item !== id;
                });
            }
        },*/
        change(id){
            console.log("ho  cliccato" +id);
            var drop=document.getElementById("drop"+id);
            var checkbox = document.getElementById("checkM"+id);
            var label= document.querySelector('label[for="checkM'+id+'"]');
             console.log(state);

            if (checkbox.checked != true)  {
               label.innerHTML="off";
                if(drop!=null){
                    drop.style.display = "none";
                    }
                return;

            }else if (checkbox.checked == true){
                 label.innerHTML="on";
                 if(drop!=null){
                     drop.style.display = "block";
                 }
                 
                return;
            }
        
        },

        mod(salaId, machId){
            console.log("gioo");
            var cardHeader=document.getElementById('cardH'+salaId);
           var  check=document.getElementById('checkM'+machId);
           var drop=document.getElementById('drop'+machId);
           var def=document.getElementById('def'+machId);
              
        
            if(check.checked!=true||(def!=null && drop.value!=def.value)){
                console.log("weei");
                cardHeader.style.cssText = 'background-color:#caa3002b !important';
            }else{
                cardHeader.style.cssText = 'background-color:rgba(8,8,8,.055) !important';
            }
            
        }
    },
  
    computed: {
    set() {
        console.log("ID", this.$store.getters.getSaleBySetId(this.$route.params.id));
       return this.$store.getters.getSaleBySetId(this.$route.params.id);
    },
    machConf(){
        console.log("machconf", this.$store.getters.getMachbySetId(this.$route.params.id));
        return this.$store.getters.getMachbySetId(this.$route.params.id);
    },
    types () {
      
      return this.$store.getters.types;
    },
    applications () {
      return this.$store.getters.applications;
    },
    sets() {
         console.log(this.$store.getters.sets);
        return this.$store.getters.sets;
       
    }
  },
  data: function () {
    return {
      name: name,
      description:description,
      checkList: checkList,
      accordionsOpen: accordionsOpen,
      app:app,
    }
  },
}
</script>