<template>

    <div class="temp-profile">
        
        <div class="section-profile-header">
            <img  v-if="usuario.url_img_portada != null" :src="host+usuario.url_img_portada" alt="">
            <img v-else src="../image/bg-profile-default.jpg" alt="">
        </div>

        <div class="section-profile-body">

            <div>

                <div class="img-profile-front">
                    <img v-if="usuario.url_img_perfil != null" :src="host+usuario.url_img_perfil" alt="">
                    <img v-else src="../image/user-logo.png" alt="">
                </div>

                <div class="grid" style="grid-gap:10px">
                    <h1 class="text-green font-500"> {{usuario.nombre_negocio}} </h1>
                    <p> {{usuario.fecha_reg.split("-").reverse().join("-")}} </p>
                </div>


                <div class="profile-content">
                    <h3 class="font-600">Datos del negocio</h3>

                    <h4 class="font-300"> <i class="icon-user"></i> {{usuario.nombre_contacto}} </h4>
                    <h4 class="font-300"> <i class="icon-location"></i> {{usuario.direccion}} </h4>
                    <h4 class="font-300"> <i class="icon-phone"></i> {{usuario.telefono}} </h4>
                    <h4 class="font-300"> <i class="icon-mail"></i> {{usuario.correo}} </h4>
                    <h4 class="font-300"> <i class="icon-dni"></i> {{usuario.dni}} </h4>

                </div>

            </div>


            <div class="align-content-start">

                <div class="card card-orange card-profile-pnt text-center">

                    <h3 class="font-500">Puntaje</h3>
                    <h1 class=""> {{usuario.puntos_obtenidos}} </h1>
                </div>

            </div>


        </div>

    </div>

</template>

<script>

    export default {
        props: {
            usuario:{type:Object, default:null}
        },
        data() {
            return {
                host:process.env.VUE_APP_HOST,

            }
        },
        created () {
        },
        methods: {

        },
        
    }
</script>

