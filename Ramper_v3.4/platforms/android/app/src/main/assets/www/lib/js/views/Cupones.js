var cantServCupones = 0;
var cantServCuponesTotales;

//var pageSize = 9;
var paginaActual = 1;

function LoadCuponesData(activeIndex, pagina = 1) {

    console.log('LoadCuponesData ' + activeIndex + 'pagina ' + pagina);

    var id_categoria = activeIndex;

    cantServCupones = 0;

    switch (activeIndex) {
        case 1:
            cantServCuponesTotales = 1;
            categoria = "Destacados";

            break;

        case 2:
            //id_categoria = $("#Tab2").attr("data-id");
            cantServCuponesTotales = 2;
            LoadFiltrosCombo(id_categoria);
            categoria = "Gastronomía";

            break;

        case 3:
            //id_categoria = $("#Tab3").attr("data-id");

            cantServCuponesTotales = 2;
            LoadFiltrosCombo(id_categoria);
            categoria = "Shopping";
            break;

        case 4:
            //id_categoria = $("#Tab4").attr("data-id");
            cantServCuponesTotales = 2;
            LoadFiltrosCombo(id_categoria);
            categoria = "Fitness";
            break;

        case 5:
            //id_categoria = $("#Tab5").attr("data-id");
            cantServCuponesTotales = 2;
            LoadFiltrosCombo(id_categoria);
            categoria = "Servicios";
            break;

        default:

            push = "";
    }



    paginaActual = pagina;


    if (id_categoria != null) {



        $(".spinnerObtenerCupon").show();
        OcultarDvCupones(categoria);

        var param = {
            id_categoria: id_categoria,
            pagina: paginaActual,
            limite: pageSize
        }


        var objDestacados = CrearAjaxObject(uri, "cupones", "GET", param);

        LoadAjax(objDestacados, CuponesLoaded, 0, padre);
    }
    else {


        MarcarSinCupones(categoria);
        MostrarDvCupones(categoria);
        $(".spinnerObtenerCupon").hide();
    }

}

