<template>
<base-layout> 

<div class="temp-ayuda">

  <div class="section-ayuda-lateral">
      <h1 class="font-500">Solicitudes de ayuda</h1>

      <div class="ayuda-busc">
        <input type="text" @keyup.enter="Buscar($event)" class="input-search" placeholder="Busca por nombre">
      </div>

      <div class="ayuda-lat-content">

        <div class="card-mensage" @click="CargarMensajes(chat)" :id="chat.id" v-for="chat in chats" :key="chat.id">
          <div>
            <h4 class="font-300 text-right"> {{chat.fecha.split("-").reverse().join("-")}} </h4>
          </div>
          <div class="card-mensage-content"> 
            <div  class="card-img">
              <img v-if="chat.url_img_perfil != null" :src="host+chat.url_img_perfil" alt="">
              <img v-else src="../image/user-logo.png" alt="">
            </div>
            <div>
              <h3 class="text-orange"> {{chat.nombre_negocio}} </h3>
              <p :class="chat.leido == 1 ? 'font-600' : 'font-400'"> {{chat.mensaje}} </p>
            </div>
          </div>
        </div>

      </div>

  </div>

  <div class="section-ayuda-body"  v-if="mensajes.length > 0">

      <div class="section-ayuda-body-top"> 

        <div class="card-img">
          <img v-if="chat.url_img_perfil != null" :src="host+chat.url_img_perfil" alt="">
          <img v-else src="../image/user-logo.png" alt="">
        </div>

        <h3> {{chat.nombre_negocio}} </h3>
    </div>

      <div class="section-ayuda-body-content"> 

        <div :class="mensaje.remitente == 0 ? 'chat-container-em' : 'chat-container-co'" v-for="mensaje in mensajes" :key="mensaje.id">
			<div :class="mensaje.remitente == 0 ? 'card-chat-em' : 'card-chat-co'">
				<p v-if="mensaje.tipo == 0"> {{mensaje.mensaje}} </p>
                <img v-else style="width:100%" @click="AbrirImg(mensaje.mensaje, 0)" :src="host+mensaje.mensaje" alt="">
			</div>
			<h3 :class="mensaje.remitente == 0 ? 'justify-self-start font-300' :'justify-self-end font-300'" v-text="Tiempo(mensaje.fecha, mensaje.hora)" ></h3>
		</div>

        <div class="chat-container-em"  v-for="mensaje in mensajes_int" :key="mensaje.id">
            <div class="card-chat-em">
                <p v-if="mensaje.tipo == 0"> {{mensaje.mensaje}} </p>
                <img v-else style="width:100%" @click="AbrirImg(mensaje.mensaje, 1)" :src="mensaje.mensaje" alt="">
            </div>
            <h3 class="justify-self-start font-300"> {{mensaje.hora}} </h3>
        </div>


      </div>

        <div class="section-ayuda-body-bottom">
            <input type="text" v-model="content_mensaje" placeholder="Escribir mensaje" >
            <button @click="EnviarMensaje"  v-show="content_mensaje != ''" class="btn"><i class="icon icon-send"></i></button>
            <input type="file" id="img" @change="CargarImagen" style="display:none" accept="image/png, image/gif, image/jpeg">   
            <button @click="SelectImg" v-show="content_mensaje == ''" class="btn"> <img src="../image/camera-send.svg" alt=""> </button>
        </div>

  </div>

  <div v-else class="ayuda-body-wait">

    <div>
      <img src="../image/mail.svg" alt="">
    </div>

     <h3>¡Comienza a contestar las solicitudes de ayuda!</h3>
  </div>

</div>

