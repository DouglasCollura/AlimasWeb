<template>
    <div class="temp-beneficio" >

    <div class="grid" v-show="fase == 0">

        <div class="grid align-content-start section-beneficio" style="">
            <h1>Datos del proveedor</h1>

            <input type="text" class="input" v-model="beneficio.nombre_negocio" placeholder="Nombre del negocio">
            <input type="text" class="input" v-model="beneficio.tipo_negocio" placeholder="Tipo de negocio">
            <input type="text" class="input" v-model="beneficio.direccion" placeholder="Dirección">
            <input type="text" class="input" @keydown="SoloNumeros($event)" v-model="beneficio.telefono" placeholder="Teléfono">

        </div>

        <div class="grid align-content-center" style="grid-gap:20px">

            <button class="btn btn-orange" @click="FaseUno">SIGUIENTE</button>

            <button class="btn btn-orange-second" @click="Cancelar">CANCELAR</button>

        </div>

    </div>

    <div class="grid vmodel-img" v-show="fase == 1">
        <h1 class="text-center">Sube una imagen del logo del negocio</h1>

        <img src="../image/camera.png" alt="">

        <button class="btn btn-orange" @click="SelectImg" style="width:30%">SUBIR FOTO</button>
        <input type="file" id="img" @change="CargarImagen" style="display:none" accept="image/png, image/gif, image/jpeg">   
        <button class="btn btn-orange-second"  style="width:30%" @click="Cancelar">CANCELAR</button>

    </div>
    
    <div class="grid" v-show="fase == 2">

        <div class="grid align-content-start section-beneficio" style=" margin-bottom:20px" >
            <h1>Datos del cupón</h1>

            <div class="grid">
                <input type="text" v-model="beneficio.titulo" class="input" placeholder="Titulo">
                <h4>Periodo de validez</h4>
                <div class="grid gc-2x-g" style="grid-gap:10px">
                    <input type="date" class="input" v-model="beneficio.fecha_desde" @change="VerificarFechas(0)" name="" id="">
                    <input type="date" class="input" v-model="beneficio.fecha_hasta" @change="VerificarFechas(1)" name="" id="">
                </div>

                <!-- <input type="text" v-model="beneficio.descripcion" class="input" placeholder="Descripción del beneficio"> -->
                <textarea name="" v-model="beneficio.descripcion" class="textarea" id=""  placeholder="Descripción del beneficio" cols="30" rows="10"></textarea>
                <input type="text" v-model="beneficio.puntos" @keydown="SoloNumeros($event)"  maxlength="4" class="input" placeholder="Valor en puntos">
                
                <div class="grid align-items-center" style="grid-gap:10px; grid-auto-flow: column;">
                    <input type="text" @keydown="SoloNumeros($event)" @click="Bloquear(true)" maxlength="3" v-model="beneficio.descuento" id="descuento" class="input" placeholder="Descuento en %">
                    <h3 class="text-center">O</h3>
                    <input type="text" @keydown="SoloNumerosPrecio($event)" @click="Bloquear(false)" v-model="beneficio.precio" class="input" id="precio" placeholder="Precio en S/.">
                </div>
            </div>
            
            <div class="grid" style="grid-gap:10px">
                <h3>Rango de puntos requerido para acceder</h3>

                <div  @click="SelectAll" class="checkbox-group" >
                    <input type="checkbox" id="todo"> 
                    <label for="todo"> SELECCIONAR TODO</label>
                </div> 

                <div class="checkbox-group" v-for="rango in rangos" :key="rango.id">
                    <input class="check-rango" type="checkbox" @click="selectRango(rango.id, $event)" name="a" :id="rango.id" > 
                    <label :for="rango.id"> {{ rango.valor }}</label>
                </div>   
            </div>
        </div>

        <div class="grid align-content-center" style="grid-gap:20px">

            <button class="btn btn-orange" @click="FaseTres">SIGUIENTE</button>

            <button class="btn btn-orange-second" v-if="edit == 0"  @click="Cancelar">CANCELAR</button>
            <button class="btn btn-orange-second" v-else  @click="fase = 0">CANCELAR</button>

        </div>

    </div>

    <div class="grid" v-show="fase == 3">

        <div class="grid align-content-start section-beneficio" style="grid-gap:20px; " >
            <h1>Datos de acceso del proveedor</h1>

            <div class="grid">

                <input type="text" v-model="beneficio.acc_nombre" class="input" placeholder="Nombre del negocio">
                <input type="text" v-model="beneficio.acc_dni" class="input" placeholder="DNI/RUC">

            </div>

        </div>

        <div class="grid align-content-center" style="grid-gap:20px">

            <button class="btn btn-orange" @click="Insert">SIGUIENTE</button>

            <button class="btn btn-orange-second" @click="Cancelar">CANCELAR</button>

        </div>

    </div>

    <div class="grid" v-if="fase ==4">

        <div class="grid align-content-start section-beneficio" style="grid-gap:20px;" >
            <h1 class="text-center">Este será el QR y el código para utilizar el cupón</h1>
        </div>

        <div class="QR-content justify-self-center align-self-start">
           <vue-qr :text="beneficio.cod_qr" size="200"></vue-qr>
        </div>

        <div class="grid align-content-center" style="grid-gap:20px">

            <button class="btn btn-orange" @click="fase =5">SIGUIENTE</button>

        </div>

    </div>

    <div class="grid" v-if="fase == 5">

        <div class="grid align-content-start justify-items-center" style="grid-gap:20px;" >
            <h1>¡Se generó el cupón!</h1>

            <h3>Aquí tiene una vista previa de como se verá en la aplicación</h3>

            <div class="card-cupon justify-items-center align-content-start">
                <h2 class="text-green">¡Cupón generado! ¡Y listo para usar!</h2>

                <div class="QR-content">
                    <vue-qr :text="beneficio.cod_qr" size="200"></vue-qr>
                </div>

                <div class="card align-items-center grid text-center" style="min-width: 90%;">
                    <h1 v-if="beneficio.descuento != null"> {{beneficio.descuento}}% de descuento</h1>
                    <h1 v-else>S/. {{beneficio.precio}} </h1>
                </div>

                <div class="card-cupon-detalles">
                    <div class="card-img">
                        <img :src="host+beneficio.url_img" alt="">
                    </div>

                    <div>
                        <h3> <i class=" icon-location"></i> {{beneficio.direccion}} </h3>
                        <h3> <i class=" icon-phone"></i> {{beneficio.telefono}} </h3>
                        <h3> Vencimiento: {{beneficio.fecha_hasta.split("-").reverse().join("-")}} </h3>

                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>

    <vmodel class="grid" :visible="vm_visible" :type="vm_type" :sub_title="vm_sub_title" :title="vm_title">
    </vmodel>