function CuponesLoaded(obj, response, categoria) {

    if (paginaActual == 1) {

        $("#listDestacados").html("");
        $("#listGastro").html("");
        $("#listShopping").html("");
        $("#listFitness").html("");
        $("#listServicios").html("");
    }

    if (obj.error == null) {


        var push = "";

        pageIndex[actual]++;


        



        $.each(response.result.data, function (i, item) {

            switch (categoria) {
                case 1:
                    push = "push-destacados";
                    break;
                case 2:
                    push = "push-gastronomia";
                    break;

                case 3:
                    push = "push-comercio";
                    break;

                case 4:
                    push = "push-fitness";
                    break;

                case 5:
                    push = "push-servicios";
                    break;

                default:
                    push = "";
            }

            if (push != "") {

                var img = "";


                if (item.imagen_cupon != null) {

                    img = pathCupones + item.imagen_cupon;
                    imgChico = pathComercios + item.imagen_cupon;

                }

                var promo = ""
                if (item.tipo != null) {
                    promo = item.tipo;
                } else if (item.descuento != 0) {
                    promo = item.descuento + "%";
                }



                //if (categoria != "Servicios") {
                if (item.tipo_cupon == "Premium" || item.tipo_cupon == "Expandido") {
                    if (item.precio > 0) {
                        if (item.descuento != 0) {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-' + item.id_cupon + '" data-src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="sale-tile"><div class="sale">obtené <br> <span class="porciento">' + promo + '</span></div></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="tachado">$' + item.precio + '</span> <br> <span class="price-ofer">$' + (item.precio - (item.precio / 100) * item.descuento) + '</span></p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        } else {
                            if (item.tipo != null) {
                                var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<div class="imagen-ficha"><img id="post-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-' + item.id_cupon + '" data-src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                    + '<div class="sale-tile"><div class="sale">obtené <br><span class="porciento">' + promo + '</span></div></div>'
                                    + '<div class="title">' + item.titulo + '</div>'
                                    + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="price-ofer">$' + item.precio + '</span></p></ons-col></ons-row></div>'
                                    + '</ons-card>');
                            } else {
                                var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<div class="imagen-ficha"><img id="post-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-' + item.id_cupon + '" data-src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                    + '<div class="title">' + item.titulo + '</div>'
                                    + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="price-ofer">$' + item.precio + '</span></p></ons-col></ons-row></div>'
                                    + '</ons-card>');
                            }
                        }



                    } else {
                        if (item.tipo != null || item.descuento != 0) {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-' + item.id_cupon + '" data-src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="sale-tile"><div class="sale">obtené <br> <span class="porciento">' + promo + '</span></div></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        } else {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-' + item.id_cupon + '" data-src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        }


                    }
                }
                else {
                    if (item.tipo_cupon == "Simple") {
                        if (item.precio > 0) {
                            if (item.descuento != 0) {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h3>' + promo + '</h3>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="tachado">$' + item.precio + '</span>   <span class="price-ofer">$' + (item.precio - (item.precio / 100) * item.descuento) + '</span></p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');
                            } else {
                                if (item.tipo != null) {
                                    var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                        + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                        + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                        + '</ons-col>'
                                        + '<ons-col>'
                                        + '<h3>' + promo + '</h3>'
                                        + '<h2>' + item.titulo + '</h2>'
                                        + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                        + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + item.precio + '</span></p>'
                                        + '</ons-col>'
                                        + '</ons-row></div></ons-card>');


                                }
                                else {
                                    var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                        + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                        + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                        + '</ons-col>'
                                        + '<ons-col>'
                                        + '<h2>' + item.titulo + '</h2>'
                                        + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                        + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + item.precio + '</span></p>'
                                        + '</ons-col>'
                                        + '</ons-row></div></ons-card>');


                                }

                            }
                        } else {
                            if (item.tipo != null || item.descuento != 0) {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + promo + '</span></p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');

                            } else {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');
                            }
                        }
                    }
                    else {

                        var domicilio = item.calle.split(",")[0];

                        if (item.tipo_cupon == "Chico") {
                            if (item.abono == "Abono Anual") {


                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" class="orange">'
                                    + '<ons-col width="20%"><img class="" src="' + imgChico + '" style="width:100%;max-height: 100px;"></ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.nombre + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;"><i class="fas fa-phone-square"></i> ' + item.telefono + ' <i class="fas fa-map-marker"></i> ' + domicilio + '</p>'
                                    + '</ons-col>'
                                    + '</ons-row>'
                                    + '<div class="divider"></div></div></ons-card>');
                            } else {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" class="orange">'
                                    + '<ons-col>'
                                    + '<h2>' + item.nombre + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;"><i class="fas fa-phone-square"></i> ' + item.telefono + ' <i class="fas fa-map-marker"></i> ' + domicilio + '</p>'
                                    + '</ons-col>'
                                    + '</ons-row>'
                                    + '<div class="divider"></div></div></ons-card>');
                            }
                        } else {
                            var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" class="orange">'
                                + '<ons-col>'
                                + '<h2>' + item.nombre + '</h2>'
                                + '<p style="font-size:12px;padding-left:10px;"><i class="fas fa-phone-square"></i> ' + item.telefono + ' <i class="fas fa-map-marker"></i> ' + domicilio + '</p>'
                                + '</ons-col>'
                                + '</ons-row>'
                                + '<div class="divider"></div></div></ons-card>');

                        }


                    }

                }

                



                var listDestacados = document.querySelector('#listDestacados');
                var listGastro = document.querySelector('#listGastro');
                var listShopping = document.querySelector('#listShopping');
                var listFitness = document.querySelector('#listFitness');
                var listServicios = document.querySelector('#listServicios');

                

                switch (categoria) {
                    case 1:
                        listDestacados.appendChild(listItem);
                        break;
                    case 2:
                        listGastro.appendChild(listItem);
                        break;

                    case 3:
                        listShopping.appendChild(listItem);
                        break;

                    case 4:
                        listFitness.appendChild(listItem);
                        break;

                    case 5:
                        listServicios.appendChild(listItem);
                        break;

                    default:
                    // code block
                }

                CargarImagenes();


            }
        });

    }
    else {


        switch (obj.error) {
            case 401:
                LogOut();
                break;
            case 404:
                $(".paginador_inf").hide();
                break;
            default:
                MarcarSinCupones(categoria);
                break;
        }

    }


    $(".dvSpinner").hide();

    if (response.result.data.length >= pageSize) {
        $(".paginador_inf").show();
    }
    else {
        $(".paginador_inf").hide();
    }

    ++cantServCupones;

    
    
        console.log("spinner");

        $(".spinnerObtenerCupon").hide();
        MostrarDvCupones(categoria);

    setTimeout(function () {
       EsconderImagenDefault();
    }, 10000);

    //if (cantServCupones == cantServCuponesTotales) {

    //}

}



