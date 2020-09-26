var cant = 0;
var cantTotal = 3;

var validar = 0;

var imagenes = [];

function LoadCupon(idCupon, idEmpresa) {



    validar += 1;

    console.log(validar);

    $("#spinnerCupon").show();
    $("#dvContenido").hide();
    cant = 0;
    cantTotal = 3;

    LoadEmpresa(idCupon, idEmpresa);


}

function LoadCuponHeader(dataAdicional) {

    var paramHeader = {
        id_cupon: dataAdicional.idCupon,
    }

    var objHeader = CrearAjaxObject(uri, "cupones", "GET", paramHeader);

    LoadAjax(objHeader, CuponHeaderLoaded, 1, dataAdicional);

}

function LoadEmpresa(idCupon, idEmpresa) {

    var paramEmpresa = {
        id_comercio: idEmpresa
    }

    var dataAdicional = {
        idEmpresa: idEmpresa,
        idCupon: idCupon

    }

    var objEmpresa = CrearAjaxObject(uri, "comercio", "GET", paramEmpresa);

    LoadAjax(objEmpresa, EmpresaLoaded, 1, dataAdicional);

}

function LoadMasBeneficios(idCupon, idEmpresa) {

    var paramEmpresa = {
        id_cupon: idCupon,
        id_comercio: idEmpresa
    }

    /*
    var objEmpresa = {
        uri: uri,
        url: "cuponesExtra",
        tipo: "GET",
        params: paramEmpresa,
        error: null,
        errorMsj: null,
        reintentos: 0,
        idCupon: idCupon
    };
    */

    var objEmpresa = CrearAjaxObject(uri, "cuponesExtra", "GET", paramEmpresa);

    LoadAjax(objEmpresa, BeneficiosLoaded, 1);

}

function CuponHeaderLoaded(variables, result, dataAdicional) {

    if (variables.error == null) {
        var data = result.result.data[0];
        var img = "";

        if (data.imagen_cupon != null) {
            var img = GetFotos(pathCupones, data.imagen_cupon);
        }

        var html = ArmarFicha(img, data.descuento, data.descripcion, data.nombre, data.precio, data.terminos, data.fecha_hasta, data.tipo);

        var btnObtener = '<ons-button modifier="large" style="background-color:orange;" onclick="appNavigator.pushPage(\'cupon.html\').then(function (){ GetObtenerCupon(' + data.id_cupon + ')});">OBTENER CUPÓN</ons-button>';

        var compartir =
          '<ons-icon icon="fa-share-alt" style="margin-right: 1em;" onclick=\'navigator.share({title:"Ramper", url:"' + host +'cupon/'+data.slug+'"})\'></ons-icon>';
        
          $("#compartirCupon").html(compartir);



        if (data.categoria == "GASTRONOMÍA") {
            $("#colMenu").show();
            $("#colCronograma").hide();
            $("#dvRubro").html('<i class="fas fa-utensils"></i> Gastronomía');

            $("#dvServiciosGastronomia").show();
            $("#dvServiciosFitness").hide();
        }

        if (data.categoria == "FITNESS") {
            $("#colMenu").hide();
            $("#colCronograma").show();
            $("#dvRubro").html('<i class="fas fa-dumbbell"></i> Fitness');

            $("#dvServiciosGastronomia").hide();
            $("#dvServiciosFitness").show();

        }

        if (data.categoria == "SHOPPING") {
            $("#colMenu").hide();
            $("#colCronograma").show();
            $("#dvObtenerShopping").html(btnObtener);
            $("#spRubro").html('Shopping');

            $("#dvCuponPerfilShopping").html(html);
            $("#dvDividerShopping").show();
            //$("#dvInfoAdicionalEmpresa").hide();
            $("#dvTituloShopping").show();
            $("#dvCardShopping").show();
            $("#dvCardComun").hide();
        }
        else {
            //$("#colMenu").hide();
            //$("#colCronograma").show();
            $("#dvObtener").html(btnObtener);
            $("#dvCuponPerfil").html(html);
            $("#dvDividerShopping").hide();
            //$("#dvInfoAdicionalEmpresa").show();
            $("#dvTituloShopping").hide();
            $("#dvCardShopping").hide();
            $("#dvCardComun").show();
        }

        ++cant;

        if (cant == cantTotal) {
            $("#spinnerCupon").hide();
            $("#dvContenido").show();
        }
    }

    LoadMasBeneficios(dataAdicional.idCupon, dataAdicional.idEmpresa);

}

