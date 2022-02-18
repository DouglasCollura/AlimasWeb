<template>
<div class="container grid temp-main">
   
    <div class="section-main-menu">

        <div class="menu-img">
            <img src="@/image/alimas-logo-min.png" width="90" alt="">

        </div>
        
        <div class="menu-name">
            <h2> {{nombre}} </h2>
            <div class="menu-divider"></div>
        </div>

        <div class="nav">
            <router-link to="/Main"> <i class="icon-home"></i> Inicio</router-link> 
            <router-link to="/Notificaciones"> <i class="icon-bell"></i>  Crear notificaciones</router-link>
            <router-link to="/Beneficios"> <i class="icon-ticket"></i> Crear beneficios</router-link> 
            <router-link to="/Canjeados"> <i class="icon-switch"></i> Beneficios canjeados</router-link> 
            <router-link to="/Ayuda"> <i class="icon-chat"></i> Solicitudes de ayuda</router-link> 
        </div>

        <button @click="Salir" class="salir"> <i class="icon-logout"></i> Cerrar sesión</button> 

    </div>

    <div class="section-main-head">

        <div class="grid align-items-center">
           <button class="btn-burguer" @click="menu = 1"> <img src="../../image/menu-burguer.png" width="30" alt=""> </button>
        </div>

        <div class="grid justify-items-center">
            <img src="../../image/alimas-logo-min.png" style="width:80px" alt="">
        </div>
        <div class="grid align-items-center justify-items-end">
            <router-link to="/Ayuda"> <i class="icon-chat" style="font-size:40px"></i> </router-link> 
        </div>

    </div>

    <div class="section-main-body section-main-body-xs">
        <slot />
    </div>

    <div class="nav-container-xs" @click="menu =0"  v-show="menu == 1">
        <img src="../../image/alimas-logo-min.png" style="width:80px" alt="">
        <router-link to="/Main"> <i class="icon-home"></i> Inicio</router-link> 
        <router-link to="/Notificaciones"> <i class="icon-bell"></i>  Crear notificaciones</router-link>
        <router-link to="/Beneficios"> <i class="icon-ticket"></i> Crear beneficios</router-link> 
        <router-link to="/Canjeados"> <i class="icon-switch"></i> Beneficios canjeados</router-link> 
        <button @click="Salir" class="salir"> <i class="icon-logout"></i> Cerrar sesión</button> 
    </div>



</div>

</template>

<script>
	//import { IonPage, IonContent } from '@ionic/vue';
    //import $ from 'jquery';

	export default{

		components: {

		},
        data() {
            return {
                menu:0,
                filtro:false,
                data: "hola",
                nombre:null
            }
        },
        
        created () {
            if(localStorage.getItem('nombre')){
                this.nombre = localStorage.getItem('nombre');
            }else{
                this.nombre = sessionStorage.getItem('nombre');
            }
        },

        methods: {
            Salir(){
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = window.location.origin +'/'; 
            }
        },
        mounted () {
            var getUrl = window.location;
            var baseUrl = "/" + getUrl.pathname.split('/')[1];
            console.log(baseUrl);
            // var CURRENT_URL = window.location.href.split('#')[0].split('?')[0];
            //var $SIDEBAR_MENU = $('.section-main-menu');
            //console.log($('.section-main-menu').find('a[href="' + baseUrl + '"]').addClass('text-orange'));
            // console.log(baseUrl);
            // $('.main-menu').removeClass('green');
            //$SIDEBAR_MENU.find('a[href="' + baseUrl + '"]').addClass('text-orange');
        }
	}	

</script>
