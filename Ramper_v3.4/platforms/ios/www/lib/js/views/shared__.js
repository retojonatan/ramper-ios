function LoadAjax(obj, callback) {

    var parametros = "";
    var datos = null;

    if (obj.tipo == "GET" || obj.tipo == "DELETE") {

        for (var name in obj.params) {
            var value = obj.params[name];

            parametros += name + '=' + value + '&';
        }
    }
    else {
        datos = JSON.stringify(obj.params);
    }
    
    var url;

    if (parametros.length > 0) {
        parametros = parametros.substring(0, parametros.length - 1);

        url = obj.url + "?" + parametros;
    }
    else {
        url = obj.url;
    }

    $.ajax({
        url: obj.uri + url,
        type: obj.tipo,
        data: datos,
        contentType: "application/json; charset=utf-8",
        mimeType: "application/json",
        dataType: "json",
        async: true,
        headers: {
            "accept": "application/json",
            "authorization": "Bearer " + window.localStorage.getItem('state'),
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        beforeSend: function () {
            //$("#faceoff").fadeIn();
            //lo que quieras hacer antes del env�o
        }
    }).done(function (response) {
        // TODO: Hay que verificar que esta en estado Pendiente!
        callback(obj, response);

    }).fail(function (jqXHR, textStatus, errorThrow) {
        //Mensaje("Error al consultar los datos: " + textStatus + " detalle:" +errorThrow, "danger", "Error!");
        //textStatus puede ser: null, "timeout", "error", "abort", and "parsererror"
        //Si es textStatus == �error�, en errorThrow est� el texto del HTTP Code.
        // lo que quieras hacer si hay algun error!!!
        //callback({ Error: "Error" });
        
            // TODO que hacemos acá?

            var obj = {
                "error":jqXHR.status,
                "response":jqXHR.responseJSON
            };            

            callback(obj, null);
       
        //else if (jqXHR.status == 404) {
        //    obj.error = 404;
        //    callback(obj, null); //}
                  
                              
        
    }).always(function (response) {
        //Codigo que se ejecuta siempre
    });

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