function EmpresaLoaded(variables, result, dataAdicional) {

    if (variables.error == null) {
        var data = result.result.data;

        $("#pDescripcionComercio").html(data.descripcion);

        var domicilioConcatenado = data.calle;
        $("#spDomicilio").html(domicilioConcatenado);

        $("#spZona").html(data.localidad + ", " + data.provincia);

        //$("#frmMaps").attr("src", "https://www.google.com/maps?q=" + domicilioConcatenado + "&output=embed");

        var map = '<iframe id="frmMaps" src="https://www.google.com/maps?q=' + domicilioConcatenado + '&output=embed&force=%20lite" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>'

        $("#iframeMap").html(map);


        imagenes[data.id_comercio] = {
            Fotos: data.fotos,
            Video: data.video
        }

       

        if (imagenes != null) {

            var primero = "";
            var otros = "";
            var cantTotal = 1;
            var ultImg = "";

            primero = GetFotos(pathComercios, data.imagen_principal);

            $.each(imagenes[data.id_comercio].Fotos, function (i, item) {



                ++cantTotal;





                if (cantTotal <= 4) {
                    //var listItem = ons.createElement('<ons-col width="25%"><img src="' + item.Path + item.Nombre + '" height="120%"></ons-col>');
                    var listItem = '<ons-col width="25%"><img src="' + GetFotos(pathComercios, item.imagen) + '" height="120%"></ons-col>';

                    otros += listItem;
                }
                else {
                    if (cantTotal == 5) {
                        ultImg = GetFotos(pathComercios, item.imagen);
                    }
                }




            });
        }

        // Menu
        if (data.imagen_menu != null) {
            $("#imgCronograma").attr("src", GetFotos(pathMenu, data.imagen_menu));
            $("#imgMenu").attr("src", GetFotos(pathMenu, data.imagen_menu));
            $("#btnCronograma").show();
            $("#btnMenu").show();
        }
        else {
            $("#imgCronograma").attr("src", "");
            $("#imgMenu").attr("src", "");
            $("#btnCronograma").hide();
            $("#btnMenu").hide();
        }

        // Horarios
        $("#dvDia1").html("Lunes cerrado");
        $("#dvDia2").html("Martes cerrado");
        $("#dvDia3").html("Miércoles cerrado");
        $("#dvDia4").html("Jueves cerrado");
        $("#dvDia5").html("Viernes cerrado");
        $("#dvDia6").html("Sábado cerrado");
        $("#dvDia7").html("Domingo cerrado");

        $(".diasHorarios").removeClass("active-day");

        $.each(data.horarios, function (i, item) {


            var horarios = "";

            if (item.horario_desde_matutino != null) {
                horarios += item.horario_desde_matutino + " hs";

                if (item.horario_hasta_matutino != null) {
                    horarios += " - " + item.horario_hasta_matutino + " hs";
                }

            }

            if (item.horario_desde_vespertino != null) {
                if (horarios != "") {
                    horarios += " | " + item.horario_desde_vespertino + " hs";
                } else {
                    horarios += item.horario_desde_vespertino + " hs";
                }

            }

            if (item.horario_hasta_vespertino != null) {
                horarios += " - " + item.horario_hasta_vespertino + " hs";
            }

            if (horarios == "") {
                horarios = "Cerrado";
            }





            var dia = 0;
            switch (item.dia) {
                case "Lunes":
                    dia = 1;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Martes":
                    dia = 2;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Miércoles":
                    dia = 3;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Jueves":
                    dia = 4;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Viernes":
                    dia = 5;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Sábado":
                    dia = 6;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                case "Domingo":
                    dia = 7;
                    $("#dvDia" + dia).html("");
                    $("#dvDia" + dia).html(item.dia + " " + horarios);
                    break;
                default:
                    break;
            }

            var hoy = new Date();



            if (hoy.getDay() == dia) {
                $("#dia" + item.id_horario_atencion).addClass("active-day");
                if (horarios == "Cerrado") {
                    $("#spEstado").html("Hoy Cerrado");
                } else {
                    $("#spEstado").html("Hoy Abrimos");
                }
            }


        });

        // Servicios

        $("#dvCol1").html('');
        $("#dvCol2").html('');

        if (data.servicios.length > 0) {

            if (data.servicios != null || data.servicios != "") {
                

                var col = 1;
                var anterior = 0;
                $.each(data.servicios, function (i, item) {

                    if (col == anterior) {
                        $("#dvCol" + (col + 1)).append('<p><i class="fas ' + item.icono + '" style="margin-right:5px;"></i> ' + item.servicio + '</p>');
                        anterior = col + 1;
                    } else {
                        $("#dvCol" + col).append('<p><i class="fas ' + item.icono + '" style="margin-right:5px;"></i> ' + item.servicio + '</p>');
                        anterior = col;
                    }


                });

            }
        } else {
            $("#dvServiciosGastronomia").hide();
        }

        // Actividades
        if (data.actividades.length > 0) {

            if (data.actividades != null || data.actividades != "") {
                $("#dvColAct1").html('');
                $("#dvColAct2").html('');

                var col = 1;
                var anterior = 0;
                $.each(data.actividades, function (i, item) {

                    if (col == anterior) {
                        $("#dvColAct" + (col + 1)).append('<p><i class="fas ' + item.icono + '" style="margin-right:5px;"></i> ' + item.actividad + '</p>');
                        anterior = col + 1;
                    } else {
                        $("#dvColAct" + col).append('<p><i class="fas ' + item.icono + '" style="margin-right:5px;"></i> ' + item.actividad + '</p>');
                        anterior = col;
                    }


                });
            }
        } else {
            $("#dvServiciosFitness").hide();
        }

        // Formas de pago
        if (data.metodo_pago.length > 0) {

            $("#dvFormaPago").html('');
            var formasPago = "";

            $.each(data.metodo_pago, function (i, item) {
               
                    formasPago += '<ons-col><i class="fa ' + item.icono + '" style="margin-right:5px;"></i> ' + item.forma_pago + '</ons-col>';
                
            });

            $("#dvFormaPago").html('<ons-row>' + formasPago + '</ons-row>');

        } else {
            $(".pago").hide();
        }
        // Contactos
        $("#dvContactos").html('');
        var contactos = "";

        if (data.telefono != null) {
            contactos += '<ons-col width="20%"><ons-icon icon="fa-phone" class="ons-icon fa-phone fa" onclick="window.open(\'tel: ' + data.telefono + '\',\'_system\');"></ons-icon></ons-col>';
        }
        if (data.whatsapp != null) {
            contactos += '<ons-col width="20%"><ons-icon icon="fa-whatsapp" class="ons-icon fa-whatsapp fa" onclick="window.open(\'https://api.whatsapp.com/send?phone=' + data.whatsapp + '\',\'_system\');"></ons-icon></ons-col>';
        }
        if (data.facebook != null) {
            contactos += '<ons-col width="20%"><ons-icon icon="fa-facebook" class="ons-icon fa-facebook fa" onclick="window.open(\'' + data.facebook + '\', \'_system\'); return false;"></ons-icon></ons-col>';
        }
        if (data.instagram != null) {
            contactos += '<ons-col width="20%"><ons-icon icon="fa-instagram" class="ons-icon fa-instagram fa" onclick="window.open(\'' + data.instagram + '\', \'_system\'); return false;"></ons-icon></ons-col>';
        }
        if (data.web != null) {
            contactos += '<ons-col width="20%"><ons-icon icon="fa-link" class="ons-icon fa-link fa" onclick="window.open(\'' + data.web + '\', \'_system\'); return false;"></ons-icon></ons-col>';
        }






        $("#dvContactos").html('<ons-row class="interaction">' + contactos + '</ons-row>');


        // Imagenes

        if (primero != "") {
            //$("#imgPrimero").attr("src", primero);
            primero = '<img id="imgPrimero" src="' + primero + '" width="100%" onclick="GoToGaleria(' + data.id_comercio + ');">';
        }

        var galeria = "";

        if (otros != "") {

            var ultimo = "";

            if (ultImg != "") {
                ultimo += '<ons-col width="25%" style="position:relative;">';
                ultimo += '<div class="cantidad"><p>+' + (cantTotal - 4) + '</p></div>';
                ultimo += '<img src="' + ultImg + '" height="120%">';
                ultimo += '</ons-col>';
            }

            galeria = "<ons-row>" + otros + ultimo + "</ons-row>";
        }

        $("#dvPrimero").html(primero);
        $("#dvImagenes").html(galeria);

        ++cant;

        if (cant == cantTotal) {
            $("#spinnerCupon").hide();
            $("#dvContenido").show();
        }
    }


    LoadCuponHeader(dataAdicional);



}

