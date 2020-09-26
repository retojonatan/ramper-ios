function SetComerciante()
{    
    if (
      localStorage.getItem("dateStateComercio") != null &&
      localStorage.getItem("stateComercio") != null &&
      localStorage.getItem("usuarioComercio") != null
    ) {
      var dateStateComercio = localStorage.getItem("dateStateComercio");

      var today = new Date().getTime();

      if (today - dateStateComercio >= 3600000) {
        var user = JSON.parse(localStorage.getItem("usuarioComercio"));
        ComercianteLogin(user.username, user.password);
      } else {
        document.getElementById("appNavigator").pushPage("comerciante.html");
      }
    } else {
      document
        .getElementById("appNavigator")
        .pushPage("login-comerciante.html");
    }

}

function CanjearCuponQR() { 

  SolicitarPermisos();
    readBardCode();
    
}

function SolicitarPermisos()
{

   

    RequestPermitionCamera(); 


}


function CanjearCupon() {
 
  document.getElementById("appNavigator").pushPage("canjear-cupon.html");
}