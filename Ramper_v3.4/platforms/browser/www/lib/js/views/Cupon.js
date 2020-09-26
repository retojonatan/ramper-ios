function GetObtenerCupon(id_cupon) {

    var paramHeader = {
        id_cupon: id_cupon
    }

    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaCupon").hide();

    var objHeader = CrearAjaxObject(uri, "obtenerCupon", "POST", paramHeader);

    LoadAjax(objHeader, CuponGetted);

}

function CuponGetted(variables, data) {

    if (variables.error == null) {


        var img = "";
        if (data.result.data[0].imagen_cupon != null) {

            var result = data.result.data[0];

            img = GetFotos(pathCupones, result.imagen_cupon);
        }



        var html = ArmarFichaDetalle(result.descuento, result.titulo, result.nombre, result.precio,result.tipo);

        $("#dvObtenerCupon").html(html);

        jQuery('#qrcode').qrcode({
            text: result.qr
        });

        $("#hQR").html(result.qr);

        var terminos = ArmarTerminos(result.terminos, result.fecha_hasta);


        $("#dvTerminos").html(terminos);
    } else {

        if (variables.error == 401) {
            document.getElementById('appNavigator').popPage().then(function () {
                var modal = document.querySelector('ons-modal');
                modal.show();
            });

        } else if (variables.error == 400) {
            document.getElementById('appNavigator').pushPage('error.html');

        } else if (variables.error == 404) {

            document.getElementById('appNavigator').popPage().then(function () {
                ons.notification.toast("Ya obtuviste este cupón hoy.", {
                    timeout: 4000
                });

            });

            /*
            var error = variables.response.ExceptionMessage;

            $("#modal-custom-text").html(error);

            var modalCustom = document.querySelector('#modal-custom');
            modalCustom.show();  
            */

        }


    }



    $(".spinnerObtenerCupon").hide();
    $("#dvTarjetaCupon").show();

}

function ArmarFichaDetalle(descuento, descripcion, empresa, precio, tipo) {

    var html = '';

    var promo = ""
    if (tipo != null) {
        promo = tipo;
    } else if (descuento != 0) {
        promo = descuento + "%";
    }

    if (precio > 0) {
        if (descuento > 0) {

            var precioConDescuento = GetDescuento(precio, descuento);



            html += '<div class="title card__title">' + descripcion + '</div>';
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<div style="line-height:15px;">';
            html += '<p style="margin-top:0px;"><span class="tachado">$' + precio + '</span> <br> <span class="price-ofer">$' + precioConDescuento + '</span></p>';
            html += '</div>';
        } else {

            html += '<div class="title card__title">' + descripcion + '</div>';
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<div style="line-height:15px;">';
            html += '<p style="margin-top:0px;"><span class="price-ofer">$' + precio + '</span></p>';
            html += '</div>';

        }
    }
    else
    {
        html += '<div class="title card__title">' + descripcion + '</div>';
        html += '<div class="content card__content">';
        html += '<div width="75%" style="margin-top:20px">';
        html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
        html += '</div>';
        html += '<div style="line-height:15px;">';
        html += '<p style="margin-top:0px;"><span class="price-ofer">' + promo + '</span></p>';
        html += '</div>';
    }





    return html;
}

function ArmarTerminos(terminos, fcVencimiento) {

    var html = '';

    html += '<h5>TERMINOS Y CONDICIONES</h5>';
    html += '<p style="margin-bottom:0px">' + terminos + '</p>';
    html += '<p style="margin-top:10px">Válido hasta : <strong>' + fcVencimiento + '</strong></p>';
    html += '</div>';

    return html;

}


