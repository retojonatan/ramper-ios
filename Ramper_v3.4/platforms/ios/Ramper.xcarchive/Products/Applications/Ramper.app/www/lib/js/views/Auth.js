

var usuario;

function IniciarSesion(user, pass) {

      var param = {
      email: user,
      password: pass,
      grant_type: "password"
    }

    usuario = {
      username: user,
      passsword: pass,
      comercio: false
    }
  
  $(".spinnerObtenerCupon").show();
  $("#dvTarjetaMiCupon").hide();




  var settings = {
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


      Logon(response);

    })
    .fail(function (response) {
      $(".spinnerObtenerCupon").hide();
      ons.notification.toast(response.responseJSON.result.Message, {
        timeout: 4000
      });
    });




}

function Logon(result) {

  var date = new Date().getTime();

  window.localStorage.setItem("dateState", date);

  window.localStorage.removeItem('state');
  localStorage.setItem('state', result.result.access_token);

  window.localStorage.removeItem('usuario');
  localStorage.setItem("usuario", JSON.stringify(usuario));


  window.location.reload(true).then(function () {

    ons.notification.toast("Bienvenido " + JSON.stringify(usuario) + ".", {
      timeout: 4000
    });

  }

  );

  //appNavigator.popPage({refresh:true});
  //appNavigator.pushPage('destacados.html');

}





function Registrar() {


  if (validarRegistro()) {


    var param = {
      "nombre": $("#reg-nombre").val(),
      "apellido": $("#reg-apellido").val(),
      "email": $("#reg-email").val(),
      "password": $("#reg-pass").val()
    }

    $(".spinnerObtenerCupon").show();
    $("#dvTarjetaMiCupon").hide();

    var objHeader = CrearAjaxObject(uri, "registrarUsuario", "POST", param);

    LoadAjax(objHeader, Registered);
  }
}

function Registered(variables, result) {

  if (variables.error == null && result.status) {

    appNavigator
      .pushPage('login.html')
      .then(function () {
        ons.notification.toast("El usuario se registró correctamente.", {
          timeout: 4000
        });
      });

    //window.location.reload(true);

  }
  else {


    ons.notification.toast(result.result.Message, {
      timeout: 4000
    });


  }

}

function validarRegistro() {

  var ready = false;

  var nombre = $("#reg-nombre").val();
  var apellido = $("#reg-apellido").val();
  var email = $("#reg-email").val();
  var pass = $("#reg-pass").val();
  var confirm = $("#reg-confirm").val();


  if (nombre != "" && apellido != "" && email != "" && pass != "" && confirm != "") {
    ready = true;
  } else {
    ready = false;
    ons.notification.toast("Hay algunos campos vacios", {
      timeout: 4000
    });

  }

  if (ready) {
    if (validarEmail(email)) {
      if (validarPass(pass)) {
        if (pass == confirm) {
          if ($('#chk-terminos').is(':checked')) {
            ready = true;
          } else {
            ready = false;
            ons.notification.toast("Debe aceptar los Términos y Condiciones.", {
              timeout: 4000
            });
          }
        } else {
          ready = false;
          ons.notification.toast("El password y la confirmacion no coinciden", {
            timeout: 4000
          });
        }
      } else {
        ready = false;
        ons.notification.toast("La contraseña no respeta el formato propuesto.", {
          timeout: 4000
        });
      }
    } else {
      ready = false;
      ons.notification.toast("El email no tiene un formato valido!", {
        timeout: 4000
      });

    }
  }

  return ready;

}

function validarEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


function validarPass(pass) {
  var regex = /^[a-zA-Z0-9]{6,}$/;
  ///^(?=.\d)(?=.[az])(?=.*[AZ]).{6,20}$/
  //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  return regex.test(pass);
}


function LogOut() {
  
  window.localStorage.removeItem('dateState');
  window.localStorage.removeItem('state');
  window.localStorage.removeItem('usuario');

  window.plugins.googleplus.logout();

  facebookConnectPlugin.logout();

  window.location.reload(true);


}

function Salir() {
  var servicios = localStorage.getItem("services");
  if (servicios != null) {
    var listServicios = servicios.split(',');
    $.each(listServicios, function (i, item) {
      localStorage.removeItem(item);
    });
  }
  navigator.app.exitApp(); // Close the app
}

