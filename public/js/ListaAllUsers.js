//DIV LISTAGEM DE TODOS OS USUARIOS
function usersAll(repositorio){

  let divLista = document.querySelector('main > div.listaAllUsers');
  let allUsuarios = document.querySelector('#allUsuarios');
  let myUser = repositorio.obterUsuarioGlobal(); //firebase.auth().currentUser.uid;
  // console.log(myUser);
  // console.log(repositorio.obterUsuario());
  let nameMyUser = repositorio.obterNomeUser();

  divLista.innerHTML = '';
   let todosUsuarios = firebase.database().ref("users");
       todosUsuarios.on('value',function(snapshot) {

         let lista = snapshot.val();
           Object.keys(lista).forEach(function (key,index,array) {
             let nome = lista[key].displayName;
             let photo = (lista[key].photoURL === undefined) ? 'images/user.png' : lista[key].photoURL;
             let id_parceiro = key;
             let aUsuario = document.createElement('div');
             var inputChat = document.querySelector('#formulario');
             var displayContatos = document.querySelector('main .listaAllUsers');
             let divMyLista = document.querySelector('main > div.listaMyUsers');

             // let userGlobal = repositorio.obterUsuario();
             // let repositorio = new Repositorio();
             aUsuario.classList.add('usuario');
             // aUsuario.href = '#';
             aUsuario.innerHTML = `
                <img src="${photo}" />
                ${nome}
                `;
             aUsuario.addEventListener('click',function(event){
                  let listaLinks = document.querySelectorAll('div.listaAllUsers > div.usuario');
                  listaLinks.forEach(div => {
                      // div.style.fontWeight = "400";
                      div.style.background = "none";
                      div.style.boxShadow = "none";
                 });

                 firebase.database().ref('users/' + myUser.uid + '/talks/' + id_parceiro).update({displayName: nome, photoURL: photo, uid: key, novoMensagem: 'false', lido: 'false'});
                 firebase.database().ref('users/' + id_parceiro + '/talks/' + myUser.uid).update({displayName: nameMyUser, photoURL: "myUser.photoURL", uid: myUser.uid, novoMensagem: 'false', lido: 'false'});

                 btn_newConversa.style.display = 'block'
                 btn_closeConversa.style.display = 'none';

                 inputChat.classList.add("effectInput");
                 displayContatos.classList.remove("effectUsers");
                 divMyLista.innerHTML = '';
                 // myUsers(this.repositorio);

                 repositorio.definirIndice(index);
                 if(repositorio.obterIndice() == index) {
                    aUsuario.style.background = "#e5e5e536";
                    aUsuario.style.boxShadow = "1px 1px 5px #e5e5e591";
                 }

                 document.getElementById('photoUserAutenticado').innerHTML = photo;
                 document.getElementById('nomeUserAutenticado').innerHTML = nome;

                 user_parceiro_key = key;
                 // chat();
             });
             divLista.appendChild(aUsuario);

             if(key == myUser.uid){
               aUsuario.style.display = 'none';
             }

           });
       });

    }
//------------------------------------------------------------------------------
