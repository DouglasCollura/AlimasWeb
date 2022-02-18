<template>

    <div class="grid" >

        <div class="grid temp-canjear"  v-if="view == 1">
            <div>
                <img src="../image/alimas-logo-min.png" alt="">
            </div>

            <h1>¡Te damos la bienvenida a la plataforma de beneficios de Club Alimás!</h1>

            <h4>Para canjear el cupón de tu cliente, simplemente inicia sesión con los accesos que se te otorgaron  </h4>
            <!-- <h1>Route {{$route.params.id}}</h1>  -->

            <input type="text" class="input" v-model="credenciales.negocio" placeholder="Nombre del negocio proveedor"> 
            <input type="password" v-model="credenciales.dni" class="input" placeholder="RUC"> 

            <button class="btn btn-orange" @click="ValidarCredenciales" style="width:100%">INICIAR SESIÓN</button>       
        </div>    

        <div  class="grid temp-canjear"  v-if="view == 2">

            <div class="grid align-content-start justify-items-center" style="grid-gap:20px; min-width:300px" >
                <h1>Estás relizando el canje por el siguiente cupón</h1>


                <div class="card-cupon justify-items-center align-content-start">
                    <h2 class="text-green">¡Cupón generado! ¡Y listo para usar!</h2>

                    <div class="QR-content">
                        <vue-qr :text="beneficio.cod_qr" size="200"></vue-qr>
                    </div>

                    <div class="card align-items-center grid">
                        <h1> {{beneficio.descuento}}% de descuento</h1>
                    </div>

                    <div class="card-cupon-detalles">
                        <div class="card-img">
                            <img :src="host+beneficio.url_img" alt="">
                        </div>

                        <div class="grid justify-items-start">
                            <h3> <i class=" icon-location"></i> {{beneficio.direccion}} </h3>
                            <h3> <i class=" icon-phone"></i> {{beneficio.telefono}} </h3>
                            <h3> Vencimiento: {{beneficio.fecha_hasta.split("-").reverse().join("-")}} </h3>

                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-orange" @click="Canjear" style="width:100%">Canjear</button>

        </div>
         
    </div>

    <div class="grid modal-info" v-if="view == 3">
        <h1 v-if="opt_modal == 0" class="text-center">¡El canje se realizó con éxito! Muchas gracias</h1>
        <img v-if="opt_modal == 0" src="../image/img-success.png" alt="">

        <img v-if="opt_modal == 1" src="../image/img-utilizado.png" alt="">
        <h1 v-if="opt_modal == 1" class="text-center">Lo sentimos, pero ya utilizaste este cupón</h1>

        <h1 v-if="opt_modal == 2" class="text-center">¡Cupón no valido!</h1>
        <img v-if="opt_modal == 2" src="../image/img-error.png" alt="">
    </div>

</template>

<script>

	import axios from 'axios';
    import vueQr from 'vue-qr/src/packages/vue-qr.vue';

    export default {
        components: {
            vueQr
        },
        data() {
            return {
                
                //GESTION

                credenciales:{
                    negocio:null,
                    dni:null,
                    codigo:null
                },
                beneficio:null,

                //CONTROL
                view:0,
                opt_modal:0,
                host:process.env.VUE_APP_HOST,
            }
        },
        created () {
            this.ValidarCupon();
        },

        methods: {
            
            
            async ValidarCupon(){
                const params = {
                    codigo:this.$route.params.id
                }

                await axios.post(process.env.VUE_APP_API+'ValidarCupon',params).then(response=>{
                    if(response.data == 1){
                        this.view = 1;
                    }else if(response.data == 2){
                        this.view = 3;
                        this.opt_modal = 1;
                    }else{
                        this.view = 3;
                        this.opt_modal = 2;
                    }
                });
            },

            async ValidarCredenciales(){
                
                this.credenciales.codigo = this.$route.params.id;

                await axios.post(process.env.VUE_APP_API+'ValidarCredencial',this.credenciales).then(response=>{
                    console.log(response.data);
                    if(response.data != 0){
                        this.view = 2;
                        this.beneficio = response.data[0]
                    }
                });
            },

            async Canjear(){

                const params = {
                    id:this.beneficio.id
                }

                await axios.post(process.env.VUE_APP_API+'Canjear',params).then(()=>{
                    this.view = 3;
                    this.opt_modal =0;
                    this.credenciales.negocio = null;
                    this.credenciales.dni = null;
                    this.credenciales.codigo = null;
                    this.beneficio = null;
                });
            }


        },
         
    }
</script>