function Terminos() {

  //var iframe = '<iframe src="' + uri +'/Terminos/BASES_Y_CONDICIONES.pdf" style = "width:100%; height:1000px;" frameborder = "0" ></iframe >';

  $('#spinnerObtenerCupon').show();

  var iframe = '<iframe src="https://drive.google.com/viewerng/viewer?embedded=true&url=' + uri + '/Terminos/BASES_Y_CONDICIONES.pdf" style="width: -webkit-fill-available; height: -webkit-fill-available;" frameborder = "0"></iframe >'

  //var iframe = '<embed src="' + uri +'/Terminos/BASES_Y_CONDICIONES.pdf" width="100%" height="1000px" type = "application/pdf" >';

  appNavigator.pushPage('terminos.html').then(function () {

    $('#iframeTerminos').html(iframe);
    $('#spinnerObtenerCupon').hide();


  });

}

function GoogleLogin() {

  window.plugins.googleplus.login({

  },
    function (obj) {

      param = {
        "accessToken": obj.accessToken,
        "nombre": obj.displayName
      }

      $(".spinnerObtenerCupon").show();
      $("#login-ramper").hide();

      var objHeader = CrearAjaxObject(uri, "tokenGoogle", "POST", param);

      LoadAjax(objHeader, LogedGoogle,0,obj);


    },
    function (msg) {
      ons.notification.toast(msg, {
        timeout: 4000
      });

    }
  );

}

function LogedGoogle(variables, data,additionalDatta) {

  if (variables.error == null) {

    IniciarSesion(additionalDatta.email, additionalDatta.userId, "google");


  } else {


    ons.notification.toast(variables.response.Message, {
      timeout: 4000
    });
  }
}

function FacebookLogin() {
  facebookConnectPlugin.login(
    ["public_profile", "email"],
    function (result) {

      $.ajax({
        url: 'https://graph.facebook.com/' + result.authResponse.userID + '?fields=email,first_name,name&access_token=' + result.authResponse.accessToken,
        success: function (respuesta) {

          $(".spinnerObtenerCupon").show();
          $("#login-ramper").hide();

          var objHeader = CrearAjaxObject(uri, "tokenFacebook", "POST", respuesta);

          LoadAjax(objHeader, LogedFacebook);

        },
        error: function () {
          ons.notification.toast("Hubo un error, intente mas tarde.", {
            timeout: 4000
          });
        }
      });
    },
    function (result) {
      if (result.cancelled) {
        ons.notification.toast("No se completo la autenticación.", {
          timeout: 4000
        });
      } else if (result.error) {
        ons.notification.toast("Hubo un error, intente mas tarde.", {
          timeout: 4000
        });
      }
    }
  );

  

}

function LogedFacebook(variables, data) {

  if (variables.error == null) {

    IniciarSesion(data.result.data.email, data.result.data.password, "facebook");


  } else {



    ons.notification.toast(variables.response.Message, {
      timeout: 4000
    });
  }
}


function AppleLogin()
{
  window.cordova.plugins.SignInWithApple.signin(
    { requestedScopes: [0, 1] },
    function(succ){
      console.log(succ)
      alert(JSON.stringify(succ))
    },
    function(err){
      console.error(err)
      console.log(JSON.stringify(err))
    }
  )
}



function ComercianteLogin(user, pass) {
  var param = {
    email: user,
    password: pass,
    grant_type: "password",
  };

  usuarioComercio = {
    username: user,
    password: pass,
    comercio: false,
  };

  $(".spinnerObtenerCupon").show();
  $("#dvTarjetaMiCupon").hide();

  var settings = {
    url: uri + "tokenComercio",
    timeout: 0,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    data: param,
  };

  $.ajax(settings)
    .done(function (response) {
      LogonComerciante(response);
    })
    .fail(function (response) {
      $(".spinnerObtenerCupon").hide();
      ons.notification.toast(response.responseJSON.result.Message, {
        timeout: 4000,
      });
    });
}

function LogonComerciante(result) {
  var date = new Date().getTime();

  window.localStorage.setItem("dateStateComercio", date);

  window.localStorage.removeItem("stateComercio");
  localStorage.setItem("stateComercio", result.result.access_token);

  window.localStorage.removeItem("usuarioComercio");
  localStorage.setItem("usuarioComercio", JSON.stringify(usuarioComercio));

  SolicitarPermisos();  

  document
    .getElementById("appNavigator")
    .pushPage("comerciante.html")
    .then(function () {
      ons.notification.toast("Bienvenido " + usuarioComercio.username + ".", {
        timeout: 4000,
      });
    });

 
}

function ComercioLogOut() {
  window.localStorage.removeItem("dateStateComercio");
  window.localStorage.removeItem("stateComercio");
  window.localStorage.removeItem("usuarioComercio");  

  window.location.reload(true);
}




