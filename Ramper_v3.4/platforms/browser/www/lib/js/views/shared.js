//var servicesExcluded = ['/api/User/GetRolUser','/api/Cliente/ObtenerCupon','/api/Cliente/GetCuponUsuario?id_estado=1'];


function LoadAjax(obj, callback, cache = 0, dataAdicional) {

    var parametros = "";
    var datos = null;
    var contentType = "application/json";

    if (obj.tipo == "GET" || obj.tipo == "DELETE") {

        for (var name in obj.params) {
            var value = obj.params[name];

            parametros += name + '=' + value + '&';            
        }
    }
    else {
        datos = obj.params;
        contentType = "application/x-www-form-urlencoded";
    }

    var url;

    if (parametros.length > 0) {
        parametros = parametros.substring(0, parametros.length - 1);

        url = obj.url + "?" + parametros;
    }
    else {
        url = obj.url;
    }



    var service = localStorage.getItem(url);

    var today = new Date().getTime();


    if (cache == 1 && service != null && obj.tipo != "POST" && (today - JSON.parse(service).fecha <= 3600000) && JSON.parse(service).obj.error != null) {

        objService = JSON.parse(service);

        if (typeof dataAdicional != 'undefined' && dataAdicional != null) {
            callback(objService.obj,objService.response, dataAdicional);
        } else {
            callback(objService.response);
        }


    } else {

       
            var settings = {
                "url": obj.uri + url,
                "timeout": 0,
                "method": obj.tipo,
                "headers": {
                    "Content-Type": contentType,
                    "Authorization": window.localStorage.getItem('state'),
                    "Cache-Control": "no-cache"
                },
                "data": datos
            }
       

        $.ajax(settings)
            .done(function (response) {

                if (cache == 1) {
                    setLocal(url, obj, response);
                }
                if (typeof dataAdicional != 'undefined' && dataAdicional != null) {
                    callback(obj,response, dataAdicional);
                } else {
                    callback(obj,response)
                }



            })
            .fail(function (jqXHR, textStatus, errorThrow) {
                //Mensaje("Error al consultar los datos: " + textStatus + " detalle:" +errorThrow, "danger", "Error!");
                //textStatus puede ser: null, "timeout", "error", "abort", and "parsererror"
                //Si es textStatus == �error�, en errorThrow est� el texto del HTTP Code.
                // lo que quieras hacer si hay algun error!!!
                //callback({ Error: "Error" });

                // TODO que hacemos acá?

                var obj = {
                    "error": jqXHR.status,
                    "response": jqXHR.responseJSON.error
                };

                callback(obj, null, dataAdicional);
               
            })


    }

}



function setLocal(url, obj, response) {

    var unaFecha = new Date();
    var hoy = unaFecha.getTime();

    var service =
    {
        fecha: hoy,
        obj: obj,
        response: response
    }

    localStorage.setItem(url, JSON.stringify(service));

    var services = localStorage.getItem("services");

    if (services != null) {
        services += "," + url;

    } else {
        services = url;
    }

    localStorage.setItem("services", services);

}

function CrearAjaxObject(uri, url, tipo, objParam) {

    var obj = {
        uri: uri,
        url: url,
        tipo: tipo,
        params: objParam,
        error: null,
        errorMsj: null,
        reintentos: 0
    };

    return obj;

}