</template>

<script>
	import axios from 'axios';
    import vueQr from 'vue-qr/src/packages/vue-qr.vue';
    import $ from 'jquery';
    import Grl from '@/script/General';
    import vmodel from '../components/vmodel';

    export default {
        components: {
            vueQr,
            vmodel
        },
        data() {
            return {
                //CARGA
                rangos:[],

                //GESTION
                beneficio:{
                    tipo:1,
                    titulo:null,
                    nombre_negocio:null,
                    tipo_negocio:null,
                    direccion:null,
                    telefono:null,
                    fecha_desde:null,
                    fecha_hasta:null,
                    descripcion:null,
                    puntos:null,
                    descuento:null,
                    precio:null,
                    url_img:null,
                    cod_qr:null,
                    acc_nombre:null,
                    acc_dni:null,
                    id_rango:null
                },

                fase: 0,
                fecha_hoy:null,
                ctrl_rango:[],

                vm_type:"load",
                vm_title:"",
                vm_visible:false,
                vm_sub_title:"Cargando...",
                host:process.env.VUE_APP_HOST,

            }
        },
        props: {
            Pbeneficio:{type:Object, default:null},
            edit:{type:Number, default:0}
        },
        
        async created () {
            this.vm_visible = true;
            this.fecha_hoy = Grl.CrearFecha();
            await this.CargarRango();
            if(this.edit == 1){
                this.GestEdit();
            }
            this.vm_visible= false;
        },

        methods: {

            //CARGA
            async CargarRango() {
                await axios.get(process.env.VUE_APP_API+'GetRango').then(response=>{
                    this.rangos = response.data;
                });
            },


            //FUNCIONES
            
            SelectImg(){
                $( "#img" ).trigger( "click" ); 
            },

            async CargarImagen(e){
                let file = e.target.files[0];
                let formData = new FormData();
                formData.append('imagen',file);
                this.imagen = formData;
                this.fase = 2;
            },

            async Insert(){
                const params = {
                    acc_nombre:this.beneficio.acc_nombre,
                    acc_dni:this.beneficio.acc_dni
                }

                if(Grl.Vacio(params)){
                    this.$swal.fire({
                        icon:'error',
                        title:'Complete todos los campos',
                        width:400
                    });
                    return 0;
                }

                this.vm_visible=true;

                if(this.edit == 1){
                   return this.Editar();
                }

                this.vm_sub_title="Se está creando el cupón, esta acción puede tardar unos segundos";

                await axios.post(process.env.VUE_APP_API+'InsertImgBeneficio',this.imagen).then(async response => {
                    this.beneficio.url_img = response.data;
                    await this.CargarRango();
                    this.fase = 2;
                });

                await axios.post(process.env.VUE_APP_API+'InsertBeneficio',this.beneficio).then(response=>{
                    this.beneficio.cod_qr = response.data;
                    this.fase = 5;
                    this.vm_visible= false;
                });
            },

            async Editar(){
                this.vm_visible=true;
                this.vm_sub_title="Se están guardando los cambios";
                await axios.post(process.env.VUE_APP_API+'EditBeneficioExt',this.beneficio).then( ()=> {
                    this.fase = 4;
                    this.vm_visible= false;
                });
            },


            //CONTROL============================================

            async GestEdit(){
                this.fase = 0;
                console.log(this.Pbeneficio);
                await this.CargarRango();

                this.beneficio.nombre_negocio = this.Pbeneficio.nombre_negocio;
                this.beneficio.tipo_negocio = this.Pbeneficio.tipo_negocio;
                this.beneficio.direccion = this.Pbeneficio.direccion;
                this.beneficio.telefono = this.Pbeneficio.telefono;
                this.beneficio.titulo = this.Pbeneficio.titulo;
                this.beneficio.fecha_desde = this.Pbeneficio.fecha_desde;
                this.beneficio.fecha_hasta = this.Pbeneficio.fecha_hasta;
                this.beneficio.descripcion = this.Pbeneficio.descripcion;
                this.beneficio.puntos = this.Pbeneficio.puntos;
                this.beneficio.descuento = this.Pbeneficio.descuento;
                this.beneficio.precio = this.Pbeneficio.precio;
                this.beneficio.id_rango = this.Pbeneficio.id_rango;
                this.beneficio.id = this.Pbeneficio.id;
                this.beneficio.url_img = this.Pbeneficio.url_img;
                this.beneficio.cod_qr = this.Pbeneficio.cod_qr;
                this.beneficio.acc_nombre = this.Pbeneficio.acc_nombre;
                this.beneficio.acc_dni = this.Pbeneficio.acc_dni;
                this.ctrl_rango = this.Pbeneficio.id_rango.split(',');

                console.log(this.ctrl_rango);
                for(const rango of this.ctrl_rango){
                    console.log(rango)
                    $("#"+rango).attr( "checked", "checked");
                }
                
                $('#'+this.Pbeneficio.id_rango).attr( "checked", "checked" );
                
            },
            
            SoloNumeros($event){
                Grl.SoloNumero($event);
            },

            SoloNumerosPrecio($event){
                Grl.SoloNumeroPrecio($event);
            },

            Bloquear(event){
                if(event){
                    this.beneficio.precio = null;
                }else{
                    this.beneficio.descuento = null;
                }
            },

            FaseUno(){
                const params={
                    nombre_negocio:this.beneficio.nombre_negocio,
                    tipo_negocio:this.beneficio.tipo_negocio,
                    direccion:this.beneficio.direccion,
                    telefono:this.beneficio.telefono
                }

                if(Grl.Vacio(params)){
                    this.$swal.fire({
                        icon:'error',
                        title:'Complete todos los campos',
                        width:400
                    });
                }else{
                    if(this.edit == 0){
                        this.fase = 1;
                    }else{
                        this.fase = 2;
                    }
                }
            },

            FaseTres(){
                this.beneficio.id_rango = this.ctrl_rango.join();
                const params={
                    titulo: this.beneficio.titulo,
                    fecha_desde: this.beneficio.fecha_desde,
                    fecha_hasta: this.beneficio.fecha_hasta,
                    descripcion: this.beneficio.descripcion,
                    puntos: this.beneficio.puntos,
                    id_rango: this.beneficio.id_rango

                }

                if(Grl.Vacio(params) || (this.beneficio.descuento == null && this.beneficio.precio == null)){
                    this.$swal.fire({
                        icon:'error',
                        title:'Complete todos los campos',
                        width:400
                    });
                }else{
                    this.fase = 3;
                }
            },

            Cancelar(){
                if(this.fase >0){
                    this.fase -= 1;
                }else{
                    this.$emit('Regresar',null)
                }
            },

            VerificarFechas(t){
                if(t == 0){
                    if(this.beneficio.fecha_desde < this.fecha_hoy){
                        this.$swal.fire({
                            icon:'error',
                            title:'La fecha de inicio no puede ser menor a la actual',
                            width:400
                        });
                        this.beneficio.fecha_desde = this.fecha_hoy;
                    }
                }else{
                    if(this.beneficio.fecha_hasta < this.beneficio.fecha_desde){
                        this.$swal.fire({
                            icon:'error',
                            title:'La fecha de vencimiento no puede ser menor a la de inicio',
                            width:400
                        });

                        this.beneficio.fecha_hasta = null;
                    }
                }
            },

            async selectRango( id, event){

                if(event.target.checked){

                    this.ctrl_rango.push(id);

                }else{
                    this.ctrl_rango.forEach(function(car, index, object) {
                        if(car == id){
                            object.splice(index, 1);

                            if(object[index-1] == ','){
                                object.splice(index-1, 1);
                            }
                        }
                    });
                }
            },

            SelectAll(){
                if($('#todo').is(':checked')){
                    console.log($('.check_negocio'));
                    $('.check-rango').attr( "checked", "checked").attr("disabled", "disabled");
                    this.ctrl_rango = [];
                    for(const rango of this.rangos){
                        this.ctrl_rango.push(rango.id)
                    }
                    console.log(this.ctrl_rango);
                }else{
                    this.ctrl_rango = [];
                    $('.check-rango').removeAttr("disabled");
                    $('.check-rango:checked').trigger( "click" );
                }
            },
            
        },
    }
</script>