function SearchCupones(buscado) {

    $("#dvContenidoSearch").hide();

    var paramDestacados = {
        busqueda: buscado
    }

    $(".spinnerObtenerCupon").show();


    var buscados = CrearAjaxObject(uri, "buscarCupones", "GET", paramDestacados);

    LoadAjax(buscados, CuponesSearched);


}

function CuponesSearched(variables, cupones) {

    $("#listSearch").html("");


    if (variables.error == null) {

        var push = "";

        var listSearch = document.querySelector('#listSearch');


        $.each(cupones.result.data, function (i, item) {

            switch (item.id_categoria) {
                case "1":
                    push = "push-destacados";
                    break;
                case "2":
                    push = "push-gastronomia";
                    break;

                case "3":
                    push = "push-comercio";
                    break;

                case "4":
                    push = "push-fitness";
                    break;

                case "5":
                    push = "push-servicios";
                    break;

                default:
                    push = "";
            }

            if (push != "") {

                var img = "";


                if (item.imagen_cupon != null) {

                    img = pathCupones + item.imagen_cupon;
                    imgChico = pathComercios + item.imagen_cupon;

                }

                var promo = ""
                if (item.tipo != null) {
                    promo = item.tipo;
                } else if (item.descuento != 0) {
                    promo = item.descuento + "%";
                }



                //if (categoria != "Servicios") {
                if (item.tipo_cupon == "Premium" || item.tipo_cupon == "Expandido") {
                    if (item.precio > 0) {
                        if (item.descuento != 0) {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-search-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-search-' + item.id_cupon + '" data-src="' + img + '"  src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="sale-tile"><div class="sale">obtené <br> <span class="porciento">' + promo + '</span></div></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="tachado">$' + item.precio + '</span> <br> <span class="price-ofer">$' + (item.precio - (item.precio / 100) * item.descuento) + '</span></p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        } else {
                            if (item.tipo != null) {
                                var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<div class="imagen-ficha"><img id="post-search-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-search-' + item.id_cupon + '" data-src="' + img + '" src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                    + '<div class="sale-tile"><div class="sale">obtené <br><span class="porciento">' + promo + '</span></div></div>'
                                    + '<div class="title">' + item.titulo + '</div>'
                                    + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="price-ofer">$' + item.precio + '</span></p></ons-col></ons-row></div>'
                                    + '</ons-card>');
                            } else {
                                var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<div class="imagen-ficha"><img id="post-search-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-search-' + item.id_cupon + '" data-src="' + img + '" src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                    + '<div class="title">' + item.titulo + '</div>'
                                    + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col><ons-col style="text-align:right;line-height:15px;"><p><span class="price-ofer">$' + item.precio + '</span></p></ons-col></ons-row></div>'
                                    + '</ons-card>');
                            }
                        }



                    } else {
                        if (item.tipo != null || item.descuento != 0) {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-search-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-search-' + item.id_cupon + '" data-src="' + img + '" src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="sale-tile"><div class="sale">obtené <br> <span class="porciento">' + promo + '</span></div></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        } else {
                            var listItem = ons.createElement('<ons-card class="product-info ' + push + '" id="' + push + item.id_cupon + '"  data-id="' + item.id_cupon + '" data-name="' + item.nombre + '" data-cdEmp="' + item.id_comercio + '" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                + '<div class="imagen-ficha"><img id="post-search-' + item.id_cupon + '" class="pre-carga" src="lib/img/default.png" alt="Onsen UI" style="width: 100%"><img class="post-carga" data-id="post-search-' + item.id_cupon + '" data-src="' + img + '" src="' + img + '" alt="Onsen UI" style="width: 100%"></div>'
                                + '<div class="title">' + item.titulo + '</div>'
                                + '<div class="content"><ons-row><ons-col width="75%"><p>' + item.nombre + '</p></ons-col></ons-row></div>'
                                + '</ons-card>');
                        }


                    }
                }
                else 
                {
                    if (item.tipo_cupon == "Simple") {
                        if (item.precio > 0) {
                            if (item.descuento != 0) {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h3>' + promo + '</h3>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="tachado">$' + item.precio + '</span>   <span class="price-ofer">$' + (item.precio - (item.precio / 100) * item.descuento) + '</span></p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');
                            } else {
                                if (item.tipo != null) {
                                    var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                        + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                        + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                        + '</ons-col>'
                                        + '<ons-col>'
                                        + '<h3>' + promo + '</h3>'
                                        + '<h2>' + item.titulo + '</h2>'
                                        + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                        + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + item.precio + '</span></p>'
                                        + '</ons-col>'
                                        + '</ons-row></div></ons-card>');


                                }
                                else {
                                    var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                        + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                        + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                        + '</ons-col>'
                                        + '<ons-col>'
                                        + '<h2>' + item.titulo + '</h2>'
                                        + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                        + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + item.precio + '</span></p>'
                                        + '</ons-col>'
                                        + '</ons-row></div></ons-card>');


                                }

                            }
                        } else {
                            if (item.tipo != null || item.descuento != 0) {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '<p style="text-align:right;margin-top:-10px;margin-bottom: 0px;"><span class="price-ofer">$' + promo + '</span></p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');

                            } else {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" onclick="CuponDetalle(' + item.id_cupon + ', ' + item.id_comercio + ', \'' + item.nombre.replace(/"/g, "") + '\');">'
                                    + '<ons-col width="30%" style="flex: 0 0 30%; max-width: 30%;">'
                                    + '<img class="" src="' + img + '" style="width:100%;max-height: 100px;">'
                                    + '</ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.titulo + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;">' + item.nombre + '</p>'
                                    + '</ons-col>'
                                    + '</ons-row></div></ons-card>');
                            }
                        }
                    }
                    else {

                        var domicilio = item.calle.split(",")[0];

                        if (item.tipo_cupon == "Chico") {
                            if (item.abono == "Abono Anual") {


                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" class="orange">'
                                    + '<ons-col width="20%"><img class="" src="' + imgChico + '" style="width:100%;max-height: 100px;"></ons-col>'
                                    + '<ons-col>'
                                    + '<h2>' + item.nombre + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;"><a onclick="window.open(\'tel: '+ item.telefono +"','_blank')><i class=\"fas fa-phone-square\"></i> " +item.telefono +' <i class="fas fa-map-marker"></i> ' +domicilio + "</p>"
                                    + '</ons-col>'
                                    + '</ons-row>'
                                    + '<div class="divider"></div></div></ons-card>');
                            } else {
                                var listItem = ons.createElement('<ons-card><div><ons-row style="padding:5px;" class="orange">'
                                    + '<ons-col>'
                                    + '<h2>' + item.nombre + '</h2>'
                                    + '<p style="font-size:12px;padding-left:10px;"><a onclick="window.open(\'tel: '+ item.telefono +"','_blank')><i class=\"fas fa-phone-square\"></i> " +item.telefono +' <i class="fas fa-map-marker"></i> ' +domicilio + "</p>"
                                    + '</ons-col>'
                                    + '</ons-row>'
                                    + '<div class="divider"></div></div></ons-card>');
                            }
                        } else {
                            var listItem = ons.createElement(
                              '<ons-card><div><ons-row style="padding:5px;" class="orange">' +
                                "<ons-col>" +
                                "<h2>" +
                                item.nombre +
                                "</h2>" +
                                '<p style="font-size:12px;padding-left:10px;"><a onclick="window.open(\'tel: '+ item.telefono +"','_blank')><i class=\"fas fa-phone-square\"></i> " +item.telefono +' <i class="fas fa-map-marker"></i> ' +domicilio + "</p>" +
                                "</ons-col>" +
                                "</ons-row>" +
                                '<div class="divider"></div></div></ons-card>'
                            );

                        }


                    }
                }

            }


            listSearch.appendChild(listItem);
            CargarImagenes();


           
           
        
        });
}
    else {

    if (variables.error == 404) {
        MarcarSinCupones("Buscador");      
       
    }
}


