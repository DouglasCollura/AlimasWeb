<template  >
<base-layout> 
<button  v-show="fase == 1" @click="fase = 0" class="btn-return">Regresar</button>

<!-- VISTA FITRO -->

    <div class="filtro-container-xs" v-show="filtro == true">
        <img class="btn-close" src="../image/close.svg" @click="CtrlFiltro" alt="">

        <h1>Encuentra usuarios</h1>

        <div class="inicio-right-sub-content">
            <h4>Rango de puntos</h4>

            <div class="checkbox-group" v-for="rango in rangos" :key="rango.id">
                <input type="checkbox" @click="selectRango(rango.valor, $event)" name="a" :id="rango.id" > 
                <label :for="rango.id"> {{ rango.valor }}</label>
            </div> 
            
        </div>

        <div class="inicio-right-sub-content">
            <h4>Fecha de registro</h4>
            
            <select  @change="CargarMes" v-model="anio_select" name="" id="">
                <option value="0">Año de registro</option>
                <option v-for="anio in anios_filtro" :key="anio" :value="anio">
                    {{anio}}
                </option>
            </select>

            <select @change="CargarDia" v-model="mes_select" id="">
                <option value="0">Mes de registro</option>
                <option v-for="mes in meses_filtro" :key="mes" :value="mes">
                    {{mes}}
                </option>
            </select>

            <select  v-model="dia_select" id="">
                <option value="0">Día de registro</option>
                <option v-for="dia in dias_filtro" :key="dia" :value="dia">
                    {{dia}}
                </option>
            </select>

            <button class="btn btn-orange" @click="Filtrar">FILTRAR</button>
                
        </div>
    </div>
<!-- VISTA FITRO -->

<div class="temp-inicio" v-if="fase == 0">

    <div class="section-inicio-body">
        <div class="card inicio-body-card">
            
            <h1 class="text-orange font-500">¡Hola {{nombre}}!</h1>

            <div class="img-dash">
                <img src="../image/img-dash.png"  alt="">     
            </div> 
        </div>

        <h1>Usuarios registrados</h1>
        
        <div class="inicio-busc">
            <input type="text" class="input-search"  @keyup.enter="Buscar($event)" placeholder="Busca por nombre">
            <button class="btn" @click="reporte"> <i class="icon icon-download"></i> </button>
        </div>

        <div class="inicio-content">
            
            <div v-if="usuarios == null" class="load"></div>

            <div  v-for="usuario in usuarios" :key="usuario.id" class="card grid card-4c align-items-center" @click="AbrirPerfil(usuario)" style="cursor:pointer">
                <div class="card-img">
                    <img v-if="usuario.url_img_perfil != null" :src="host+usuario.url_img_perfil" alt="">
                    <img v-else src="../image/user-logo.png" alt="">
                </div>

                <h3 class="text-green font-500"> {{usuario.nombre_negocio}} </h3>

                <h3> {{ usuario.puntos_obtenidos }} </h3>

                <div class="grid justify-items-end" style="align-self: stretch;">
                    <button v-if="usuario.fecha_reg == fecha_hoy" class="btn-card align-self-start">Nuevo</button>
                    <h4 class="align-self-end"> {{usuario.fecha_reg.split("-").reverse().join("-")}} </h4>
                </div>
            </div>

        </div>

    </div>

    <div class="section-inicio-right">

        <div class="card inicio-right-card">
            <div class="bg-icon-users">
                <h1 class="icon-users"></h1> 
            </div> 
            <h3>usuarios registrados</h3>
            <h1> {{cant_users}} </h1>
        </div>

        <div class="inicio-right-content" >
            <h3 class="font-500">Filtra para encontrar usuarios</h3>

            <div class="inicio-right-sub-content">
                <h4>Rango de puntos</h4>

                <div class="checkbox-group" v-for="rango in rangos" :key="rango.id">
                    <input type="checkbox" @click="selectRango(rango.valor, $event)" name="a" :id="rango.id" > 
                    <label :for="rango.id"> {{ rango.valor }}</label>
                </div> 
                 
            </div>

            <div class="inicio-right-sub-content">
                <h4>Fecha de registro</h4>
                
                <select  @change="CargarMes" v-model="anio_select" name="" id="">
                    <option value="0">Año de registro</option>
                    <option v-for="anio in anios_filtro" :key="anio" :value="anio">
                        {{anio}}
                    </option>
                </select>

                <select @change="CargarDia" v-model="mes_select" id="">
                    <option value="0">Mes de registro</option>
                    <option v-for="mes in meses_filtro" :key="mes" :value="mes">
                        {{mes}}
                    </option>
                </select>

                <select  v-model="dia_select" id="">
                    <option value="0">Día de registro</option>
                    <option v-for="dia in dias_filtro" :key="dia" :value="dia">
                        {{dia}}
                    </option>
                </select>

                <button class="btn btn-orange" @click="Filtrar">FILTRAR</button>
                 
            </div>

        </div>

    </div>


    <!-- VISTA MOBILE -->

    <div class="section-inicio-body-xs">
        <div class="card inicio-body-card">
            
            <h1 class="text-orange font-500">¡Hola {{nombre}}!</h1>

            <div class="img-dash">
                <img src="../image/img-dash.png"  alt="">     
            </div> 
        </div>

        <div class="card inicio-right-card">
            <div class="bg-icon-users">
                <h1 class="icon-users"></h1> 
            </div> 
            <div>
                <h3>usuarios registrados</h3>
                <h1> {{cant_users}} </h1>
            </div>
        </div>

        <h1>Usuarios registrados</h1>

        <div class="inicio-busc">
            <input type="text" class="input-search"  @keyup.enter="Buscar($event)" placeholder="Busca por nombre">
            <button class="btn" @click="reporte"> <i class="icon icon-download"></i> </button>
            <button class="btn" @click="CtrlFiltro"> <img src="../image/filtro.svg" alt=""> </button>
        </div>

        <div class="inicio-content">
            <div v-if="usuarios == null" class="load"></div>
            <div  v-for="usuario in usuarios" :key="usuario.id" class="card grid card-4c align-items-center" @click="AbrirPerfil(usuario)" style="cursor:pointer">
                <div class="card-img">
                    <img v-if="usuario.url_img_perfil != null" :src="host+usuario.url_img_perfil" alt="">
                    <img v-else src="../image/user-logo.png" alt="">
                </div>

                <h3 class="text-green font-500"> {{usuario.nombre_negocio}} </h3>

                <h3 class="text-center"> {{ usuario.puntos_obtenidos }} </h3>

                <div class="grid justify-items-end" style="align-self: stretch;">
                    <button class="btn-card align-self-start">Nuevo</button>
                    <h4 class="align-self-end"> {{usuario.fecha_reg.split("-").reverse().join("-")}} </h4>
                </div>
            </div>

        </div>
        
    </div>


