<template>
<base-layout> 
<button  v-show="fase != 0" @click="Regresar" class="btn-return">Regresar</button>
<div class="temp-beneficios" v-show="fase == 0">

    <div class="grid card-beneficios-top">
        <div @click="fase = 1" class="card card-orange grid justify-items-center card-notify-top">
            <h1 class="card-notify-more align-self-end">+</h1>
            <h1 class="text-white align-self-center font-500">Crear beneficio interno</h1>
        </div>

        <div @click="fase = 2" class="card card-orange grid justify-items-center card-notify-top">
            <h1 class="card-notify-more align-self-end">+</h1>
            <h1 class="text-white align-self-center font-500">Crear beneficio externo</h1>
        </div>
        
    </div>


    <h1 class="font-500">Beneficios creados</h1>

    <div class="grid content-notify gc-2x-g grid-col-1x-xs">
        
        <div v-if="beneficios == null" class="load"></div>

        <div class="card card-beneficios" v-for="beneficio in beneficios" :key="beneficio.id">
            <div  class="card-img align-self-center">
                <img :src="host+beneficio.url_img" alt="">
            </div>

            <div>
                <h3 class="text-green"> {{beneficio.titulo}} </h3>

                <h4> {{beneficio.nombre_negocio}} </h4>
                <h4> {{beneficio.tipo_negocio}} </h4>
                <h4> {{beneficio.puntos}}  puntos</h4>
            </div>

            <div class="grid notify-card-last-xs" style="grid-gap:10px">
                <i @click="Editar(beneficio)" class="justify-self-end icon icon-edit"></i>
                <div class="align-content-end grid" style="grid-gap:5px">
                    <button v-if="beneficio.tipo == 0" class="btn-card btn-green align-self-end">Interno</button>
                    <button v-if="beneficio.tipo == 1" class="btn-card btn-green align-self-end">Externo</button>
                    <button class="btn-card align-self-end" v-if="fecha_hoy  < beneficio.fecha_desde">Proximamente</button>
                    <button class="btn-card align-self-end" v-if="fecha_hoy  >= beneficio.fecha_desde && fecha_hoy  <= beneficio.fecha_hasta">Ya disponible</button>
                    <button class="btn-card align-self-end bg-rojo" v-if="fecha_hoy  > beneficio.fecha_hasta">Expirado</button>
                </div>

            </div>
        </div>

    </div>

</div>

<beneficio @Regresar="Regresar" :edit="edit" :Pbeneficio="beneficio" v-if="fase ==  1"/>
<beneficio_ext @Regresar="Regresar" :edit="edit" :Pbeneficio="beneficio"  v-if="fase ==  2"/>
</base-layout>
</template>

<script>
	//import { IonPage, IonContent } from '@ionic/vue';
    import beneficio from '../components/Beneficio.vue';
    import beneficio_ext from '../components/Beneficio_Ext.vue';
	import axios from 'axios';

	export default{

		components: {
            beneficio,
            beneficio_ext
		},

        data() {
            return {
                //VAR CARGA
                beneficios:[],

                //GESTION
                beneficio:{},

                fase: 0,
                fecha_hoy:null,
                host:process.env.VUE_APP_HOST,
            }
        },
        created () {
            this.CrearFecha();
            this.CargarBeneficio();
        },
        methods: {
            //CARGA
            async CargarBeneficio() {
                this.beneficios=null;
                await axios.get(process.env.VUE_APP_API+'GetBeneficio').then(response=>{
                    this.beneficios = response.data;
                });
            },

            async Editar(beneficio){
                this.$swal.fire({
					title:'Verificando...',
					allowOutsideClick: false,
					width: 400,
					showConfirmButton:false,
				});
				this.$swal.showLoading();
                const params={
                    id: beneficio.id
                }
                await axios.post(process.env.VUE_APP_API+'VerificarBeneficioEdit',params).then(response=>{
                    this.$swal.close();
                    if(response.data == 0){
                        this.beneficio = beneficio;
                        this.edit = 1;
                        if(beneficio.tipo == 0){
                            this.fase = 1;
                        }else{
                            this.fase = 2;
                        }
                    }else{
                        this.$swal.fire({
                            icon:'error',
                            title:'Este beneficio ya fue camjeado por un cliente, no puede ser modificado',
                            width:400
                        });
                    }
                });
            },

            //CONTROL
            async Regresar() {
                this.CargarBeneficio();
                this.fase = 0;
                this.edit = 0;
                this.beneficio={};
            },

            CrearFecha(){
                let fecha = new Date();
                
                this.fecha_hoy += fecha.getFullYear();
                if((fecha.getMonth()+1 )<10){
                    this.fecha_hoy +="-"+'0'+(fecha.getMonth()+1 )
                }else{
                    this.fecha_hoy +="-"+(fecha.getMonth()+1 )
                }

                if(fecha.getDate()<10){
                    this.fecha_hoy +="-"+'0'+fecha.getDate()
                }else{
                    this.fecha_hoy +="-"+fecha.getDate()
                }
                console.log(this.fecha_hoy)
            }
        },


	}	

</script>
