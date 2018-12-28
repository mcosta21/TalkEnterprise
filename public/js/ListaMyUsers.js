
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
          // if (lista != null) {
          Object.keys(lista).forEach(function (key,index,array) {

            let nome = lista[key].displayName;
            let photo = (lista[key].photoURL === undefined) ? 'images/user.png' : lista[key].photoURL;
            let id_parceiro = key;
            var inputChat = document.querySelector('#formulario');
            // let online = firebase.database().ref("users/" + lista[key].uid);
            let aUsuario = document.createElement('div');
            aUsuario.classList.add('usuario');
            // aUsuario.href = '#';
            aUsuario.innerHTML = `
                <input type="hidden" value="${id_parceiro}" />
                <img src="${photo}" />
                ${nome}
                <span class="badge badge-pill badge-primary spanNova" style="display: none">Novo</span>
               `;

            aUsuario.addEventListener('click',function(event){
                repositorio.definirLogout();
                repositorio.definirIndice(index);
                if (repositorio.bloquearCliqueParceiro() == id_parceiro) {
                  console.log("teste");
                  return;
                }
                let listaLinks = document.querySelectorAll('div.listaMyUsers > div.usuario');
                listaLinks.forEach(div => {
                    div.style.background = "none";
                    div.style.boxShadow = "none";
               });

                if(repositorio.obterIndice() == index) {
                  repositorio.obterParceiro(id_parceiro);
                  aUsuario.style.background = "#e5e5e591";
                  aUsuario.style.boxShadow = "1px 1px 5px #e5e5e591";
                  // // TROCA SPAM TEXT POR NOME DE USUARIO AUTENTICADO
                  document.getElementById('photoUserAutenticado').innerHTML = photo;
                  document.getElementById('nomeUserAutenticado').innerHTML = nome;
                  repositorio.definirUserParceiroKey(key);
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
        // }

      });

      let usuariosLogados = firebase.database().ref("users/");
      usuariosLogados.on("value",function(snapshot){
          let lista = snapshot.val();
          // if (lista != null) {
          Object.keys(lista).forEach(function (key,index,array) {
            console.log(lista[key]);
            let estaConectado = lista[key].connected;
            let id = key;
            let elemento = document.querySelector('input[value=' + key + ']');

            if (estaConectado == 'true') {
                if (elemento != null) {
                  elemento.parentNode.classList.remove("statusOffline");
                  elemento.parentNode.classList.add("statusOnline");
                }
              }
              else{
                  if (elemento != null) {
                    elemento.parentNode.classList.remove("statusOnline");
                    elemento.parentNode.classList.add("statusOffline");

                  }
              }
          });
        // }
      });

      repositorio.obterMinhasConversas().on("value",function(snapshot){
          let lista = snapshot.val();
          // if (lista != null) {
          Object.keys(lista).forEach(function (key,index,array) {
            let elemento = document.querySelector('input[value=' + key + ']');
            if(repositorio.obterIndice() != index) {
                if (lista[key].novoMensagem == 'true') { elemento.parentNode.classList.add("spanNovaMensagem"); }
            }
            elemento.parentNode.addEventListener('click',function(event){
              repositorio.obterConversa(key).update({novoMensagem: 'false', lido: 'true', numMensagens: 0});
              elemento.parentNode.classList.remove("spanNovaMensagem");
            });
          });
        // }
      });

 }