</div>

<profile v-if="fase == 1" :usuario="usuario" />


</base-layout>


<vmodel class="grid" :visible="vm_visible" :type="vm_type" :sub_title="vm_sub_title" :title="vm_title">

    <button v-if="vm_type == 'vm-download'" class="btn btn-orange" style="width:60%" @click="Exportar">SI</button>
    <button v-if="vm_type == 'vm-download'" class="btn btn-orange" style="width:60%" @click="vm_visible = false">NO</button>


</vmodel>
</template>

<script>
	//import { IonPage, IonContent } from '@ionic/vue';
	import axios from 'axios';
    import profile from './Profile';
    import vmodel from '../components/vmodel';
    import $ from 'jquery';

	export default{

		components: {
            profile,
            vmodel
		},

        async created () {
            if(localStorage.getItem('nombre')){
                this.nombre = localStorage.getItem('nombre');
            }else{
                this.nombre = sessionStorage.getItem('nombre');
            }
            await this.CargarUsuarios();
            this.cant_users = this.usuarios.length;
            this.CargarRango();
            this.CrearFecha();
        },

        data() {
            return {
                //CARGA
                usuarios:[],
                rangos:[],

                //GESTION   
                usuario:null,
                anio_select:0,
                mes_select:0,
                dia_select:0,
                  
                //VAR CONTROL
                nombre:null,
                anios_filtro:[],
                meses_filtro:[],
                dias_filtro:[],
                fase: 0,
                ctrl_rango:[],
                max_rango:null,
                min_rango:null,
                cant_users:0,
                fecha_hoy:null,
                filtro:false,
                //MODEL
                vm_type:"",
                vm_title:"",
                vm_visible:false,
                vm_sub_title:"",
                host:process.env.VUE_APP_HOST,
            }
        },
        methods: {

        //CARGA================================================== 

            async CargarUsuarios(){
                this.usuarios=null;
                await axios.get(process.env.VUE_APP_API+'GetUsuario').then(response=>{
                    this.usuarios = response.data;
                    console.log("USUARIOS: ======================");
                    console.log(this.usuarios);
                });
            },

            async CargarRango() {
                await axios.get(process.env.VUE_APP_API+'GetRango').then(response=>{
                    this.rangos = response.data
                });
            },



        //GESTION==================================================

            async Filtrar(){
                const params={
                    anio: this.anio_select,
                    mes: this.mes_select,
                    dia: this.dia_select,
                    min_rango:this.min_rango,
                    max_rango: this.max_rango
                }

                if(params.anio == 0 && params.mes == 0 && params.dia == 0 && params.min_rango == null && params.max_rango == null){
                    this.CargarUsuarios();
                    return 0;
                }
                this.usuarios = null;
                this.filtro =false;
                await axios.post(process.env.VUE_APP_API+'FiltrarUsuario', params).then(response=>{
                    this.usuarios=[];
                    this.usuarios = response.data;
                    console.log(response.data)
                });
                
            },

            async Buscar($event){
                let obj = $event.target;
                const params ={
                    consulta: obj.value
                }
                this.usuarios = [];
                await axios.post(process.env.VUE_APP_API+'BuscarUsuario',params).then(response=>{
                    console.log(response.data)
                    this.usuarios = response.data
                });
            },

            async Exportar(){
                this.vm_visible=true;
                this.vm_title="Generando...";
                this.vm_type="load";
                const params = {
                    usuarios: this.usuarios
                }

                await axios.post(
                    process.env.VUE_APP_API+'ExportExcelUsuarios',
                    params,
                    {
                        responseType: 'arraybuffer',
                    }
                )
                .then(response=>{
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'template.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    this.vm_visible=false;
                });
            },


        //CONTROL==================================================
        
            async AbrirPerfil(usuario){
                
                this.usuario = null;
                this.usuario = usuario;
                this.fase = 1;
                console.log("USUARIO: ======================");
                console.log(this.usuario)
            },
            reporte(){
                this.vm_visible = true;
                this.vm_type = 'vm-download';
                this.vm_title = '¿Deseas descargar el informe?';
            },
            descargarReporte(){
                this.vm_visible = true;
                this.vm_title = '';
                this.vm_sub_title="El informe se está descargando, esta acción puede tardar unos segundos";
                this.vm_type= 'vm-load';
            },

            CargarMes(){    
                this.meses_filtro = [];
                this.dias_filtro = [];
                this.mes_select=0;
                this.dia_select=0;    

                if(this.anio_select != 0){
                    for (let index =12; index >= 1; index--) {
                        this.meses_filtro.push(index)
                    }
                }
            },

            CargarDia(){
                this.dias_filtro = [];
                this.dia_select=0;    

                if(this.mes_select != 0){
                    for (let index =31; index >= 1; index--) {
                        this.dias_filtro.push(index)
                    }
                }
            },

            selectRango( valor, event){
                var rango =[];
                var sub_rango=[];
                if(event.target.checked){
                   this.ctrl_rango.push(valor);
                }else{
                    this.ctrl_rango.forEach(function(car, index, object) {
                        if(car === valor){
                        object.splice(index, 1);
                        }
                    });
                }
                for (let rango_i of this.ctrl_rango) {
                    rango_i = rango_i.replace('+','');
                    sub_rango = rango_i.split('-');
                    for (const sb_rg of sub_rango) {
                        rango.push(sb_rg);
                    }
                }
                if(this.ctrl_rango.length > 0){
                    this.min_rango = Math.min.apply(null, rango);
                    this.max_rango = Math.max.apply(null, rango);
                }else{
                    this.min_rango = null;
                    this.max_rango = null;
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

            CtrlFiltro(){
                this.filtro = !this.filtro;
                if(this.filtro){
                    window.scroll({
                        top: 0
                    });
                    $('#app').css("overflow","hidden");
                }
            }

        },

        mounted () {
            let fecha = new Date();
            for (let index = fecha.getFullYear(); index >= 2022; index--) {
                this.anios_filtro.push(index)
            }
        },

	}	

</script>
