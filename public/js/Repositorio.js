
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
            let repositorio = new Repositorio();
            repositorio.usuario = user;
            console.log("Houve uma autenticação.");

          firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
              userGlobal = (snapshot.val() && snapshot.val()) || 'Anonymous';
              if (userGlobal.admin == 'true') {
                $("#btn_admin").css("display", "block");
              }
              // document.getElementById('photoUserAutenticado').innerHTML = userGlobal.photoURL;
              // document.getElementById('nomeUserAutenticado').innerHTML = userGlobal.displayName;
              document.getElementById('nomePerfil').innerHTML = userGlobal.displayName;
              repositorio.userName = userGlobal.displayName;
              firebase.database().ref("users/" + userGlobal.uid).update({connected: 'disponivel'});
              carregarContatos(true, repositorio);
            });
              $("#div_autenticacao").css("display", "none");
              $("#div_chat").css("display", "block");
            }//fim if(user)
     });

     var time_logout = setInterval(timeLogout, 600000);;
     function timeLogout() {
         // console.log("TIME");
         // console.log("ttt " + this.logout);
         this.logout = false;
         // console.log("wwwt " + this.logout);
         logout();
     }

     function logout(){
       if (this.logout == false) {
         console.log("sair");
         firebase.database().ref("users/" + userGlobal.uid).update({connected: 'offline'});
         firebase.auth().signOut();
         $("#div_chat").css("display", "none");
         $("#div_autenticacao").css("display", "block");
       }
     }

     Repositorio.prototype.definirLogout = function(){
       console.log("true");
        this.logout = true;
        clearInterval(time_logout);
        time_logout = setInterval(timeLogout, 600000);
     }

     Repositorio.prototype.obterLogout = function(){ return this.logout; }


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

      //CLIQUE NO BOTÃO SAIR
      $("#btn_sair").on("click", function(){
        firebase.database().ref("users/" + userGlobal.uid).update({connected: 'offline'});
        firebase.auth().signOut();
        $("#div_chat").css("display", "none");
        $("#div_autenticacao").css("display", "block");
      });

      $("#disponivel").on("click", function(){
        let dot = document.querySelector(".dot");
        dot.style.backgroundColor = "#5F96EC";
        firebase.database().ref("users/" + userGlobal.uid).update({connected: 'disponivel'});
      });

      $("#offline").on("click", function(){
        let dot = document.querySelector(".dot");
        dot.style.backgroundColor = "#D2D3D5";
        firebase.database().ref("users/" + userGlobal.uid).update({connected: 'offline'});
      });

      $("#ocupado").on("click", function(){
        let dot = document.querySelector(".dot");
        dot.style.backgroundColor = "#dc3545";
        firebase.database().ref("users/" + userGlobal.uid).update({connected: 'ocupado'});
      });

      $("#ausente").on("click", function(){
        let dot = document.querySelector(".dot");
        dot.style.backgroundColor = "#ffc107";
        firebase.database().ref("users/" + userGlobal.uid).update({connected: 'ausente'});
      });

   // -------------------------------------------------------------

  });

    function Repositorio() {
      this.usuario = undefined;
      this.userName = undefined;
      this.indice = undefined;
      this.parceiro_key = undefined;
      this.idchat = undefined;
      this.chatAberto = false;
      this.logout = false;
      this.novo_chat = false;
    }

    // ------------------------------------------------------

    Repositorio.prototype.obterMinhasConversas = function() {
        return firebase.database().ref("users/" + this.usuario.uid + "/talks/");
    }

    Repositorio.prototype.obterConversa = function(key) {
        return firebase.database().ref("users/" + this.usuario.uid + "/talks/" + key);
    }

    // -------------------------------------------------------------------------

    Repositorio.prototype.definirUsuario = function(usuario) { this.usuario = usuario; }

    Repositorio.prototype.obterUsuario = function() { return this.usuario; }

    Repositorio.prototype.obterNomeUser = function () { return this.userName; }

    Repositorio.prototype.definirParceiro = function(key){ this.parceiro_key = key}

    Repositorio.prototype.obterParceiro = function() {  return this.parceiro_key;  }

    Repositorio.prototype.definirIdConversa = function() {
      let userDesordenado = [];
      if(userDesordenado.length == 0){
        userDesordenado = [this.usuario.uid, this.parceiro_key].sort();
         id_chat = userDesordenado[0] + '-' + userDesordenado[1];
      }
      this.idchat = id_chat;
    }

    Repositorio.prototype.obterIdConversa = function(){ return this.idchat; }

    Repositorio.prototype.definirIndice = function(indice) { this.indice = indice; }

    Repositorio.prototype.obterIndice = function() { return this.indice; }

    // Repositorio.prototype.bloquearCliqueParceiro = function() { return this.key; }

    Repositorio.prototype.definitChatAberto = function(bool){
        this.chatAberto = bool;
    }

    Repositorio.prototype.obterChatAberto = function(){return this.chatAberto;}


    Repositorio.prototype.definirNovoChat = function(bool){
      this.novo_chat = bool;
    }

    Repositorio.prototype.obterNovoChat = function(){
      return this.novo_chat;
    }


    // Repositorio.prototype.abrirNovoChat = function(user){
    //
    //     $("#mainChat").css("display", "block");
    //     let mensagemChat = document.querySelector('div.textarea');
    //     mensagemChat.innerHTML = '';
    //     firebase.database().ref('conversations/' + this.idchat + '/messages/').limitToLast(15).on('child_added', function(snapshot) {
    //             // let user = this.usuario;
    //             let json = snapshot.val();
    //             var div = document.getElementById(id_chat);
    //             if (this.novo_chat == true) {
    //                if (!div) {
    //                   var conteudoChat = document.createElement("div");
    //                   conteudoChat.innerHTML = MESSAGE_TEMPLATE;
    //                   div = conteudoChat.firstChild;
    //                   mensagemChat.appendChild(div);
    //                }
    //
    //               div.querySelector('.time').textContent = json.time;
    //               var messageElement = div.querySelector('.message');
    //               messageElement.textContent = json.text;
    //               console.log(user + "uuuuu");
    //               if(json.user === user.uid){
    //                 div.classList.add("right");
    //               }
    //               else {
    //                 div.classList.add("left");
    //               }
    //               messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    //               mensagemChat.scrollTop = mensagemChat.scrollHeight;
    //               this.novo_chat = false;
    //           }
    //      });
    // }
