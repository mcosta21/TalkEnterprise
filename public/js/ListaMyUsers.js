
function myUsers (repositorio){
  // var repositorio = new Repositorio(repositorio1);

  // Lista de usuario com conversation ---------------------------------------------------------
  let divMyLista = document.querySelector('main > div.listaMyUsers');
  let myUsuarios = document.querySelector('#myUsuarios');
  let myUser = repositorio.obterUsuario(); //firebase.auth().currentUser.uid;

  // let user_parceiro_key;
      let ref = repositorio.obterMinhasConversas();
      // console.log("++ " + ref);
      ref.on('value',function(snapshot) {
        divMyLista.innerHTML = '';
        let lista = snapshot.val();
          Object.keys(lista).forEach(function (key,index,array) {
            let lastmensagem = lista[key].lastMensagem;
            console.log(lista[key]);
            let nome = lista[key].displayName;
            let photo = (lista[key].photoURL === undefined) ? 'images/user.png' : lista[key].photoURL;
            let id_parceiro = key;
            var inputChat = document.querySelector('#formulario');
            let aUsuario = document.createElement('div');
            aUsuario.classList.add('usuario');
            aUsuario.innerHTML = `
                <div class="clickChat"></div>
                <input type="hidden" value="${id_parceiro}" />
                <img src="${photo}" />
                <ul>
                  <li class="nome">${nome}</li>
                  <li class="status">teste</li>
                  <li class="mensagem">${lastmensagem}</li>
                </ul>
                <!-- <p class="nome"></p> -->
                <!-- <p class="status">2 horas atrás</p> -->
                <span class="badge badge-pill badge-primary spanNova" style="display: none">Novo</span>
               `;

            aUsuario.addEventListener('click',function(event){
                repositorio.definirLogout();
                repositorio.definirIndice(index);

                if (repositorio.bloquearCliqueParceiro() == id_parceiro) {
                  return;
                }

                let listaLinks = document.querySelectorAll('div.listaMyUsers > div.usuario > div.clickChat');
                listaLinks.forEach(div => {
                     div.style.backgroundColor = "white";
                    // div.classList.remove("clickChat");
                    // div.style.boxShadow = "none";
               });

                if(repositorio.obterIndice() == index) {
                  repositorio.obterParceiro(id_parceiro);
                  // aUsuario.style.background = "blue";
                  aUsuario.style.boxShadow = "0px 1px 27px #0b54a20f";
                  // // TROCA SPAM TEXT POR NOME DE USUARIO AUTENTICADO
                  document.getElementById('photoUserAutenticado').innerHTML = photo;
                  document.getElementById('nomeUserAutenticado').innerHTML = nome;
                  repositorio.definirUserParceiroKey(key);
                  // let teste = document.querySelector('div.listaMyUsers > div.usuario > div.clickChat');
                  // teste.style.backgroundColor = "blue";
                  aUsuario.firstElementChild.style.backgroundColor = "#5F96EC";
                  // aUsuario.firstChild.classList.add("clickChatAtual");
                }
                  // user_parceiro_key = key;
                  chat(repositorio);
                 inputChat.classList.add("effectInput");
            });

            divMyLista.appendChild(aUsuario);
            if (index == (array.length-1)) {
              myUsuarios.style.display = 'none';
            }
            if(key == myUser.uid){
              aUsuario.style.display = 'none';
            }

          });
      });

      let usuariosLogados = firebase.database().ref("users/");
      usuariosLogados.on("value",function(snapshot){
          let lista = snapshot.val();
          Object.keys(lista).forEach(function (key,index,array) {
            console.log(lista[key]);
            let statusUser = lista[key].connected;
            let id = key;
            let elemento = document.querySelector('input[value=' + key + ']');
            if (statusUser == 'disponivel') {
                if (elemento != null) {
                  elemento.parentNode.classList.remove("statusOffline");
                  elemento.parentNode.classList.remove("statusOcupado");
                  elemento.parentNode.classList.remove("statusAusente");
                  elemento.parentNode.classList.add("statusOnline");
                  let status = elemento.parentNode.getElementsByClassName("status")[0];
                  status.innerHTML = "Disponível";
                  // console.log(elemento.parentNode.getElementsByClassName("status")[0]);
                  // let teste = document.querySelector(elemento.parentNode + ' > ul > .status');
                  // console.log(teste);
                }
              }
              else if(statusUser == 'ocupado'){
                  if (elemento != null) {
                    elemento.parentNode.classList.remove("statusOffline");
                    elemento.parentNode.classList.add("statusOcupado");
                    elemento.parentNode.classList.remove("statusAusente");
                    elemento.parentNode.classList.remove("statusOnline");
                    let status = elemento.parentNode.getElementsByClassName("status")[0];
                    status.innerHTML = "Ocupado";
                  }
              }
              else if(statusUser == 'ausente'){
                  if (elemento != null) {
                    elemento.parentNode.classList.remove("statusOffline");
                    elemento.parentNode.classList.remove("statusOcupado");
                    elemento.parentNode.classList.add("statusAusente");
                    elemento.parentNode.classList.remove("statusOnline");
                    let status = elemento.parentNode.getElementsByClassName("status")[0];
                    status.innerHTML = "Ausente";
                  }
              }
              else{
                  if (elemento != null) {
                    elemento.parentNode.classList.add("statusOffline");
                    elemento.parentNode.classList.remove("statusOcupado");
                    elemento.parentNode.classList.remove("statusAusente");
                    elemento.parentNode.classList.remove("statusOnline");
                    let status = elemento.parentNode.getElementsByClassName("status")[0];
                    status.innerHTML = "Offline";
                  }
              }
          });
      });

      repositorio.obterMinhasConversas().on("value",function(snapshot){
          let lista = snapshot.val();
          Object.keys(lista).forEach(function (key,index,array) {
            let elemento = document.querySelector('input[value=' + key + ']');
            if(repositorio.obterIndice() != index) {
                if (lista[key].novoMensagem == 'true') { elemento.parentNode.classList.add("spanNovaMensagem"); }
            }
            elemento.parentNode.addEventListener('click',function(event){
              repositorio.obterConversa(key).update({novoMensagem: 'false', lido: 'true'});
              elemento.parentNode.classList.remove("spanNovaMensagem");
            });
          });
      });

 }
