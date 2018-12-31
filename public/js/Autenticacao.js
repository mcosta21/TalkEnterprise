$(document).ready(function(){

//VARIAVEIS GLOBAIS
 var repositorio = new Repositorio();
        //CLIQUE NO BOTÃO ENTRAR NA CONTA
       $("#btn_autenticao").on("click", function(){

         var email = document.getElementById('email').value;
         var password = document.getElementById('password').value;
             if (email.length < 4) {
               alert('Please enter an email address.');
               return;
             }
             if (password.length < 4) {
               alert('Please enter a password.');
               return;
             }
             // Sign in with email and pass.
             // [START createwithemail]
             firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
               console.log("Falha na autenticação.");
               // console.log(error);
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               // [START_EXCLUDE]
               if (errorCode == 'auth/weak-password') {
                 alert('Senha inválida.');
               }
               else{
                   alert(errorMessage);
               }
             });
       });
//------------------------------------------------------------------------------



//------------------------------------------------------------------------------

      // $("#disponivel").on("click", function(){
      //   firebase.database().ref("users/" + repositorio.obterUsuarioGlobal()).update({connected: 'false'});
      //   firebase.auth().signOut();
      // });


}); // fim document ready






     // let divLista = document.querySelector('main > div.listaAllUsers');
     // let allUsuarios = document.querySelector('#allUsuarios');
     //
     // var displayContatos = document.querySelector('main .listaAllUsers');
     // var btn_newConversa = document.querySelector('#btn_newConversa');
     // var btn_closeConversa = document.querySelector('#btn_closeConversa');
     // var inputChat = document.querySelector('#formulario');
     //
     //
     //  //BOTAO DE ABRIR DIV DE TODOS OS USUARIOS
     //  $("#btn_newConversa").on("click", function(){
     //    UsersAll(repositorio);
     //    displayContatos.classList.add("effectUsers");
     //    btn_newConversa.style.display = "none";
     //    btn_closeConversa.style.display = 'block'
     //  });
     //
     //  //BOTAO DE FECHAR DIV DE TODOS OS USUARIOS
     //  $("#btn_closeConversa").on("click", function(){
     //    displayContatos.classList.remove("effectUsers");
     //    btn_closeConversa.style.display = 'none';
     //    btn_newConversa.style.display = 'block'
     //  });





  // function chat(){
  //   // let numMensagens = firebase.database().ref('users/' + user_parceiro_key + '/talks/' + userGlobal.uid + '/numMensagens/');
  //   // console.log(numMensagens);
  //   $("#mainChat").css("display", "block");
  //   let main = document.querySelector('mainChat');
  //   let mensagemChat = document.querySelector('div.textarea');
  //   let formulario = document.querySelector('#formulario');
  //   let id_chat = idConversa();
  //   mensagemChat.innerHTML = '';
  //
  //   formulario.addEventListener('submit',function(event){
  //      if(document.forms["formChat"]["mensagem"].value != ''){
  //         mensagemChat.scrollTop = mensagemChat.scrollHeight;
  //         event.preventDefault();
  //         let json = {
  //           name: userGlobal.displayName,
  //           user: userGlobal.uid,
  //           text: event.target.mensagem.value,
  //           time: getDate(),
  //           data: Date()
  //         };
  //         let id_chat = idConversa();
  //         firebase.database().ref('conversations/' + id_chat + '/messages/').push(json);
  //         event.target.mensagem.value = '';
  //
  //         firebase.database().ref('users/' + user_parceiro_key + '/talks/' + userGlobal.uid).update({novoMensagem: 'true', lido: 'false', numMensagens: 0});
  //         }
  //     });
  //
  //     firebase.database().ref('conversations/' + id_chat + '/messages/').on('child_added', function(snapshot) {
  //             let json = snapshot.val();
  //
  //             var div = document.getElementById(id_chat);
  //              if (!div) {
  //                 var conteudoChat = document.createElement("div");
  //                 conteudoChat.innerHTML = MESSAGE_TEMPLATE;
  //                 div = conteudoChat.firstChild;
  //                 mensagemChat.appendChild(div);
  //              }
  //
  //             div.querySelector('.time').textContent = json.time;
  //             var messageElement = div.querySelector('.message');
  //             messageElement.textContent = json.text;
  //             if(json.user === userGlobal.uid){
  //               div.classList.add("right");
  //             }
  //             else {
  //               div.classList.add("left");
  //             }
  //             // Replace all line breaks by <br>.
  //             messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  //             mensagemChat.scrollTop = mensagemChat.scrollHeight;
  //      });
  // }
  //
  // var MESSAGE_TEMPLATE =
  //   '<div class="message-container">' +
  //     '<div class="message-width animated zoomIn">' +
  //       '<div class="message"></div>' +
  //       '<div class="time"></div>' +
  //     '</div>'+
  //   '</div>';
  //
  // function getDate() {
  //   var data = new Date();
  //   var hora = data.getHours();
  //   var minutos = data.getMinutes();
  //   return (hora + ":" + minutos);
  // }
  //
  // function idConversa() {
  //   let userDesordenado = [];
  //   if(userDesordenado.length == 0){
  //     userDesordenado = [userGlobal.uid, user_parceiro_key].sort();
  //      id_chat = userDesordenado[0] + '-' + userDesordenado[1];
  //   }
  //   return id_chat;
  // }