/*
function GetObtenerCupon(id_cupon) {

    var paramHeader = {
        cd_usuario: 0,
        id_cupon: id_cupon,
        id_estado_inicial: 1
    }

    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaCupon").hide();

    var objHeader = CrearAjaxObject(uri, "/api/Cliente/ObtenerCupon", "POST", paramHeader);

    LoadAjax(objHeader, CuponGetted);

}

function CuponGetted(variables, result) {

    if (variables.error == null) {
        var data = result[0];

        var img = "";
        if(data.Imagen){
            img = GetFotos(data.Imagen.Path, data.Imagen.Archivo);
        }

         

        var html = ArmarFicha(img, data.Descuento, data.Descripcion, data.NombreEmpresa, data.Precio, data.TerminosCondiciones, data.Fc_hasta);

        $("#dvObtenerCupon").html(html);

        jQuery('#qrcode').qrcode({
            text: data.QR
        });	

        $("#hQR").html(data.QR);
    }else{

        if (variables.error == 401) {           
                var modal = document.querySelector('ons-modal');
                modal.show();                
             
        }


    }



    $(".spinnerObtenerCupon").hide();
    $("#dvTarjetaCupon").show();

}
*/
function ArmarFicha(img, descuento, descripcion, empresa, precio, terminos, fcVencimiento, tipo) {

    var html = '';

    var promo = ""
    if (tipo != null) {
        promo = tipo;
    } else if (descuento != 0) {
        promo = descuento + "%";
    }



    if (precio > 0) {
        if (descuento > 0) {

            var precioConDescuento = GetDescuento(precio, descuento);

            html += '<div class="imagen-ficha">';
            html += '<img src="' + img + '" alt="Onsen UI" style="width: 100%">';
            html += '</div>';
            html += '<div class="sale-tile">';
            html += '<div class="sale">obtené <br> <span class="porciento">' + descuento + '%</span></div>';
            html += '</div>';
            html += '<div class="title card__title" style="white-space: pre-wrap;">' + descripcion + '</div>';
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<div style="text-align:right;line-height:15px;">';
            html += '<p style="margin-top:0px;"><span class="tachado">$' + precio + '</span> <br> <span class="price-ofer">$' + precioConDescuento + '</span></p>';
            html += '</div>';
            html += '<h5>TERMINOS Y CONDICIONES</h5>';
            html += '<p style="margin-bottom:0px">' + terminos + '</p>';
            html += '<p style="margin-top:10px">Válido hasta : <strong>' + fcVencimiento + '</strong></p>';
            html += '</div>';

        } else {

            html += '<div class="imagen-ficha">';
            html += '<img src="' + img + '" alt="Onsen UI" style="width: 100%">';
            html += '</div>';
            html += '<div class="sale-tile">';
            html += '<div class="sale"><span class="porciento">$' + precio + '</span></div>';
            html += '</div>';
            html += '<div class="title card__title" style="white-space: pre-wrap;">'+descripcion+"</div>";
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<div style="text-align:right;line-height:15px;">';
            html += '<p style="margin-top:0px;"><span class="price-ofer">$' + precio + '</span></p>';
            html += '</div>';
            html += '<h5>TERMINOS Y CONDICIONES</h5>';
            html += '<p style="margin-bottom:0px">' + terminos + '</p>';
            html += '<p style="margin-top:10px">Válido hasta : <strong>' + fcVencimiento + '</strong></p>';
            html += '</div>';
        }
    } else {
        if (tipo != null || descuento != 0) {
            html += '<div class="imagen-ficha">';
            html += '<img src="' + img + '" alt="Onsen UI" style="width: 100%">';
            html += '</div>';
            html += '<div class="sale-tile">';
            html += '<div class="sale">obtené <br> <span class="porciento">' + promo + '</span></div>';
            html += '</div>';
            html += '<div class="title card__title" style="white-space: pre-wrap;">'+ descripcion + "</div>";
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<div style="text-align:right;line-height:15px;">';
            html += '<p style="margin-top:0px;"><span class="price-ofer">$' + promo + '</span></p>';
            html += '</div>';
            html += '<h5>TERMINOS Y CONDICIONES</h5>';
            html += '<p style="margin-bottom:0px">' + terminos + '</p>';
            html += '<p style="margin-top:10px">Válido hasta : <strong>' + fcVencimiento + '</strong></p>';
            html += '</div>';

        } else {

            html += '<div class="imagen-ficha">';
            html += '<img src="' + img + '" alt="Onsen UI" style="width: 100%">';
            html += '</div>';
            html += '<div class="title card__title" style="white-space: pre-wrap;">' +descripcion +"</div>";
            html += '<div class="content card__content">';
            html += '<div width="75%" style="margin-top:20px">';
            html += '<p style="margin-bottom:0px;margin-top:0px;">' + empresa + '</p>';
            html += '</div>';
            html += '<h5>TERMINOS Y CONDICIONES</h5>';
            html += '<p style="margin-bottom:0px">' + terminos + '</p>';
            html += '<p style="margin-top:10px">Válido hasta : <strong>' + fcVencimiento + '</strong></p>';
            html += '</div>';
        }
    }



    return html;
}