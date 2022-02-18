<template>
    <div class="temp-gest-notify" v-if="fase == 0">
        
        <div>
            <h1>Crea una notificación</h1>

            <div class="card card-notify-form">

                <div class="notify-title">
                    <h1>1</h1>
                    <h3>Características generales</h3>
                </div>

                <input type="text" v-model="notificacion.titulo" class="input" placeholder="Escribe un título">

                <textarea class="textarea" v-model="notificacion.descripcion" cols="30" rows="10" placeholder="Descripción" ></textarea>
            </div>
        </div>

        <div style="margin-top:45px">
            <div class="card card-notify-form">

                <div class="notify-title">
                    <h1>2</h1>
                    <h3>Características generales</h3>
                </div>

                <div class="inicio-right-sub-content" v-if="edit == 0">
                    <h4>Rango de puntos requerido</h4>

                    <div @click="SelectAllRango" class="checkbox-group" >
                        <input type="checkbox" id="todoRango"> 
                        <label for="todo"> SELECCIONAR TODO</label>
                    </div> 
                    
                    <div  class="checkbox-group" v-for="rango in rangos" :key="rango.id">
                        <input type="checkbox" class="check_rangos" @click="selectRango(rango.valor, $event)"  :id="rango.id" > 
                        <label :for="rango.id"> {{ rango.valor }}</label>
                    </div> 
                    
                </div>


                <div class="inicio-right-sub-content">
                    <h4>Selecciona el/los negocios a notificar</h4>

                    <div class="content-list-negocios">

                        <div v-if="negocios == null" class="load"></div>

                        <div v-if="CanSelectAll" @click="SelectAll" class="checkbox-group" >
                            <input type="checkbox" id="todo"> 
                            <label for="todo"> SELECCIONAR TODO</label>
                        </div> 

                        <div id="check_group" class="checkbox-group" v-for="negocio in negocios" :key="negocio.id">
                            <input class="check_negocio" type="checkbox" @click="selectNegocio(negocio.id,$event)" name="a" :id="negocio.id"> 
                            <label :for="negocio.id"> {{ negocio.nombre_negocio }}</label>
                        </div> 

                    </div>

                    <button class="btn btn-orange" v-if="edit == 0" @click="Insert">CREAR</button>
                    <button class="btn btn-orange" v-if="edit == 1" @click="Editar">EDITAR</button>
                    
                </div>


            </div>
        </div>

    </div>

    <div class="notify-detalles" v-show="fase == 1">
        <h1 >Detalles de la notificación</h1>

        <div class="card card-detalles-notify ">
            <button v-if="edit == 0" class="btn btn-card btn-orange">Puntaje: {{notificacion.rango}}  </button>
            <button v-else class="btn btn-card btn-orange">Puntaje: {{notify.rango}}  </button>

            <div class="notify-detalles-sub">
                <h2 class="text-green">{{ notificacion.titulo }}</h2>

                <p>{{ notificacion.descripcion }}</p>
            </div>

            <div class="notify-detalles-sub" v-if="edit == 0">
                <h3 class="font-600">Detalles</h3>

                <div class="grid justify-content-start align-items-center" style="grid-auto-flow:column; grid-gap:10px">
                    <div class="point-orange"></div>
                    <h3 v-if="isSelectAll" > <i class="icon icon-mail" ></i> Se envía a todos los negocios</h3>
                    <h3 v-else > <i class="icon icon-mail" ></i> Se envía a {{notificacion.usuarios.length}} negocio(s) </h3>
                </div>
            </div>
        </div> 

    </div>
</template>

