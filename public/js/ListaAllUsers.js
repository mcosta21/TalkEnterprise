//DIV LISTAGEM DE TODOS OS USUARIOS
function usersAll(repositorio){

  let divLista = document.querySelector('main > div.listaAllUsers');
  let allUsuarios = document.querySelector('#allUsuarios');
  let myUser = repositorio.obterUsuario(); //firebase.auth().currentUser.uid;
  // console.log(myUser);
  // console.log(repositorio.obterUsuario());
  let nameMyUser = repositorio.obterNomeUser();

  divLista.innerHTML = '';
   let todosUsuarios = firebase.database().ref("users");
       todosUsuarios.once('value',function(snapshot) {

         let lista = snapshot.val();
           Object.keys(lista).forEach(function (key,index,array) {
             let nome = lista[key].displayName;
             let photo = (lista[key].photoURL === undefined) ? 'images/user.png' : lista[key].photoURL;
             let id_parceiro = key;
             let aUsuario = document.createElement('div');
             var inputChat = document.querySelector('#formulario');
             var displayContatos = document.querySelector('main .listaAllUsers');
             let divMyLista = document.querySelector('main > div.listaMyUsers');

             let nav_user_parceiro = document.querySelector('#nav_user_parceiro');
             let nav_chat = document.querySelector('#mensagemChat');
             let form = document.querySelector('#formulario');


             aUsuario.classList.add('usuario');
             aUsuario.innerHTML = `
                <img src="${photo}" />
                ${nome}
                `;
             aUsuario.addEventListener('click',function(event){
                  // repositorio.definirUserParceiroKey(key);

                  let listaLinks = document.querySelectorAll('div.listaAllUsers > div.usuario');
                  listaLinks.forEach(div => {
                      // div.style.fontWeight = "400";
                      div.style.background = "none";
                      div.style.boxShadow = "none";
                 });

                 firebase.database().ref('users/' + myUser.uid + '/talks/' + id_parceiro).update({displayName: nome, photoURL: photo, uid: key, novoMensagem: 'false', lido: 'false'});
                 firebase.database().ref('users/' + id_parceiro + '/talks/' + myUser.uid).update({displayName: nameMyUser, photoURL: photo, uid: myUser.uid, novoMensagem: 'false', lido: 'false'});

                 btn_newConversa.style.display = 'block'
                 btn_closeConversa.style.display = 'none';

                 inputChat.classList.add("effectInput");
                 displayContatos.classList.remove("effectUsers");
                 divMyLista.innerHTML = '';

                 myUsers(repositorio);
                 // chat(repositorio);
                 nav_user_parceiro.style.display = 'none';
                 nav_chat.style.display = 'none';
                 form.style.display = 'none';

                 // repositorio.definirIndice(index);
                 // if(repositorio.obterIndice() == index) {
                 //    aUsuario.style.background = "#e5e5e536";
                 //    aUsuario.style.boxShadow = "1px 1px 5px #e5e5e591";
                 // }

                 // document.getElementById('photoUserAutenticado').innerHTML = photo;
                 // document.getElementById('nomeUserAutenticado').innerHTML = nome;

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