// // Lista de usuario com conversation ---------------------------------------------------------
// let divMyLista = document.querySelector('main > div.listaMyUsers');
// let myUsuarios = document.querySelector('#myUsuarios');
//
// function myUsers(){
//
//   let myUser = repositorio.obterUsuario(); //firebase.auth().currentUser.uid;
//   let minhasConversas = firebase.database().ref("users/" + myUser.uid + "/talks");
//
//       minhasConversas.on('value',function(snapshot) {
//           divMyLista.innerHTML = '';
//         let lista = snapshot.val();
//           Object.keys(lista).forEach(function (key,index,array) {
//
//             let nome = lista[key].displayName;
//             let photo = (lista[key].photoURL === undefined) ? 'images/user.png' : lista[key].photoURL;
//             let id_parceiro = key;
//
//             // let online = firebase.database().ref("users/" + lista[key].uid);
//             let aUsuario = document.createElement('div');
//             aUsuario.classList.add('usuario');
//             // aUsuario.href = '#';
//             aUsuario.innerHTML = `
//                 <input type="hidden" value="${id_parceiro}" />
//                 <img src="${photo}" />
//                 ${nome}
//                 <span class="badge badge-pill badge-primary spanNova" style="display: none">Novo</span>
//                `;
//
//             aUsuario.addEventListener('click',function(event){
//
//                 repositorio.definirIndice(index);
//
//                 if (repositorio.bloquearCliqueParceiro() == id_parceiro) {
//                   return;
//                 }
//
//                 let listaLinks = document.querySelectorAll('div.listaMyUsers > div.usuario');
//                 listaLinks.forEach(div => {
//                     div.style.background = "none";
//                     div.style.boxShadow = "none";
//                });
//
//                 if(repositorio.obterIndice() == index) {
//                   repositorio.obterParceiro(id_parceiro);
//                   aUsuario.style.background = "#e5e5e591";
//                   aUsuario.style.boxShadow = "1px 1px 5px #e5e5e591";
//
//                   // // TROCA SPAM TEXT POR NOME DE USUARIO AUTENTICADO
//                   document.getElementById('photoUserAutenticado').innerHTML = photo;
//                   document.getElementById('nomeUserAutenticado').innerHTML = nome;
//                 }
//                   user_parceiro_key = key;
//                   chat();
//
//                 inputChat.classList.add("effectInput");
//             });
//
//             divMyLista.appendChild(aUsuario);
//             if (index == (array.length-1)) {
//               myUsuarios.style.display = 'none';
//             }
//             if(key == myUser.uid){
//               aUsuario.style.display = 'none';
//             }
//
//           });
//       });
//
//       let usuariosLogados = firebase.database().ref("users/");
//       usuariosLogados.on("value",function(snapshot){
//           let lista = snapshot.val();
//
//           Object.keys(lista).forEach(function (key,index,array) {
//             console.log(lista[key]);
//             let estaConectado = lista[key].connected;
//             let id = key;
//             let elemento = document.querySelector('input[value=' + key + ']');
//
//             if (estaConectado == 'true') {
//                 if (elemento != null) {
//                   elemento.parentNode.classList.remove("statusOffline");
//                   elemento.parentNode.classList.add("statusOnline");
//                 }
//               }
//               else{
//                   if (elemento != null) {
//                     elemento.parentNode.classList.remove("statusOnline");
//                     elemento.parentNode.classList.add("statusOffline");
//
//                   }
//               }
//           });
//       });
//
//       let novaMensagem = firebase.database().ref('users/' + myUser.uid + '/talks/');
//       novaMensagem.on("value",function(snapshot){
//           let lista = snapshot.val();
//
//           Object.keys(lista).forEach(function (key,index,array) {
//
//             let elemento = document.querySelector('input[value=' + key + ']');
//             if(repositorio.obterIndice() != index) {
//                 if (lista[key].novoMensagem == 'true') {
//                   elemento.parentNode.classList.add("spanNovaMensagem");
//                 }
//             }
//
//             elemento.parentNode.addEventListener('click',function(event){
//               firebase.database().ref('users/' + userGlobal.uid + '/talks/' + key).update({novoMensagem: 'false', lido: 'true', numMensagens: 0});
//               elemento.parentNode.classList.remove("spanNovaMensagem");
//             });
//
//           });
//       });
//  }
//
//  var teste = repositorio.obterUsuario();
//  var timeout = firebase.database().ref('users/' + userGlobal + '/talks/');
//    timeout.on("child_changed",function(snapshot){
//        let off = snapshot.val();
//        console.log("teste2");
//    });
