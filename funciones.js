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
  $(".paginaApp").addClass("hidden");
  var pageActive = $(this).attr("href");
  $(""+pageActive+"").removeClass("hidden");
  $("#Titulo").html(pageActive.split("#")['1']);
  $(".navbar-toggle").click();
});


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




function writeUserData(userId,genero, name, peso) {
  base.ref('usuarios/' + userId).set({
    nombre: name,
    peso:peso,
    genero: genero,
    altura: 165

  });
}

