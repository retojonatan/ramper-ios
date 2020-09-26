 
var ultimoCupon = "";
let scanner = new Instascan.Scanner({
  video: document.getElementById("video-preview"),
});

function readBardCode() { 
 
  scanner.addListener("scan", function (content) {
    if (ultimoCupon == "" || ultimoCupon != content) {
      ultimoCupon = content;

      ons.notification.toast("Escaneando el Cupón n°" + content, {
        timeout: 4000,
      });

      ServicioCupon(content);
      cerrarQR();
    }
  });

  Instascan.Camera.getCameras().then(function(cameras){
    if (cameras.length > 0) {          
      scanner.start(cameras[cameras.length - 1]);
      showModalQR();      
    } else {
      ons.notification.toast("No hay una camara en el dispositivo.", {
        timeout: 4000,
      });
    }
  });

  

  
}

function ServicioCupon(qr) {
    var param = {
      qr: qr,
      estado: 2,
    };


    var settings = {
      url: uri + "canjearCupon",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: window.localStorage.getItem("stateComercio"),
        "Cache-Control": "no-cache",
      },
      data: param,
    };

    $.ajax(settings)
    .done(function (response) {
      CuponCanjeado();
    })
    .fail(function (response) {
      ons.notification.toast(
        "No se puede canjear el cupón, compruebe que el QR es correcto.",
        {
          timeout: 4000,
        }
      );
    });



   
    
}



function CuponCanjeado() { 

    ons.notification.toast("El Cupón se escaneo CORRECTAMENTE!", {
      timeout: 4000,
    });    

  ultimoCupon = "";
}



function RequestPermitionCamera() {

  var permissions = cordova.plugins.permissions;


  permissions.checkPermission("android.permission.CAMERA", function (status) 
  {

    if (!status.hasPermission) {     

      permissions.requestPermission(permissions.CAMERA, success, error);

    }
  }, function (err) {
    console.log(err);
  });


  

  



  function error() {
    ons.notification.toast(
      "No tiene los permisos necesarios para usar la camara.",
      {
        timeout: 4000,
      }
    );
  }

  function success(status) {
    if (!status.hasPermission)
    {
      error();
    }
    else
    {
      ons.notification.toast("Permiso correcto.", {
        timeout: 4000,
      });
    }

    
  }

}


function cerrarQR() {
  scanner.stop();
 hideModalQR();
}
