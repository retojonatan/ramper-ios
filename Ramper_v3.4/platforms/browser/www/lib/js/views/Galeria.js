/*
function LoadGaleria(idEmpresa) {

    //$("#dvGaleria").hide();
    
    var paramEmpresa = {
        id: idEmpresa
    }
    
    var objEmpresa = CrearAjaxObject(uri, "/api/Empresa/GetEmpresas", "GET", paramEmpresa);

    LoadAjax(objEmpresa, GetGaleria,1);    
}
*/

function GetGaleria(imagenesJson) {



    $("#spinner").show();  

    var imagenes = JSON.parse(imagenesJson);
        var cant = 0;

        var carousel = document.querySelector('#carouselGaleria');

        $.each(imagenes, function (i, item) {

            if (item.tipo_multimedia == "Foto" || item.tipo_multimedia == "Video") {
                var carouselItem = ons.createElement('<ons-carousel-item><img src="' + GetFotos(item.Path, item.Nombre) + '" width="100%"></ons-carousel-item>');
                carousel.appendChild(carouselItem);
                ++cant;
            }
            
        });

        $("#spTotal").html(cant);
    
        
    $("#spinner").hide();  
}

function GetFotos(path, archivo) {

    return uri + '/UploadedFiles/' + archivo;
}