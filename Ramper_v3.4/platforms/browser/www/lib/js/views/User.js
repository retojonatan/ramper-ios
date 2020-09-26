function GetMisCupones() {

    var param = {
        id_estado: 1
    }

    var objCupones = CrearAjaxObject(uri, "cuponesUsuario", "GET", param);

    LoadAjax(objCupones, CuponesUserLoaded);


}

function CuponesUserLoaded(variables, result) {

    var html = '';

    if (variables.error == null) {

        if (result.result.data.length > 0) {

            $.each(result.result.data, function (i, item) {

                img = GetFotos(pathCupones, item.imagen_cupon);

                var promo = ""
                if (item.tipo != null) {
                    promo = item.tipo;
                } else if (item.descuento != 0) {
                    promo = item.descuento + "%";
                }

                if (item.precio > 0) {
                    if (item.descuento > 0) {

                        var precioConDescuento = GetDescuento(item.precio, item.descuento);



                        html += '<ons-card onclick="appNavigator.pushPage(\'mi-cupon-detalle.html\').then(function (){ GetMiCupon(' + item.id_cupon + ')});"   >';
                        html += '<ons-row style="padding:5px;">';
                        html += '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">';
                        html += '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">';
                        html += '</ons-col>';
                        html += '<ons-col>';
                        html += '<h2>' + item.titulo + '</h2>';
                        html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                        html += '<ons-col>';
                        html += '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="tachado">$' + item.precio + '</span><br><span class="price-ofer">$' + precioConDescuento + '</span></p>';
                        html += '</ons-col>';
                        html += '</ons-row>';
                        html += '</ons-card>';
                    }else
                    {
                        html += '<ons-card onclick="appNavigator.pushPage(\'mi-cupon-detalle.html\').then(function (){ GetMiCupon(' + item.id_cupon + ')});"   >';
                        html += '<ons-row style="padding:5px;">';
                        html += '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">';
                        html += '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">';
                        html += '</ons-col>';
                        html += '<ons-col>';
                        html += '<h2>' + item.titulo + '</h2>';
                        html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                        html += '<ons-col>';
                        html += '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + item.precio + '</span></p>';
                        html += '</ons-col>';
                        html += '</ons-row>';
                        html += '</ons-card>';

                    }
                }else
                {
                    html += '<ons-card onclick="appNavigator.pushPage(\'mi-cupon-detalle.html\').then(function (){ GetMiCupon(' + item.id_cupon + ')});"   >';
                    html += '<ons-row style="padding:5px;">';
                    html += '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">';
                    html += '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">';
                    html += '</ons-col>';
                    html += '<ons-col>';
                    html += '<h2>' + item.titulo + '</h2>';
                    html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                    html += '<ons-col>';
                    html += '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">' + promo + '</span></p>';
                    html += '</ons-col>';
                    html += '</ons-row>';
                    html += '</ons-card>';
                }


            });




        } else {
            html = ' <div class="cupones-page">';
            html += '<p>No tenes CUPONES Canjeados.</p>';
            html += '</div>';

        }

    } else {

        if (variables.error == 404) {

            html = ' <div class="cupones-page">';
            html += '<p>No tenes CUPONES guardados.</p>';
            html += '</div>';
        }
        if (variables.error == 401) {

            html = ' <div class="cupones-page">';
            html += '<p> <i onclick="appNavigator.pushPage(\'login.html\')" style="color:orange;">Inicia Sesión</i> para ver tus CUPONES</p>';
            html += '</div>';
        }



    }



    $("#mis-cupones-user").html(html);

    $(".spinnerObtenerCupon").hide();
    $("#mis-cupones-user").show();




}


function GetMiCupon(id_cupon) {

    var paramHeader = {
        id_cupon: id_cupon
    }

    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaMiCupon").hide();

    var objHeader = CrearAjaxObject(uri, "cuponUsuario", "GET", paramHeader);

    LoadAjax(objHeader, MiCuponGetted);

}

function MiCuponGetted(variables, data) {

    if (variables.error == null) {


        var img = "";

        var result = data.result.data[0];

        if (data.result.data.length > 0) {
           
            
            img = GetFotos(pathCupones, result.imagen_cupon);
        



            var html = ArmarFichaDetalle(result.descuento, result.titulo, result.nombre, result.precio, result.tipo);

        $("#dvObtenerMiCupon").html(html);

        jQuery('#mcqrcode').qrcode({
            text: result.qr
        });

            $("#hMCQR").html(result.qr);

            var terminos = ArmarTerminos(result.terminos, result.fecha_hasta);


        $("#dvMCTerminos").html(terminos);



            var botonEliminar = '<ons-button onclick="eliminarCupon('+result.id_cupon+')">Eliminar</ons-button>'

            $("#eliminarCupon").html(botonEliminar);

        }else{
            var modal = document.querySelector('ons-modal');
            modal.show();
        }

    } else {

        if (variables.error == 401) {
            var modal = document.querySelector('ons-modal');
            modal.show();

        }


    }



    $(".spinnerObtenerCupon").hide();
    $("#dvTarjetaMiCupon").show();

}

function eliminarCupon(id_cupon) {

    var paramHeader = {
        id_cupon: id_cupon
    }

    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaMiCupon").hide();

    var objHeader = CrearAjaxObject(uri, "eliminarCupon", "POST", paramHeader);

    LoadAjax(objHeader, eliminado);

}

function eliminado(variables, data)
{
    if (variables.error == null) 
    {
        document.getElementById('appNavigator').popPage().then(function () {
            ons.notification.toast("Eliminaste el cupón.", {
                timeout: 4000
            });

        });

    }else
    {
        ons.notification.toast("Hubo un problema, intentá mas tarde.", {
            timeout: 4000
        });
    }

    GetMisCupones();

}

/*
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9987/api/Cliente/ObtenerCupon",
    "method": "POST",
    "headers": {
      "accept": "application/json",
      "authorization": "Bearer y46Tg900AWFnho8CiLZvf367I0c2hoUSM9VG1teWyCiIixYtbnBSKgQ5jWc08tZr4oOdTChTgU0xc2_gjZ3AQdsvZ3NpoxJUrzpjOYOef5tcqZLqaWIOBeO_VPWoBCLsgcg3K6J51AFjJBj9z2JjmJ-Wz2hqDIsuPf3vXHlUkAsYYbcxmiyKdFVcvQvixywRrsThPQ2ck-V8LVw8L8LSa6PXpV6FttW7ju33NSf5i0m_yxiOW15KFqEmsqiaPRk-xowDXk6bY6vhz7mdQfnQXj_jbaWikp9JQcqji6PytIgg3r2wpzQXFs1DfS0G2AeXkKzc_xMuFz4QeQFxdjMeO1-fcEAjociuHQ0uidgvSsY9vgY1Pb5TxhHRKDjsJRoniZVIv2f0xob7dM8u48esbA",
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "5ea2d47c-9445-4a1f-86e4-bb46f0abbc15"
    },
    "processData": false,
    "data": "{ \"cd_usuario\": 10010, \"id_cupon\": 10013, \"id_estado_inicial\": 1}"
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
*/



