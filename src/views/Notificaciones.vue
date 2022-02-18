<template>
<base-layout> 
<button  v-show="fase == 1" @click="Return" class="btn-return">Regresar</button>
<div class="temp-notificaciones" v-if="fase == 0">
    <div>
        
    </div>
   <div class="card card-orange grid justify-items-center card-notify-top"  @click="fase = 1">
       <h1 class="card-notify-more align-self-end">+</h1>
       <h1 class="text-white align-self-center font-500">Crear notificación</h1>
    </div>

    <h1 class="font-500">Notificaciones creadas</h1>

    <div class="grid content-notify gc-2x-g grid-col-1x-xs">
        <div v-if="notificaciones == null" class="load"></div>
        <div class="card card-notify" v-for="notificacion in notificaciones" :key="notificacion.id">
            <div>
                <h3 class="text-green"> {{notificacion.titulo}} </h3>

                <p>Descripcion: {{notificacion.descripcion}}  </p>   
            </div>

            <div class="grid justify-items-end">
                <i class="icon icon-edit" @click="EditNotify(notificacion)" style="cursor:pointer"></i>
                <button class="btn-card align-self-end"> {{notificacion.rango}} </button>
            </div>
        </div>

    </div>


</div>

<notificacion v-if="fase == 1" :edit="edit" :notify="notify" />

</base-layout>
</template>

<script>
	//import { IonPage, IonContent } from '@ionic/vue';
	import axios from 'axios';
    import notificacion from '../components/Notificacion';
	export default{

		components: {
            notificacion
		},
        data() {
            return {
                //VAR CARGA
                notificaciones:[],

                notify:{},
                
                //VAR CONTROL
                fase:0,
                edit:0

            }
        },
        created () {
            this.get();
        },
        methods: {
            //CARGA
            async get(){
                this.notificaciones = null;
                await axios.get(process.env.VUE_APP_API+'GetNotificacion').then(response=>{
                    this.notificaciones = response.data;
                    console.log(response.data);
                });
            },
            

        //CONTROL============================
            Return(){
                this.fase = 0;
                this.edit = 0;
                this.get();
            },
            
            EditNotify(notify){
                this.edit = 1;
                this.notify = notify;
                this.fase = 1;
            },

        },


	}	

</script>
