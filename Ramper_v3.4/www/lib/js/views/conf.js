var host = "https://ramper.com.ar/";
//var host = "http://localhost/ramper/";
//var host = "https://hostinger.ramper.com.ar/";
//var uri = "http://190.106.131.41/DESA-Ramper";
var uri = host + "api/v1/";
//var uri = "https://ramper.com.ar/beta/api/v1/";
var pathCupones = host + "/assets/backend/images/cupones/"; 
var pathComercios = host + "/assets/backend/images/comercios/"
var pathMenu = host + "/assets/backend/images/menu/"

var anterior = "";





ons.ready(function () {
    window.fn = {};

    //URI
    localStorage.setItem('uri', uri);

    

    //menu
    window.fn.toggleMenu = function () {
        document.getElementById('appSplitter').left.toggle();
    };
    window.fn.load = function (page) {
        var content = document.getElementById('content');
        var menu = document.getElementById('sidemenu');
        content.load(page)
            .then(menu.close.bind(menu));
    };
    window.fn.loadLink = function (url) {
        window.open(url, '_blank');
    };

    //PUSHPAGE
    window.fn.pushPage = function (page, anim) {
        if (anim) {
            document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
        } else {
            document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
        }
    };


    //TABBAR
    var carousel = document.addEventListener('postchange', function (event) {
        
        var id_evento = event.target.id;
        
        if (id_evento == "appTabbar"){
            $(".paginador_inf").hide();
        console.log('Changed to ' + event.activeIndex);

            actual = event.activeIndex + 1;
            pageIndex[actual] = 1;
            padre = event.activeIndex + 1;

        LoadCuponesData(event.activeIndex + 1);
           
            

        } else if (id_evento == "carouselGaleria"){
            $("#spActual").html(event.activeIndex + 1);
        }
    });

    var prev = function () {
        var filtrosGral = document.getElementById('filtros-gral');
        carousel.prev();
    };
    var next = function () {
        var filtrosGral = document.getElementById('filtros-gral');
        carousel.next();
    };
    window.fn.loadView = function (index) {
        document.getElementById('appTabbar').setActiveTab(index);
        document.getElementById('sidemenu').close();
    };

    //BACKBUTTON
    //ons.disableDeviceBackButtonHandler();
    ons.enableDeviceBackButtonHandler();

    // Set a new handler
    ons.setDefaultDeviceBackButtonListener(function (event) {
        ons.notification.confirm('¿Querés cerrar la aplicación?') // Ask for confirmation
            .then(function (index) {
                if (index === 1) {
                    // OK button
                    Salir();
                }
            });
    });

   

    
});

//MODAL


function CuponDetalle(id, id_emp, name) {

    document.querySelector('#appNavigator').pushPage('perfil-cupon.html', { data: { title: name } })
        .then(function () {
            //$('ons-page #PCupon').querySelector('ons-toolbar.center').html(name);
            $('#cuponCenter').html(name);
            $("#hShopping").html("SOBRE " + name);
            LoadCupon(id, id_emp);
        });
    
    
    //, { data: { value: id, title: name, idEmp: id_emp } });


    //page.querySelector('ons-toolbar .center').innerHTML = page.data.title;

    


}

//BUSCADOR
document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'tabbar-page') {
        page.querySelector('#buscar-button').onclick = function () {
            document.querySelector('#appNavigator').pushPage('buscar.html', { data: { title: '¿Qué buscas en Ramper?' } });
        };
    } else if (page.id === 'buscar') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
});

//MENU CARTA
function showMenu() {
    var menu = document.querySelector('.menu-carta');
    menu.show();
}
function hideMenu() {
    var menu = document.querySelector('.menu-carta');
    menu.hide();
};

//CRONOGRAMA
function showCronograma() {
    var cronograma = document.querySelector('.cronograma');
    cronograma.show();
}
function hideCronograma() {
    var cronograma = document.querySelector('.cronograma');
    cronograma.hide();
};


function showModal(id) {
    var modal = document.querySelector(id);
    modal.show();
}
function hideModal(id) {
    var modal = document.querySelector(id);
    modal.hide();
    //popPage();
};


function showModalQR() {
    var modal = document.querySelector(".qr-modal");
    modal.show();
}
function hideModalQR() {
    var modal = document.querySelector(".qr-modal");
    modal.hide();
    //popPage();
};