<div class="temp-ayuda-xs">
   
    <div class="temp-ayuda-chat-xs"  v-if="fase_xs == 0" >
        <div class="ayuda-busc">
			<input type="text" @keyup.enter="Buscar($event)" class="input-search" placeholder="Busca por nombre">
		</div>

        <div class="ayuda-lat-content">

            <div class="card-mensage" @click="CargarMensajes(chat)" :id="chat.id" v-for="chat in chats" :key="chat.id">
                <div>
                    <h4 class="font-300 text-right"> {{chat.fecha}} </h4>
                </div>
                <div class="card-mensage-content"> 
                    <div  class="card-img">
                      <img v-if="chat.url_img_perfil != null" :src="host+chat.url_img_perfil" alt="">
                      <img v-else src="../image/user-logo.png" alt="">
                    </div>
                    <div>
                    <h3 class="text-orange"> {{chat.nombre_negocio}} </h3>
                    <p :class="chat.leido == 1 ? 'font-600' : 'font-400'"> {{chat.mensaje}} </p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="section-ayuda-body" style="position:relative" v-if="fase_xs == 1">
    <button class="btn-return" @click="fase_xs = 0" >Regresar</button> 
      <div class="section-ayuda-body-top"> 

        <div class="card-img">
          <img v-if="chat.url_img_perfil != null" :src="host+chat.url_img_perfil" alt="">
          <img v-else src="../image/user-logo.png" alt="">
        </div>

        <h3> {{chat.nombre_negocio}} </h3>
    </div>


        <div class="section-ayuda-body-content"> 

        <div :class="mensaje.remitente == 0 ? 'chat-container-em' : 'chat-container-co'" v-for="mensaje in mensajes" :key="mensaje.id">
			<div :class="mensaje.remitente == 0 ? 'card-chat-em' : 'card-chat-co'">
				<p v-if="mensaje.tipo == 0"> {{mensaje.mensaje}} </p>
                <img v-else style="width:100%" @click="AbrirImg(mensaje.mensaje, 0)" :src="host+mensaje.mensaje" alt="">
			</div>
			<h3 :class="mensaje.remitente == 0 ? 'justify-self-start font-300' :'justify-self-end font-300'" v-text="Tiempo(mensaje.fecha, mensaje.hora)" ></h3>
		</div>

        <div class="chat-container-em"  v-for="mensaje in mensajes_int" :key="mensaje.id">
            <div class="card-chat-em">
                <p v-if="mensaje.tipo == 0"> {{mensaje.mensaje}} </p>
                <img v-else style="width:100%" @click="AbrirImg(mensaje.mensaje, 1)" :src="mensaje.mensaje" alt="">
            </div>
            <h3 class="justify-self-start font-300"> {{mensaje.hora}} </h3>
        </div>

      </div>

        <div class="section-ayuda-body-bottom">
			<input type="text" v-model="content_mensaje" placeholder="Escribir mensaje" >

            <button @click="EnviarMensaje"  v-show="content_mensaje != ''" class="btn"><i class="icon icon-send"></i></button>
            <input type="file" id="img" @change="CargarImagen" style="display:none" accept="image/png, image/gif, image/jpeg">   
            <button @click="SelectImg" v-show="content_mensaje == ''" class="btn"> <img src="../image/camera-send.svg" alt=""> </button>
		</div>

    </div>

</div>

