function chat(repositorio){
  $("#mainChat").css("display", "block");
  // let main = document.querySelector('mainChat');
  let mensagemChat = document.querySelector('div.textarea');
  let formulario = document.querySelector('#formulario');
  mensagemChat.innerHTML = '';
  let chat_id = repositorio.obterIdConversa();

  let teste = 1;

  formulario.addEventListener('submit',function(event){
    let user = repositorio.obterUsuario();
    let parceiro_key = repositorio.obterParceiro();
    let nova_mensagem = firebase.database().ref('conversations/' + repositorio.obterIdConversa() + '/messages/');

     if(document.forms["formChat"]["mensagem"].value != ''){
       repositorio.definirNovoChat(false);

        mensagemChat.scrollTop = mensagemChat.scrollHeight;
        event.preventDefault();
        let json = {
          name: user.displayName,
          user: user.uid,
          text: event.target.mensagem.value,
          time: getDate(),
          data: Date()
        };
        // let id_chat = repositorio.idConversa();
        // console.log("teste");
        // console.log(user.uid + " ---- user");
        // console.log(parceiro_key + " ---- parceiro");

        nova_mensagem.push(json);
        event.target.mensagem.value = '';

        // nova_mensagem.orderByChild('timestamp').startAt(Date.now()).on('value', function(snapshot) {
        //         var div = document.getElementById(id_chat);
        //         if (repositorio.obterNovoChat() == false) {
        //            if (!div) {
        //               var conteudoChat = document.createElement("div");
        //               conteudoChat.innerHTML = MESSAGE_TEMPLATE;
        //               div = conteudoChat.firstChild;
        //               mensagemChat.appendChild(div);
        //            }
        //           div.querySelector('.time').textContent = json.time;
        //           var messageElement = div.querySelector('.message');
        //           messageElement.textContent = json.text;
        //           if(json.user === user.uid){
        //             div.classList.add("right");
        //           }
        //           else {
        //             div.classList.add("left");
        //           }
        //           messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
        //           mensagemChat.scrollTop = mensagemChat.scrollHeight;
        //        }
        //  });

        firebase.database().ref('users/' + parceiro_key + '/talks/' + user.uid).update({novoMensagem: 'true', lido: 'false', lastMensagem: json.text});
        firebase.database().ref('users/' + user.uid + '/talks/' + parceiro_key).update({novoMensagem: 'false', lido: 'true', lastMensagem: json.text});

        // if (repositorio.obterteste1() == 1) {
        //   console.log(repositorio.obterteste1() + "ooooo");
        //   repositorio.definirteste1();
        //   console.log(repositorio.obterteste1() + "ooooo");
        //   novasMensagens(repositorio);
        // }

        }
    });

    // if (repositorio.obterNovoChat() == false) {
    //   // console.log(repositorio.obterteste1() + "ooooo");
    //   // repositorio.definirteste1();
    //   // console.log(repositorio.obterteste1() + "ooooo");
    //   console.log(teste + "fdfsdff");
    //   novasMensagens(repositorio);
    // }
    // console.log(teste + "yuyuy");
    // if (teste = true) {
    //   console.log("nova");
    //   novasMensagens(repositorio);
    // }

      carregarChat(repositorio, chat_id);




      // console.log(teste);

 }

 function carregarChat(repositorio, chat_id){
   $("#mainChat").css("display", "block");
   let mensagemChat = document.querySelector('div.textarea');
   mensagemChat.innerHTML = '';

   firebase.database().ref('conversations/' + repositorio.obterIdConversa() + '/messages/').limitToLast(40).on('child_added', function(snapshot) {
          // console.log("teste");
           if (repositorio.obterNovoChat() == true && repositorio.obterIdConversa() == chat_id) {
             console.log(chat_id + "*******");
             console.log(repositorio.obterIdConversa() + "&&&&&");
             // console.log("first");
             let user = repositorio.obterUsuario();

             let json = snapshot.val();
             // console.log("yes");
             var div = document.getElementById(id_chat);

              if (!div) {
                 var conteudoChat = document.createElement("div");
                 conteudoChat.innerHTML = MESSAGE_TEMPLATE;
                 div = conteudoChat.firstChild;
                 mensagemChat.appendChild(div);
              }

             div.querySelector('.time').textContent = json.time;
             var messageElement = div.querySelector('.message');
             messageElement.textContent = json.text;
             if(json.user === user.uid){
               div.classList.add("right");
             }
             else {
               div.classList.add("left");
             }
             messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
             mensagemChat.scrollTop = mensagemChat.scrollHeight;
             // repositorio.renovarTeste1();
             // console.log(repositorio.obterteste1() + "hiuiibuibuib");

           }
           else{
             repositorio.renovarTeste1();
             // console.log(repositorio.obterteste1() + " +++++");

             novasMensagens(repositorio);
           }
           // else if(repositorio.obterNovoChat() == false && repositorio.obterteste1() == 1){
           //   console.log(repositorio.obterteste1() + " -----------");
           //
           //   console.log("fdfsdff");
           //   novasMensagens(repositorio);
           //   repositorio.definirteste1();
           //   console.log(repositorio.obterteste1() + " _++++++");
           //
           // }
           // else{
           //   teste = true;
           // }
    });
    // return true;
 }

 function novasMensagens(repositorio){
   firebase.database().ref('conversations/' + repositorio.obterIdConversa() + '/messages/').endAt().limitToLast(1).once('child_added', function(snapshot) {
          if (repositorio.obterNovoChat() == false && repositorio.obterteste1() == 1) {
            // console.log("teste1323413414");

             let user = repositorio.obterUsuario();
             let json = snapshot.val();
             // console.log(repositorio.obterteste1() + " ------");

             console.log(json);
             var div = document.getElementById(id_chat);
              if (!div) {
                 var conteudoChat = document.createElement("div");
                 conteudoChat.innerHTML = MESSAGE_TEMPLATE;
                 div = conteudoChat.firstChild;
                 mensagemChat.appendChild(div);
              }
             div.querySelector('.time').textContent = json.time;
             var messageElement = div.querySelector('.message');
             messageElement.textContent = json.text;

             if(json.user === user.uid){
               div.classList.add("right");
             }
             else {
               div.classList.add("left");
             }

             messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
             mensagemChat.scrollTop = mensagemChat.scrollHeight;

             repositorio.definirteste1();
             // repositorio.definirteste1();
             // console.log(repositorio.obterteste1() + "stop");
         }
    });
 }

var MESSAGE_TEMPLATE =
  '<div class="message-container">' +
    '<div class="message-width animated zoomIn">' +
      '<ul>'+
      '<li class="message"></li>' +
      '<li class="time"></li>' +
      '</ul>' +
    '</div>'+
    '<spam class="entalhe-message animated zoomIn"></spam>'
  '</div>';

function getDate() {
  var data = new Date();
  var hora = data.getHours();
  var minutos = data.getMinutes();
  return (hora + ":" + minutos);
}