MostrarDvCupones("Buscador");
$(".spinnerObtenerCupon").hide();


++cantServCupones;

if (cantServCupones == cantServCuponesTotales) {
    $(".spinnerObtenerCupon").hide();
}

}



function MarcarSinCupones(categoria) {
    switch (categoria) {
        case 2:
            $("#listGastro").html("<div style='text-align:center;margin-top:10px'>No se encontraton cupones.</div>");
            break;

        case 3:
            $("#listShopping").html("<div style='text-align:center;margin-top:10px'>No se encontraton cupones.</div>");
            break;

        case 4:
            $("#listFitness").html("<div style='text-align:center;margin-top:10px'>No se encontraton cupones.</div>");
            break;

        case 5:
            $("#listServicios").html("<div style='text-align:center;margin-top:10px'>No se encontraton cupones.</div>");
            break;
        case "Buscador":
            $("#listSearch").html("<div style='text-align:center;margin-top:10px'>No se encontraton cupones.</div>");
            break;
        default:
            break;
    }
}







function LoadFiltrosCombo(id_categoria) {

    var paramFiltros = {
        id_categoria: id_categoria
    }

    var objDestacados = CrearAjaxObject(uri, "categorias", "GET", paramFiltros);

    LoadAjax(objDestacados, FiltrosLoadedCombo, 1, id_categoria);

}