<div class="modal-img-chat" >
    <div class="content-group-button-modal-chat">
        <button class="modal-img-button" @click="ImgMore">+</button>
        <button class="modal-img-button" @click="ImgLess">-</button>
        <button class="modal-img-button" @click="CerrarModal">x</button>
    </div>

    <div class="modal-img-content">
        <img id="img-modal" :src="modal_img" alt="">
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

    created () {
        this.CrearFecha();
      this.CargarChats();
    },

    data() {
      return {

        //CARGA
        chats:[],
        mensajes:[],

        //GESTION
        mensaje:{
            mensaje:null,
            remitente:0,
            id_chat:null,
            hora:null,
            tipo:0
        },
        chat:null,

        //VAR CONTROL
		mensajes_int:[],
        imagen:null,
        timer:0,
        content_mensaje:'',
        fase_xs:0,
        fecha_hoy:null,
        modal_img:null,
		host:process.env.VUE_APP_HOST,
      }
    },

    methods: {

        async CargarChats(){
            await axios.get(process.env.VUE_APP_API+'CargarChatAdmin').then(response=>{
                this.chats = response.data;
                console.log(this.chats)
            });
        },

        async CargarMensajes(chat){
            this.chat =chat;
            this.mensaje.id_chat = chat.id;
            this.fase_xs = 1;
            const params={
                id_chat:chat.id
            }
            $(".bg-salmon").removeClass('bg-salmon');
            $("#"+chat.id).addClass('bg-salmon');
            $("#"+chat.id).find(".font-600").removeClass('font-600').addClass('font-400');

            await axios.post(process.env.VUE_APP_API+'CargarMensajeAdmin',params).then(response=>{
                this.mensajes = response.data;
                this.scroll(2);
                console.log(this.mensajes);
            });

        },

        //FUNCION

        async EnviarMensaje(){
            if(this.content_mensaje == ''){
                return 0;
            }
            this.mensaje.mensaje = this.content_mensaje;
            var hoy = new Date();	
			var hora = hoy.getHours() + ':' + hoy.getMinutes();
			this.mensaje.hora = hora;
			this.mensajes_int.push({mensaje:this.mensaje.mensaje, hora: hora ,id:this.mensajes_int, tipo:0});
            this.scroll(2);
            this.content_mensaje = '';
            await axios.post(process.env.VUE_APP_API+'Mensaje',this.mensaje).then(()=>{
                console.log("Enviado");
            });

        },

        async Buscar($event){
            let obj = $event.target;
            const params ={
                consulta: obj.value
            }
            this.chats = [];
            await axios.post(process.env.VUE_APP_API+'BuscarChat',params).then(response=>{
                console.log(response.data)
                this.chats = response.data
            });
        },

        SelectImg(){
            $( "#img" ).trigger( "click" ); 
        },

        async CargarImagen(e){
            let file = e.target.files[0];
            let src = window.URL.createObjectURL(file);
            var hoy = new Date();	
            var hora = hoy.getHours() + ':' + hoy.getMinutes();
			this.mensaje.hora = hora;
            this.imagen =src;
			this.mensajes_int.push({mensaje:src, hora: hora ,id:this.mensajes_int, tipo:1});

            let formData = new FormData();
            formData.append('imagen',file);
            formData.append('tipo','1');
            formData.append('hora',hora);
            formData.append('remitente','0');
            formData.append('id_chat',this.mensaje.id_chat);
            this.scroll(2);
            await axios.post(process.env.VUE_APP_API+'Mensaje',formData).then(()=>{
                console.log("Enviado");
            });
            //this.imagen = formData;

        },  

        //CONTROL

        scroll(time){

            if(this.timer <= time){
                setTimeout(() => {
                    const el = $( "div.section-ayuda-body-content div" ).last();
                    el[0].scrollIntoView(); 
                    console.log("scroll");
                    this.timer ++;
                    this.scroll();
                }, 500);
            }else{
                this.timer = 0;
            }

        },

        Tiempo(e, hora){
            if(e == this.fecha_hoy){
                return hora;
            }else if(e < this.fecha_hoy){
                return e.split("-").reverse().join("-");
            }else{
                return e.split("-").reverse().join("-");
            }
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
        },

        AbrirImg(img, tipo){
            $('.modal-img-chat').css('display','grid');
            if(tipo == 0){
                 this.modal_img = this.host+img;
            }else{
                 this.modal_img = img;
            }
        },

        ImgMore(){
            $('#img-modal').css("width",($('#img-modal')[0].clientWidth+100)+"px");
            $('#img-modal').css("height",($('#img-modal')[0].clientHeight+100)+"px");
        },
        ImgLess(){
            $('#img-modal').css("width",($('#img-modal')[0].clientWidth-100)+"px");
            $('#img-modal').css("height",($('#img-modal')[0].clientHeight-100)+"px");
        } ,

        CerrarModal(){
            $('.modal-img-chat').css('display','none');
        }
      
    },
    mounted () {
          console.log("montado");
          console.log(window.innerHeight);
          $('.section-ayuda-body-content').css('max-height',window.innerHeight-200);

        $('.section-main-head').css({'position':'sticky', 'top':'0', 'z-index':'2'});
    },

	}	

</script>
