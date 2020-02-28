<template>
    <div class="container">
        <div class="row setH" >
            <div class="col"> <h3>Set Disponibili</h3></div>
            <div class="col">
                <button class="btn  btn-success input" v-on:click="newS"> + Crea  Nuovo</button>
            </div>
        </div>      
        <div class="row sets">
            <div class="singleSet" v-for="set in sets" v-bind:key="set">
                <template v-if="set.active==true">
                    <div class="form-check" v-if="set.id==1">
                        <input class="form-check-input" type="radio" name="exampleRadios" :id="'exampleRadios'+set.id" :value="set.id" checked>
                        <label class="form-check-label" :for="'exampleRadios'+set.id">
                            <div class="row">
                                <div class="col-lg-4 col-sm-4"><h5>{{set.name}}</h5></div>
                                <div class="col-lg-5 col-sm-4"><p>{{set.description}}</p></div>
                            </div>
                        </label>
                    </div>
                    <div class="form-check" v-else>
                        <input class="form-check-input" type="radio" name="exampleRadios" :id="'exampleRadios'+set.id" :value="set.id" checked>
                        <label class="form-check-label" :for="'exampleRadios'+set.id">
                            <div class="row">
                                <div class="col-lg-4 col-sm-4"><h5>{{set.name}}</h5></div>
                                <div class="col-lg-5 col-sm-4"><p>{{set.description}}</p></div>
                                <div class="col-lg-3 col-sm-4 modifica"><button class="btn btn-warning"  v-on:click="modify(set.id)">MODIFICA</button>
                                <button class="btn btn-danger"  v-on:click="modify(set.id)">ELIMINA</button></div>
                                
                            </div>
                        </label>
                    </div>
                        
                </template> 
                <template v-else>
                    <div class="form-check" v-if="set.id==1">
                        <input class="form-check-input" type="radio" name="exampleRadios" :id="'exampleRadios'+set.id" :value="set.id" >
                            <label class="form-check-label" :for="'exampleRadios'+set.id">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-4"><h5>{{set.name}}</h5></div>
                                    <div class="col-lg-5 col-sm-4"><p>{{set.description}}</p></div>
                                    
                                </div>
                            </label>
                        </div>
                        <div class="form-check" v-else>
                            <input class="form-check-input" type="radio" name="exampleRadios" :id="'exampleRadios'+set.id" :value="set.id">
                            <label class="form-check-label" :for="'exampleRadios'+set.id">
                                <div class="row">
                                    <div class="col-lg-4 col-sm-4"><h5>{{set.name}}</h5></div>
                                    <div class="col-lg-5 col-sm-4"><p>{{set.description}}</p></div>
                                    <div class="col-lg-3 col-sm-4 modifica"><button class="btn btn-warning"  v-on:click="modify(set.id)">MODIFICA</button>
                                    <button class="btn btn-danger"  v-on:click="modify(set.id)">ELIMINA</button></div>
                                    
                                </div>
                            </label>
                        </div>

                </template> 
            </div>
            <div><button class="btn  btn-success" v-on:click="newS"> Applica</button></div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    methods: {
        newS(){
            window.location.href="/#/setMod/1";
        },
        modify(id){
            window.location.href="/#/setMod/"+id;
        },
    },

    computed:{
        sets() {
            console.log( "sets"+this.$store.getters.sets);
            return this.$store.getters.sets;
       }
    }
}
</script>
