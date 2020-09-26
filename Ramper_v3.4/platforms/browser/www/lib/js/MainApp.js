

function SetStateSpp() {



    if (localStorage.getItem("dateState") != null && localStorage.getItem('state') != null) {
        var dateState = localStorage.getItem("dateState");

        var today = new Date().getTime();

        if (today - dateState >= 3600000) {
            SetToken()

        } else {

            if (localStorage.getItem("usuario") != null) {
                cargarMenu();
            }

            setTimeout(function () {
                console.log("inicio");
                LoadCuponesData(1);
            }, 500);






        }



    } else {
        SetToken();
    }



}

function SetToken() {
    if (localStorage.getItem("usuario") != null) {

        var user = JSON.parse(localStorage.getItem("usuario"));


        var param = {
            "email": user.username,
            "password": user.passsword,
            "grant_type": "password"
        }

    } else {

        var param = {
            "email": "publico@ramper.com.ar",
            "password": "Ramper@2020",
            "grant_type": "password"
        }

    }




    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaMiCupon").hide();

    //var objHeader = CrearAjaxObject(uri, "/token", "POST", param);

    //LoadAjax(objHeader, Stated);



    var settings = {
        "async": true,
        "crossDomain": true,
        "url": uri + "token",
        "timeout": 0,
        "method": "POST",
        "headers": {            
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache"
        },
        "data": param

    }
    $.ajax(settings)
        .done(function (response) {

            var date = new Date().getTime();

            window.localStorage.setItem("dateState", date);
            window.localStorage.setItem('state', response.result.access_token);

            LoadCuponesData(1);

            if (localStorage.getItem("usuario") != null) {
                cargarMenu();
            }



        })
        .fail(function (response) {

            window.localStorage.removeItem('dateState');
            window.localStorage.removeItem('state');

            document.getElementById('appNavigator').pushPage('error.html');
        })

}



function cargarMenu() {


    if (typeof $("#menu-user").html() != 'undefined') {

        $("#menu-user").html("");
        var html = "";

        var user = JSON.parse(localStorage.getItem("usuario"));

        html += '<ons-list>';
        html += '<ons-list-item>';
        html += '<div class="center">';
        html += '<span class="list-item__title" onclick="LogOut()">CERRAR SESIÓN</span>';
        html += '<span class="list-item__subtitle">' + user.username + '</span>';
        html += '</div>';
        html += '</ons-list-item>';
        html += '</ons-list>';
        html += '<ons-list-item onclick="appNavigator.pushPage(\'mis-cupones.html\').then(function (){ GetMisCupones()});">';
        html += '<div class="left">';
        html += '<ons-icon fixed-width class="list-item__icon" icon="fa-tags"></ons-icon>';
        html += '</div>';
        html += '<div class="center">';
        html += 'Mis Cupones';
        html += '</div>';
        html += '</ons-list-item>';


        $("#menu-user").html(html);

        

    } else {
        setTimeout(function () {
            console.log("cargar menu");
            cargarMenu();
        }, 100);
    }




}

function SetTabs() {

   

    var objPadres = CrearAjaxObject(uri, "categorias", "GET");

    LoadAjax(objPadres, PadresLoaded);
}

function PadresLoaded(variables, result) {

    if (variables.error == null) {

        $.each(result, function (i, item) {
            switch (item.valor) {
                case "Gastronomía":
                    $("#Tab2").attr("data-id", item.clave);
                    break;

                case "Shopping":
                    $("#Tab3").attr("data-id", item.clave);
                    break;

                case "Fitness":
                    $("#Tab4").attr("data-id", item.clave);
                    break;

                case "Servicios":
                    $("#Tab5").attr("data-id", item.clave);
                    break;
            }
        });



    }



}

function initPages() {


    LoadCuponesData(2);
    LoadCuponesData(3);
    LoadCuponesData(4);
    LoadCuponesData(5);

}
