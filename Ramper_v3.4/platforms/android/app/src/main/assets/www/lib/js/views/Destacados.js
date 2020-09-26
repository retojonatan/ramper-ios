
function GetDestacadosApp() {
    
    var paramDestacados = {
        id: 0,
        id_empresa: 0,
        id_categoria: 0,
        destacados: true
    }
    
    $("#dvContenidoDestacados").css('visibility', 'hidden');
    $(".spinnerTab").show();

    var objDestacados = CrearAjaxObject(uri, "/api/Cupon/GetEncabezadoCupones", "GET", paramDestacados);

    LoadAjax(objDestacados, DestacadosAppLoaded,1);

    var paramCategoriaPadres = {
        filtro: 0
    }

    var objPadres = CrearAjaxObject(uri, "/api/Cupon/GetCategoriasPadre", "GET", paramCategoriaPadres);

    LoadAjax(objPadres, PadresLoaded,1);

}

function DestacadosAppLoaded(variables, destacados) {

    if (variables.error == null) {
        var carouselGastro = document.querySelector('.destacadosGastro');
        var carouselShop = document.querySelector('.destacadosShop');
        var carouselFitness = document.querySelector('.destacadosFitness'); 

        $.each(destacados, function (i, item) {

            var push = "";
            if (item.Categoria != null) {
                switch (item.Categoria.nombre) {
                    case "Gastronomía":
                        push = "push-gastronomia";
                        break;

                    case "Shopping":
                        push = "push-comercio";
                        break;

                    case "Fitness":
                        push = "push-fitness";
                        break;
                    
                    default:
                        push = "";
                }

                if (push != "") {

                    var img = uri + "UploadedFiles/" + "lib/img/birras.jpg";

                    if (item.Imagen != null) {
                        if (item.Imagen.Archivo != "") {
                            img = GetFotos(item.Imagen.Path, item.Imagen.Archivo);
                        }
                    }

                    var descuento = GetDescuento(item.Precio, item.Descuento);

                    var carouselItem = ons.createElement('<ons-carousel-item style="width: 95%;">'
                        + '<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.NombreEmpresa + '" data-cdEmp="' + item.CdEmpresa + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.CdEmpresa + ', \'' + item.NombreEmpresa + '\');">'
                        + '<div class="imagen-ficha"><img src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                        + '<div class="sale-tile"><div class="sale">obtené <br> <span class="porciento">' + item.Descuento + '%</span></div></div>'
                        + '<div class="title">' + item.Descripcion + '</div>'
                        + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.NombreEmpresa + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="tachado">$' + item.Precio + '</span> <br> <span class="price-ofer">$' + descuento + '</span></p></ons-col></ons-row></div>'
                        + '</ons-card>'
                        + '</ons-carousel-item>'
                    );

                    switch (item.Categoria.nombre) {
                        case "Gastronomía":
                            carouselGastro.appendChild(carouselItem);
                            break;

                        case "Shopping":
                            carouselShop.appendChild(carouselItem);
                            break;

                        case "Fitness":
                            carouselFitness.appendChild(carouselItem);
                            break;

                        default:
                        // code block
                    }
                }
            }            

        }); 

    }

    $("#dvContenidoDestacados").css('visibility', 'visible');
    $(".spinnerTab").hide();
}





function GetDescuento(precio, descuento) {

    var precioConDescuento = (precio - (precio / 100) * descuento);

    if (precioConDescuento == 0) {
        return "";
    }
    else {
        return precioConDescuento;
    }
    

}