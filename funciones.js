  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKqtN-Q_zYHJbs0cHz-smhbXV1LWoWsiU",
    authDomain: "fuerzayfigura-4e0b1.firebaseapp.com",
    databaseURL: "https://fuerzayfigura-4e0b1.firebaseio.com",
    projectId: "fuerzayfigura-4e0b1",
    storageBucket: "",
    messagingSenderId: "957066033413"
  };
  firebase.initializeApp(config);
  var base = firebase.database();


// NAVEGACION ENTRE PAGINAS APP 
$(".navbar-nav a").click(function (){
  $(".navbar-nav li").removeClass("active");
  $(this).parent().addClass("active");
  var pageActive = $(this).attr("href").split("#")[1];
  navegacion(pageActive);
  $(".navbar-toggle").click();
});

function navegacion(cargarpagina){
  $(".paginaApp").addClass("hidden");
  $("#"+cargarpagina+"").removeClass("hidden");
  if (cargarpagina != "iniciarSecion"){
    $("#menu").removeClass("hidden");
  } else {
    $("#menu").addClass("hidden");
  }
}


//Insetar  grupo muscular 
$("#addMuscular").submit(function (){
  var id = base.ref().child('maq').push().key;
  var maq =  $("#maq").val();
  base.ref('maq/'+id).set({
    nombre: maq
  }, function (error){
    if (error){
      alert ("ocurio un error");
    }else{
        $("#maq").val("");
    }
  });
  return false;
});

//cargar GRUPO MUSCULAR  lista
$("#maq_ejercicio").ready(function (){
  var listaMaq = base.ref("maq");
  listaMaq.on('child_added', function (data){
    $("#maq_ejercicio").append("<option value = '"+ data.key+"' >"+data.val().nombre+"</option>");    
  });
  return false;
});

//AGREGAR NUEVO EJERCICIO
$("#nuevoEjercicio").submit(function(){

  var id = base.ref().child("ejercicios").push().key;
  base.ref("ejercicios/" + id ).set({
    nombre: $("#nombre_ejercicio").val(),
    maq_id: $("#maq_ejercicio").val(), 
    series: $("#series_ejercicio").val(),
    repeticiones : $("#repeticiones_ejercicio").val()
  }, function (ee){
      if (ee){
        alert ("error");
      }else{
        $("#nuevoEjercicio")[0].reset();
      }

  });
  return false ;
});

//* LOGIN *//
$("#login").submit(function () {
 var email = $("#email").val(), pass=$("#password").val() ;
 var login = base.ref().child('usuarios');
 login.on('child_added',  function (usuarios){
  if (usuarios.val().email == email  &&  usuarios.val().password== pass){
   if ( Cookies.set('gymuid', usuarios.key  ,{expires: 1}) ){
      console.log ("la secion se a guardad");
      getDatos(usuarios);
   } //cookie que caduca a los 5 días
    navegacion("home");


  }else {
    alert ("Usuario o contraseña incorrectos");
  }

 });
  return false;
});


//Carrar Sesion 
$("#salir").click(function (){
    Cookies.remove("gymuid");
     $("#menu").addClass("hidden");
      navegacion("iniciarSecion");
});


// INICIO DE LA PAGINA 
$(document).ready(function () {
   if (Cookies.get('gymuid') ){
      var id = Cookies.get('gymuid');
      var user;
      var usuario = base.ref("usuarios/" + id );
      usuario.on('value', function (datos){
         getDatos (datos);
      }); 
      navegacion("home");
  
   }else{
  
    navegacion("iniciarSecion");
   }
});

//* carfa los datos del usuario logeado a los campos del la app 

function getDatos (datos){
  $("#plan").html(datos.val().plan);
  $("#altura").val(datos.val().altura);
  $("#peso").val(datos.val().peso);
  $("genero").val(datos.val().genero);

  if (datos.val().lunes == true){
    $(".btn[data-dia='lunes']").addClass("active");
  }else{
     $(".btn[data-dia='lunes']").removeClass("active");
  }

  if (datos.val().martes == true){
    $(".btn[data-dia='martes']").addClass("active");
  }else{
     $(".btn[data-dia='martes']").removeClass("active");
  }

  if (datos.val().miercoles == true){
    $(".btn[data-dia='miercoles']").addClass("active");
  }else{
     $(".btn[data-dia='miercoles']").removeClass("active");
  }
  if (datos.val().jueves == true){
    $(".btn[data-dia='jueves']").addClass("active");
  }else{
     $(".btn[data-dia='jueves']").removeClass("active");
  }
 if (datos.val().viernes == true){
    $(".btn[data-dia='viernes']").addClass("active");
  }else{
     $(".btn[data-dia='viernes']").removeClass("active");
  }

   if (datos.val().sabado == true){
    $(".btn[data-dia='sabado']").addClass("active");
  }else{
     $(".btn[data-dia='sabado']").removeClass("active");
  }
    if (datos.val().domingo == true){
    $(".btn[data-dia='domingo']").addClass("active");
  }else{
     $(".btn[data-dia='domingo']").removeClass("active");
  }





  var ejercicios = base.ref().child("ejercicios");
  ejercicios.on ("child_added", function (lista){
    $("#listaEjercicios").append("<li class='list-group-item'> <span class='badge bage-info'>"+lista.val().series +" x "+lista.val().repeticiones+" </span> "+lista.val().nombre+"</li>");
  })
}
//fija la barra de navegacion al hacer scrol 
$(document).scroll(function (){
  if ($(this).scrollTop() >= 80 ){
    $("#menu").addClass("navbar-fixed-top");

  }else{
    $("#menu").removeClass("navbar-fixed-top");
  }
});

$("#configuracion:input").change(function (){
  var campo = $(this).attr("id");
  var valor =  $(this).val();
  console.log(valor);
  var update = {}
  update["usuarios/" + Cookies.get("gymuid") + "/" +campo ]= valor;
  return base.ref().update(updates);

});