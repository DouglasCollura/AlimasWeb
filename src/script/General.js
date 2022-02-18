function SoloNumero (e){
    if( !( e.keyCode >= 96 && e.keyCode <= 105 ) && (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
       return  e.preventDefault();
    }
}

function SoloNumeroPrecio (e){
    if( !( e.keyCode >= 96 && e.keyCode <= 105 ) && (e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8  && e.keyCode != 190  && e.keyCode !=110  && e.keyCode !=188) {
       return  e.preventDefault();
    }
}

function SoloLetra(e){
    if((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 8) {
       return  e.preventDefault();
    }
}

function Vacio(datas){
    for (const [key, value] of Object.entries(datas)) {
        console.log(key);
        if((value == '' || value == null) && value != 0 ){
            
            return true;
        }
    }
}

function CrearFecha(){
    let fecha = new Date();
    let fecha_hoy = null;
    fecha_hoy += fecha.getFullYear();
    if((fecha.getMonth()+1 )<10){
        fecha_hoy +="-"+'0'+(fecha.getMonth()+1 )
    }else{
        fecha_hoy +="-"+(fecha.getMonth()+1 )
    }

    if(fecha.getDate()<10){
        fecha_hoy +="-"+'0'+fecha.getDate()
    }else{
        fecha_hoy +="-"+fecha.getDate()
    }
    return fecha_hoy
}


export default {
    SoloLetra,
    SoloNumero,
    Vacio,
    CrearFecha,
    SoloNumeroPrecio
}