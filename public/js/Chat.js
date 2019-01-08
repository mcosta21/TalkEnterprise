function chat(repositorio){
  $("#mainChat").css("display", "block");
  // let main = document.querySelector('mainChat');
  let mensagemChat = document.querySelector('div.textarea');
  let formulario = document.querySelector('#formulario');
  mensagemChat.innerHTML = '';

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

        nova_mensagem.orderByChild('timestamp').startAt(Date.now()).on('value', function(snapshot) {
                var div = document.getElementById(id_chat);
                if (repositorio.obterNovoChat() == false) {
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
               }
         });


        firebase.database().ref('users/' + parceiro_key + '/talks/' + user.uid).update({novoMensagem: 'true', lido: 'false', lastMensagem: json.text});
        firebase.database().ref('users/' + user.uid + '/talks/' + parceiro_key).update({novoMensagem: 'false', lido: 'true', lastMensagem: json.text});
        }
    });
      carregarChat(repositorio);
 }

 function carregarChat(repositorio){
   $("#mainChat").css("display", "block");
   let mensagemChat = document.querySelector('div.textarea');
   mensagemChat.innerHTML = '';
   firebase.database().ref('conversations/' + repositorio.obterIdConversa() + '/messages/').on('child_added', function(snapshot) {
     // console.log("teste");
           let user = repositorio.obterUsuario();
           if (repositorio.obterNovoChat() == true) {
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