function FiltrosLoadedCombo(variables, result, id_categoria) {

    var list = '';
    var listPadre = '';
    var listHijas = '';

    if (variables.error == null) {

        if (result != null) {
            list += '<a href="#" onclick="ApplyFilter(' + id_categoria + ',' + id_categoria + ');"><ons-list-item>TODOS</ons-list-item></a>';
            $.each(result.result.data, function (i, item) {


                if (item.hijos.length > 0) {

                    listHijas += '<div class="expandable-content sub-cat">';



                    var cant = 0;

                    $.each(item.hijos, function (i, hijas) {
                        listHijas += '<a href="#" onclick="ApplyFilter(' + hijas.id_categoria + ',' + id_categoria + ');"><ons-list-item>' + hijas.categoria + '</ons-list-item></a>';
                        ++cant;
                    });

                    listHijas += '</div>';
                    listPadre = '';
                    if (item.hijos.length == 0) {
                        listPadre += '<div onclick="ApplyFilter(' + item.id_categoria + ',' + id_categoria + ');">' + item.categoria + '</div>';
                    }
                    else {
                        listPadre += item.categoria + ' (' + cant + ')';
                    }

                    list += '<ons-list-item expandable>' + listPadre + listHijas + '</ons-list-item>';

                } else {
                    list += '<a href="#" onclick="ApplyFilter(' + item.id_categoria + ',' + id_categoria + ');"><ons-list-item>' + item.categoria + '</ons-list-item></a>';
                }



            });

            $(".filtros").html(list);
        }
    }

    ++cantServCupones;

    //if (cantServCupones == cantServCuponesTotales) {
    $(".dvSpispinnerObtenerCuponnner").hide();
    //}

}

function ApplyFilter(id_categoria, categoria) {

    var param = {
        id_categoria: id_categoria,
        pagina: 1,
        limite: pageSize
    }

    actual = id_categoria;

    pageIndex[id_categoria] = 1;

    cantServCupones = 0;
    cantServCuponesTotales = 1;

    $(".spinnerObtenerCupon").show();
    OcultarDvCupones(categoria);

    $('.list-item--expandable').removeClass('expanded');

    var obj = CrearAjaxObject(uri, "cupones", "GET", param);

    LoadAjax(obj, CuponesLoaded, 0, categoria);

}

function MostrarDvCupones(categoria) {
    switch (categoria) {
        case 1:
            $("#dvContenidoDestacados").show();
            break;
        case 2:
            $("#dvContenidoGastro").show();
            break;

        case 3:
            $("#dvContenidoShopping").show();
            break;

        case 4:
            $("#dvContenidoFitness").show();
            break;

        case 5:
            $("#dvContenidoServicios").show();
            break;
        case "Buscador":
            $("#dvContenidoSearch").show();
            break;

        default:
            push = "";
    }
}

function OcultarDvCupones(categoria) {
    switch (categoria) {
        case 1:
            $("#dvContenidoDestacados").hide();
            break;
        case 2:
            $("#dvContenidoGastro").hide();
            break;

        case 3:
            $("#dvContenidoShopping").hide();
            break;

        case 4:
            $("#dvContenidoFitness").hide();
            break;

        case 5:
            $("#dvContenidoServicios").hide();
            break;

        default:
            push = "";
    }
}

function CargarImagenes() {
  $(".post-carga").each(function () {
    var post = $(this).data("id");
    $(this)
      .attr("src", $(this).data("src"))
      .load(function () {  
          $("#" + post).fadeOut();         
           $(this).fadeIn();
      });
  });
}

function EsconderImagenDefault(){
    $('.pre-carga').hide();
}