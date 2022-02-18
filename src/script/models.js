import $ from 'jquery';


//var gtype='vm-success'; /* vm-success | vm-load | vm-download | vm-error |  */

function create(type, title){
    $("#vmodel").remove();
    //ESTRUCTURA=====================================================
        //CARD
        $('body').append('<div id="vmodel"> </div>');
        // ESTILOS
        $("#vmodel").css({
            "width":"60%",
            "min-height":"400px",
            "background":"#FFF6F0",
            "position":"absolute",
            "display":"grid",
            "justify-self":"center",
            "align-self":"center",
            "border-radius":"10px",
            "padding":'5px 20px',
            "padding-bottom": "50px"
        });

        //HEAD
        if(type == 'vm-success' || type == 'vm-error' || type == 'vm-download'){    
            $("#vmodel").append("<div id='vm-head'> </div>");
            // ESTILOS
            $("#vm-head").css({
                "display":"grid",
                "justify-self":'end',
                "height":'max-content',
                "color":  "#C04F00",
                "font-size": "24px",
                "cursor": 'pointer'
            });
            $("#vm-head").text("x");
        }

        //BODY
        $("#vmodel").append("<div id='vm-body'> </div>");
        // ESTILOS
        $("#vm-body").css({
            "display":"grid",
            "justify-items":'center',
            'align-self':'center',
            'grid-gap':'20px'
        });

        //TITULO
        if(type != 'load'){
            $("#vm-body").append("<h1 id='vm-title'> </h1>");
        }   

    

//CONTENIDO===============================================================
    
    //MV-SUCCESS
    if(type == "vm-success"){
        $("#vm-title").text(title);
        $("#vm-body").append("<img src='/vmodel/img-success.png'>");
    }

    if(type == "vm-error"){
        $("#vm-title").text(title);
        $("#vm-body").append("<img src='/vmodel/img-error.png'>");
        $("#vm-body").append("<button class='btn btn-orange' style='width:50%'> VOLVER A INTENTAR </button>");
    }

    if(type== "vm-download"){
        $("#vm-title").text(title);
        $("#vm-body").append("<img src='/vmodel/img-download.png'>");
        $("#vm-body").append("<button class='btn btn-orange' id='confirm' style='width:50%'> SI </button>");
        $("#vm-body").append("<button class='btn btn-orange' style='width:50%'> NO </button>");

    }
}

$(document).on("click", "#vm-head",function(){
    $("#vmodel").remove();
});
function close(){
    $("#vmodel").remove();
}


$(document).on("click", "#confirm",function(){
    return 0;
});

export {
    create,
    close
}