<script>
	import axios from 'axios';
    import Grl from '@/script/General';
    import $ from 'jquery';

    export default {
        data() {
            return {
                //VAR CARGA
                rangos:[],
                negocios:[],
                //GESTION 
                notificacion:{
                    id:null,
                    titulo:null,
                    descripcion:null,
                    rango:null,
                    usuarios:[],
                },

                //VAR CONTROL
                fase: 0,
                ctrl_rango:[],
                CanSelectAll:false,
                isSelectAll:false,
            }
        },
        props: {
            notify:{},
            edit:{type:Number, default:0}
        },
        created () {
            this.CargarRango();
            if(this.edit == 1){
                this.GestEdit();
            }
        },
        methods: {
            //CARGA
            async CargarRango() {
                await axios.get(process.env.VUE_APP_API+'GetRango').then(response=>{
                    this.rangos = response.data
                });
            },

            async CargarNegocio() {

               
                this.negocios = null;
                this.CanSelectAll=false;
                await axios.post(process.env.VUE_APP_API+'GetNegocioRango',this.ctrl_rango).then(response=>{
                    if(response.data != 'nulo'){
                        console.log(response.data)
                        this.negocios = response.data;
                        if(this.negocios.length > 1){
                            this.CanSelectAll=true;
                        }

                    }else{
                        this.negocios=[];
                    }
                    console.log("NEGOCIOS");

                    console.log(this.negocios);
                });
            },

            //GESTIO
            async Insert() {
                if(this.Vacio()){
                    this.$swal.fire({
                        icon:'error',
                        title:'Complete todos los campos',
                        width:400
                    });
                    return 0;
                }
               console.log(this.notificacion);
               await axios.post(process.env.VUE_APP_API+'InsertNotificacion', this.notificacion).then(()=>{
                   this.fase = 1;
                });
            },

            async Editar(){
                await axios.post(process.env.VUE_APP_API+'EditarNotificacion', this.notificacion).then(()=>{
                   this.fase = 1;
                });
            },

            async selectRango( valor, event){
                var rango =[];
                // var sub_rango=[];
                if(event.target.checked){
                //    this.ctrl_rango.push(valor);
                    valor =  valor.replace('+','');
                    valor = valor.split('-');
                    this.ctrl_rango.push(valor);
                    console.log(this.ctrl_rango);
                    await this.CargarNegocio();

                    for (let rango_i of this.ctrl_rango) {
                        rango.push(rango_i[0]);
                        rango.push(rango_i[1]);
                    }
                    console.log(rango);
                    this.notificacion.rango = Math.min.apply(null, rango) +"-"+ Math.max.apply(null, rango);
                }else{
                    this.ctrl_rango.forEach(function(car, index, object) {
                        if(car == valor.replace("-",",").replace("+","")){
                            object.splice(index, 1);
                        }

                    });

                    if(this.ctrl_rango.length > 0){
                        await this.CargarNegocio();
                    }else{
                        this.CanSelectAll=false;
                        this.negocios = [];
                    }

                }

            },

            selectNegocio( id, event){
                if(event.target.checked){
                   this.notificacion.usuarios.push(id);
                }else{
                    this.notificacion.usuarios.forEach(function(car, index, object) {
                        if(car === id){
                        object.splice(index, 1);
                        }
                            
                    });
                }
                console.log("NEGOCIOS:");
                console.log(this.notificacion.usuarios);
            },

            GestEdit(){

                this.notificacion.titulo = this.notify.titulo;
                this.notificacion.descripcion = this.notify.descripcion;
                this.notificacion.id = this.notify.id

            },

            //CONTROL============================================
            
            SoloLetras($event){
                Grl.SoloLetra($event);
            },
            Vacio(){
                const params={
                    titulo: this.notificacion.titulo,
                    descripcion: this.notificacion.descripcion,
                    rango: this.notificacion.usuarios
                }
                return Grl.Vacio(params);    
            },

            SelectAll(){
                if($('#todo').is(':checked')){
                    console.log($('.check_negocio'));
                    $('.check_negocio').attr( "checked", "checked").attr("disabled", "disabled");
                    this.notificacion.usuarios = [];
                    this.isSelectAll = true;
                    for(const negocio of this.negocios){
                        this.notificacion.usuarios.push(negocio.id)
                    }
                }else{
                    this.isSelectAll = false;
                    this.notificacion.usuarios = [];
                    $('.check_negocio').removeAttr("disabled");
                    $('.check_negocio:checked').trigger( "click" );
                }
            },

            async SelectAllRango(){

                if($('#todoRango').is(':checked')){
                    console.log($('.check_rangos'));
                    $('.check_rangos').attr( "checked", "checked").attr("disabled", "disabled");
                    this.ctrl_rango = [];
                    console.log(this.rangos);
                    for(const rango of this.rangos){
                        let valor =  rango.valor.replace('+','');
                        valor = valor.split('-');
                        this.ctrl_rango.push(valor);
                    }
                    console.log(this.ctrl_rango);
                    this.notificacion.rango = 'todos';
                    this.isSelectAll = true;
                    await this.CargarNegocio();
                    
                }else{
                    this.isSelectAll = false;
                    this.ctrl_rango = [];
                    this.negocios = [];
                    $('.check_rangos').removeAttr("disabled");
                    $('.check_rangos:checked').trigger( "click" );
                }

            }
        },
    }
</script>