function BeneficiosLoaded(variables, result) {

    if (variables.error == null) {
        var cantidad = 0;
        var html = "";

        if (result.result.data.length > 0) {

            $.each(result.result.data, function (i, item) {

                if (item.id_cupon != variables.id_cupon && cantidad < 2) {



                    var img = "";
                    var archivo = "";
                    if (item.imagen_cupon != null) {
                        img = pathCupones;
                        archivo = item.imagen_cupon;
                    }

                    var promo = ""
                    if (item.tipo != null) {
                        promo = item.tipo;
                    } else if (item.descuento != 0) {
                        promo = item.descuento + "%";
                    }


                    if (item.precio > 0) {
                        if (item.descuento > 0) {
                            var descuento = GetDescuento(item.precio, item.descuento);

                            html += '<ons-row style="padding:5px;max-height: 125px;" onclick="$(\'ons-page\').scrollTop(0).then(LoadCupon(' + item.id_cupon + ', ' + item.id_comercio + '));">'
                            html += '<ons-col width="25%" style="margin-top:10px;">';
                            html += '<img src="' + GetFotos(img, archivo) + '" style="width:100%;max-height: 100%;">';
                            html += '</ons-col>';
                            html += '<ons-col>';
                            html += '<h2>' + item.titulo + '</h2>';
                            html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                            html += '<p style="text-align:right;margin-top:-10px;"><span class="tachado">$' + item.precio + '</span><span class="price-ofer">$' + descuento + '</span></p>';
                            html += '</ons-col>';
                            html += '</ons-row>';
                            html += '<div class="divider"></div>';

                        } else {
                            html += '<ons-row style="padding:5px;max-height: 125px;" onclick="$(\'ons-page\').scrollTop(0).then(LoadCupon(' + item.id_cupon + ', ' + item.id_comercio + '));">'
                            html += '<ons-col width="25%" style="margin-top:10px;">';
                            html += '<img src="' + GetFotos(img, archivo) + '" style="width:100%;max-height: 100%;">';
                            html += '</ons-col>';
                            html += '<ons-col>';
                            html += '<h2>' + item.titulo + '</h2>';
                            html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                            html += '<p style="text-align:right;margin-top:-10px;"><span class="price-ofer">$' + item.precio + '</span></p>';
                            html += '</ons-col>';
                            html += '</ons-row>';
                            html += '<div class="divider"></div>';

                        }

                    } else {
                        if (item.tipo != null || item.descuento != 0) {
                            html += '<ons-row style="padding:5px;max-height: 125px;" onclick="$(\'ons-page\').scrollTop(0).then(LoadCupon(' + item.id_cupon + ', ' + item.id_comercio + '));">'
                            html += '<ons-col width="25%" style="margin-top:10px;">';
                            html += '<img src="' + GetFotos(img, archivo) + '" style="width:100%;max-height: 100%;">';
                            html += '</ons-col>';
                            html += '<ons-col>';
                            html += '<h2>' + item.titulo + '</h2>';
                            html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                            html += '<p style="text-align:right;margin-top:-10px;"><span class="price-ofer">' + promo + '</span></p>';
                            html += '</ons-col>';
                            html += '</ons-row>';
                            html += '<div class="divider"></div>';
                        } else {

                            html += '<ons-row style="padding:5px;max-height: 125px;" onclick="$(\'ons-page\').scrollTop(0).then(LoadCupon(' + item.id_cupon + ', ' + item.id_comercio + '));">'
                            html += '<ons-col width="25%" style="margin-top:10px;">';
                            html += '<img src="' + GetFotos(img, archivo) + '" style="width:100%;max-height: 100%;">';
                            html += '</ons-col>';
                            html += '<ons-col>';
                            html += '<h2>' + item.titulo + '</h2>';
                            html += '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>';
                            html += '</ons-col>';
                            html += '</ons-row>';
                            html += '<div class="divider"></div>';
                        }

                    }


                    ++cantidad;
                }
            });

            $("#dvBeneficios").html(html);

            $("#dvBeneficiosContenido").show();
            $("#dvBeneficios").show();
        }
        else {

            $("#dvBeneficiosContenido").hide();
            $("#dvBeneficios").hide();
        }
    }

    ++cant;

    if (cant == cantTotal) {
        $("#spinnerCupon").hide();
        $("#dvContenido").show();
    }
}

function GoToGaleria(id_comercio) {
    appNavigator
        .pushPage('galeria.html')
        .then(function () {
            GetGaleria(id_comercio);
        });
}


function GetGaleria(id_comercio) {

    $("#spinner").show();
    var cant = 0;

    var carousel = document.querySelector('#carouselGaleria');

    $.each(imagenes[id_comercio].Fotos, function (i, item) {

        var carouselItem = ons.createElement('<ons-carousel-item><img src="' + GetFotos(pathComercios, item.imagen) + '" width="100%"></ons-carousel-item>');
        carousel.appendChild(carouselItem);
        ++cant;

    });

    if (imagenes[id_comercio].Video != null) {
        var carouselItem = ons.createElement('<ons-carousel-item><img src="' + GetFotos(pathComercios, imagenes[id_comercio].Video) + '" width="100%"></ons-carousel-item>');
        carousel.appendChild(carouselItem);
        ++cant;
    }

    $("#spTotal").html(cant);
    $("#spinner").hide();
}

function GetFotos(path, archivo) {

    return path + archivo;
}