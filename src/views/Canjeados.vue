<template>
<base-layout> 

<div class="temp-canje">

    <div class="section-canje-body">
        <h1 class="font-500">Beneficios canjeados</h1>

        <div class="card card-canje align-items-center" :id="cupon.id" @click="CargarEmpresas(cupon.id)" v-for="cupon in cupones" :key="cupon">
            <div class="card-img">
                <img :src="'https://backalimas.calimas.pe/'+cupon.url_img" alt="">
            </div>

            <div>
                <h2>Descuento  {{cupon.descuento}}%  </h2>
                <h3> {{cupon.nombre_negocio}} </h3>
            </div>

            <div>
                <h2> {{cupon.total}}   </h2>
                <h3>Veces canejados</h3>
            </div>

            <div class="grid align-items-start">
                <button class="btn-card btn-white"> {{cupon.puntos}} puntos</button>
                <h2> {{cupon.total_empresas}} </h2>
                <h3>Empresas canjearon</h3>
            </div>
        </div>

    </div>

    <div class="section-canje-right ">

        <div class="card grid">

            <h2>Empresas que canjearon este beneficio</h2>

            <div class="canje-right-content">

                <div class="canje-right-card" v-for="negocio in negocios" :key="negocio">
                    <div class="card-img">
                        <img v-if="negocio.url_img_perfil != null" :src="'https://backalimas.calimas.pe/'+negocio.url_img_perfil" alt="">
                        <img v-else src="../image/user-logo.png" alt="">
                    </div>

                    <div class="grid">
                        <h3 class="text-orange"> {{negocio.nombre_negocio}} </h3>
                        <h3> {{negocio.puntos_obtenidos}} Puntos </h3>
                    </div>
                </div>
                
            </div>

        </div>

    </div>

</div>

<div class="xs-canjeados-first" v-if="fase_xs == 0">
    <h1 class="font-500">Beneficios canjeados</h1>

        <div class="card card-canje align-items-center" :id="cupon.id" @click="CargarEmpresas(cupon.id)" v-for="cupon in cupones" :key="cupon">
            <div style="grid-column: 1/3;">
                <button style="width:90%" class="btn-card btn-white"> {{cupon.puntos}} puntos</button>
            </div>
            <div class="card-img">
                <img :src="'https://backalimas.calimas.pe/'+cupon.url_img" alt="">
            </div>

            <div class="grid justify-items-start">
                <h2 class="font-600">Descuento  {{cupon.descuento}}%  </h2>
                <h3> {{cupon.nombre_negocio}} </h3>
                
                <div class="content-card-canje-xs">
                    <h4 class="text-green font-500"> {{cupon.total}}</h4>
                    <h4 class=" text-green font-500">Veces canejados </h4>
                    <h4 class=" text-green font-500"> {{cupon.total_empresas}}</h4>
                    <h4 class=" text-green font-500"> Empresas canjearon </h4>
                </div>


            </div>

        </div>
</div>

<div class="xs-canjeados-first" v-if="fase_xs == 1">
    <button class="btn-return" @click="fase_xs = 0" >Regresar</button> 

    <h2>Empresas que canjearon este beneficio</h2>

    <div class="canje-right-content">

        <div class="canje-right-card" v-for="negocio in negocios" :key="negocio">
            <div class="card-img">
                <img v-if="negocio.url_img_perfil != null" :src="'https://backalimas.calimas.pe/'+negocio.url_img_perfil" alt="">
                <img v-else src="../image/user-logo.png" alt="">
            </div>

            <div class="grid">
                <h3 class="text-orange"> {{negocio.nombre_negocio}} </h3>
                <h3> {{negocio.puntos_obtenidos}} Puntos </h3>
            </div>
        </div>
        
    </div>
</div>

</base-layout>
</template>

<script>
	//import { IonPage, IonContent } from '@ionic/vue';
	import axios from 'axios';
    import $ from 'jquery';

	export default{

		components: {

		},

        data() {
            return {
                cupones:null,
                negocios:[],
                fase_xs:0
            }
        },
        created () {
            this.CargarBeneficios();
        },

        methods: {
            async CargarBeneficios() {

                await axios.get('https://backalimas.calimas.pe/api/GetBeneficioCanjeados').then(response=>{
                    this.cupones = response.data;
                });
                
            },

            async CargarEmpresas(id){
                $(".card-canje-select").removeClass("card-canje-select");
                $("#"+id).addClass("card-canje-select");
                this.fase_xs = 1;
                this.negocios =[];
                
                const params = {
                    id:id
                }

                await axios.post('https://backalimas.calimas.pe/api/GetNegocioCanjeado', params).then(response=>{
                    this.negocios = response.data;
                });
                
            }
        },


	}	

</script>
