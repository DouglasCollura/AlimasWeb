<template>
    <div class="grid temp-login" style="position:relative">
        
        <div  class="section-login-left">
            <img src="../image/img-login-1.png" width="440" alt="">
        </div>


        <div class="section-login-right" >

            <img class="align-self-start" src="../image/alimas-logo-min.png" alt="">

            <div class="grid" style="grid-gap:20px" v-if="fase == 0">
                <h1 class="text-center">¿Eres administrador? ¡Inicia sesión aquí!</h1>
                
                <input type="text" class="input" v-model="usuario.correo" placeholder="Correo electrónico">

                <input type="password" @keyup.enter="Entrar"  class="input" v-model="usuario.clave" placeholder="Contraseña">

                <h3>¿Olvidaste tu contraseña? <button class="btn-recovery" @click="fase = 1"> Recupérala aquí</button> </h3>

                <button @click="Entrar" class="btn btn-orange"  style="width:100%">INICIAR SESIÓN</button>

                <div class="checkbox-group" style="margin-top:30px">
                    <input type="checkbox" @click="sesion = !sesion"  name="a" id="sesion"  > 
                    <label for="sesion"> Mantener sesión iniciada </label>
                </div>
            </div>

            <div class="grid" style="grid-gap:20px" v-if="fase == 1">
                <h1>¿Olvidaste tu contaseña?</h1>

                <p>Te ayudamos a recuperarla. Completa tu correo electrónico y te enviaremos las indicaciones para restrablecerla.</p>

                <input type="text" class="input" v-model="recovery_correo" placeholder="Correo electrónico">

                <button @click="EnviarCorreo" class="btn btn-orange"  style="width:100%">ACEPTAR</button>
            </div>

            <div class="grid" style="grid-gap:20px" v-if="fase == 2">
                <h1>¡Ya casi terminamos!</h1>

                <p>Introduce la contraseña provisoria que enviamos a tu correo.</p>

                <input type="text" v-model="clave_pro" class="input" placeholder="Contraseña provisoria">

                <button @click="VerificarClave" class="btn btn-orange"  style="width:100%">ACEPTAR</button>
            </div>

            <div class="grid" style="grid-gap:20px" v-if="fase == 3">
                <h1>Ingresa una nueva contraseña</h1>

                <input type="password" v-model="n_clave" class="input" placeholder="Contraseña">

                <input type="password" v-model="n_clave_rep" class="input" placeholder="Repetir contraseña">

                <button @click="CambiarClave" class="btn btn-orange"  style="width:100%">ACEPTAR</button>
            </div>

        </div>
    
    </div>
    <vmodel class="grid" :visible="vm_visible" :type="vm_type" :sub_title="vm_sub_title" :title="vm_title">
        <button v-if="vm_type != 'load'" class="btn btn-orange" style="width:60%" @click="vm_visible = false">Cerrar</button>
    </vmodel>
</template>

<script>
	import axios from 'axios';
    import vmodel from '../components/vmodel';

    export default {
        components: {
            vmodel
		},
        data() {
            return {

                usuario:{
					correo:null,
					clave:null
				},

                recovery_correo:null,
                clave_pro:null,
                id:null,
                n_clave:null,
                n_clave_rep:null,
                
                //CONTROL
                fase:0,
                sesion:false,
                //MODEL
                vm_type:"load",
                vm_title:"",
                vm_visible:false,
                vm_sub_title:"Cargando..."
            }
        },

        methods: {
            async Entrar(){
                this.vm_visible = true;
                this.vm_type = "load";
                this.vm_sub_title = "Cargando...";
                this.vm_title = "";

                await axios.post(process.env.VUE_APP_API+'LoginAdmin',this.usuario).then(response=>{
                   console.log(response.data);
                   if(response.data[0]){
                       if(this.sesion){
                            localStorage.setItem('nombre', response.data);
                       }else{
                            sessionStorage.setItem('nombre', response.data);

                       }
                        window.location.href = window.location.origin +'/Main'; 
                    }else{
                        this.vm_type = "vm-error";
                        this.vm_sub_title = "";
                        this.vm_title = "Usuario o contraseña incorrecta";
                    }

                });

            },

            async EnviarCorreo(){

				const params={
					correo:this.recovery_correo
				}

				this.$swal.fire({
					title:'Verificando...',
					allowOutsideClick: false,
					width: 400,
					showConfirmButton:false,
				});
				this.$swal.showLoading();
				await axios.post(process.env.VUE_APP_API+'EnviarCorreoAdmin',params).then(response=>{
					this.$swal.close();
					if(response.data != 0){
						this.id = response.data.id;
						this.fase = 2;
					}else{
						this.$swal.fire({
							icon:'error',
							title:'El correo no existe!',
							width:400
						});
					}

				});
			},

            async VerificarClave(){
				this.$swal.fire({
					title:'Verificando...',
					allowOutsideClick: false,
					width: 400,
					showConfirmButton:false,
				});
				this.$swal.showLoading();
			
				const params = {
					id:this.id,
					clave:this.clave_pro
				}

				await axios.post(process.env.VUE_APP_API+'VerificarClaveAdmin',params).then(response=>{
					this.$swal.close();
					if(response.data != 0){
						this.fase = 3;
					}else{
						this.$swal.fire({
							icon:'error',
							title:'La clave no es correcta, verifique e intente de nuevo.',
							width:400
						});
					}

				});
			},

            async CambiarClave(){
				if(this.n_clave != this.n_clave_rep){
					this.$swal.fire({
						icon:'error',
						title:'Las contraseñas no coinciden',
						width:400
					});
				}else{
					const params ={
						clave:this.n_clave,
						id:this.id
					}
					this.$swal.fire({
						title:'Cambiando contraseña.',
						allowOutsideClick: false,
						width: 400,
						showConfirmButton:false,
					});
					this.$swal.showLoading();
					await axios.post(process.env.VUE_APP_API+'CambiarClaveAdmin',params).then(()=>{
						this.$swal.close();
						this.$swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Tu contraseña ha sido modificada con éxito!',
							showConfirmButton: false,
							timer: 1500
						});
                        this.recovery_correo = null;
                        this.clave_pro = null;
                        this.id = null;
                        this.n_clave = null;
                        this.n_clave_rep = null;
						this.fase = 0;

					});
				}
			}
        },
    }
</script>