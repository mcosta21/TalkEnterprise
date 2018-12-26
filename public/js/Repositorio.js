
  $(document).ready(function(){

   var config = {
     apiKey: "AIzaSyCGWLwJZi4blzQfSGhGPe31CsyouMDF--Y",
     authDomain: "saolucastalk.firebaseapp.com",
     databaseURL: "https://saolucastalk.firebaseio.com",
     projectId: "saolucastalk",
     storageBucket: "saolucastalk.appspot.com",
     messagingSenderId: "1006700733079"
   };
   firebase.initializeApp(config);

   //AUTENTICAÇÃO DE USUARIO-------------------------------------------------------
    let userGlobal;

    firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // definirUsuario(user);
            let repositorio = new Repositorio();
            repositorio.usuario = user;
            // console.log(repositorio.usuario.uid+ "@@@@");
            console.log("Houve uma autenticação.");

          firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
              userGlobal = (snapshot.val() && snapshot.val()) || 'Anonymous';
              if (userGlobal.admin == 'true') {
                $("#btn_admin").css("display", "block");
              }
              document.getElementById('photoUserAutenticado').innerHTML = userGlobal.photoURL;
              document.getElementById('nomeUserAutenticado').innerHTML = userGlobal.displayName;
              firebase.database().ref("users/" + userGlobal.uid).update({connected: 'true'});
              carregarContatos(true, repositorio);
            });

              $("#div_autenticacao").css("display", "none");
              $("#div_chat").css("display", "block");
            }//fim if(user)
     });

    function carregarContatos(executar, repositorio){
       if (executar == true) {
         myUsers(repositorio);
         usersAll(repositorio);
       }
     }

     let divLista = document.querySelector('main > div.listaAllUsers');
     let allUsuarios = document.querySelector('#allUsuarios');
     var displayContatos = document.querySelector('main .listaAllUsers');
     var btn_newConversa = document.querySelector('#btn_newConversa');
     var btn_closeConversa = document.querySelector('#btn_closeConversa');

      //BOTAO DE ABRIR DIV DE TODOS OS USUARIOS
      $("#btn_newConversa").on("click", function(){
        displayContatos.classList.add("effectUsers");
        btn_newConversa.style.display = "none";
        btn_closeConversa.style.display = 'block'
      });

      //BOTAO DE FECHAR DIV DE TODOS OS USUARIOS
      $("#btn_closeConversa").on("click", function(){
        displayContatos.classList.remove("effectUsers");
        btn_closeConversa.style.display = 'none';
        btn_newConversa.style.display = 'block'
      });

   // -------------------------------------------------------------

  });

    function Repositorio() {
      this.usuario = undefined;
      this.indice = undefined;
      this.user_parceiro_key = undefined;
      this.chatAberto = false;
    }

    // ------------------------------------------------------

    Repositorio.prototype.definirUsuarioGlobal = function(usuario) { this.usuario = usuario; }

    Repositorio.prototype.obterUsuarioGlobal = function() { return this.usuario; }

    Repositorio.prototype.obterMinhasConversas = function() {
        return firebase.database().ref("users/" + this.usuario.uid + "/talks/");
    }

    Repositorio.prototype.obterConversa = function(key) {
        return firebase.database().ref("users/" + this.usuario.uid + "/talks/" + key);
    }

    // ------------------------------------------------------

    Repositorio.prototype.definirUsuario = function(usuario) { this.usuario = usuario; }

    Repositorio.prototype.obterUsuario = function() { return this.usuario; }

    Repositorio.prototype.definirIndice = function(indice) { this.indice = indice; }

    Repositorio.prototype.obterIndice = function() { return this.indice; }

    Repositorio.prototype.obterParceiro = function(key) { this.key = key; }

    Repositorio.prototype.bloquearCliqueParceiro = function() { return this.key; }

    Repositorio.prototype.definirUserParceiroKey = function(user_parceiro_key){ this.user_parceiro_key = user_parceiro_key}

    Repositorio.prototype.obterUserParceiroKey = function() {  return this.user_parceiro_key;  }

    Repositorio.prototype.idConversa = function() {
      let userDesordenado = [];
      if(userDesordenado.length == 0){
        userDesordenado = [this.usuario.uid, this.user_parceiro_key].sort();
         id_chat = userDesordenado[0] + '-' + userDesordenado[1];
      }
      console.log("&&&& " + id_chat );
      return id_chat;
    }

  Repositorio.prototype.definitChatAberto = function(bool){
      this.chatAberto = bool;
  }

  Repositorio.prototype.obterChatAberto = function(){return this.chatAberto;}
