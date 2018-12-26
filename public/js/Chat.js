function chat(repositorio){
  // let numMensagens = firebase.database().ref('users/' + user_parceiro_key + '/talks/' + userGlobal.uid + '/numMensagens/');
  // console.log(numMensagens);
  $("#mainChat").css("display", "block");
  let main = document.querySelector('mainChat');
  let mensagemChat = document.querySelector('div.textarea');
  let formulario = document.querySelector('#formulario');
  let id_chat = repositorio.idConversa();
  mensagemChat.innerHTML = '';
  let userGlobal = repositorio.obterUsuario();
  let user_parceiro_key = repositorio.obterUserParceiroKey();

  formulario.addEventListener('submit',function(event){
     if(document.forms["formChat"]["mensagem"].value != ''){
        mensagemChat.scrollTop = mensagemChat.scrollHeight;
        event.preventDefault();
        let json = {
          name: userGlobal.displayName,
          user: userGlobal.uid,
          text: event.target.mensagem.value,
          time: getDate(),
          data: Date()
        };
        // let id_chat = repositorio.idConversa();
        // console.log("teste");
        firebase.database().ref('conversations/' + id_chat + '/messages/').push(json);
        event.target.mensagem.value = '';

        firebase.database().ref('users/' + user_parceiro_key + '/talks/' + userGlobal.uid).update({novoMensagem: 'true', lido: 'false', numMensagens: 0});
        }
    });

  firebase.database().ref('conversations/' + id_chat + '/messages/').on('child_added', function(snapshot) {
          let json = snapshot.val();
          console.log("OI");
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
          if(json.user === userGlobal.uid){
            div.classList.add("right");
          }
          else {
            div.classList.add("left");
          }
          // Replace all line breaks by <br>.
          messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
          mensagemChat.scrollTop = mensagemChat.scrollHeight;
   });
 }


var MESSAGE_TEMPLATE =
  '<div class="message-container">' +
    '<div class="message-width animated zoomIn">' +
      '<div class="message"></div>' +
      '<div class="time"></div>' +
    '</div>'+
  '</div>';

function getDate() {
  var data = new Date();
  var hora = data.getHours();
  var minutos = data.getMinutes();
  return (hora + ":" + minutos);
}
