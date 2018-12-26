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

   let dbUsuarios = firebase.database().ref('users');
   dbUsuarios.on('value', function(snapshot) {
     snapshot.val();
   });

var admin = document.getElementById('checkAdmin').value;
   $("#checkAdmin").on("click", function(){
     if(admin == 'false')
        admin = 'true';
    else
      admin = 'false';
     console.log(admin);
   });

   $('#newBtnUser').on('click', function(){
         var nome = document.getElementById('newName').value;
         var email = document.getElementById('newEmail').value;
         var password = document.getElementById('newPassword').value;

         // var photoUser = new Image();
         // photoUser.src = 'images/user.png';

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {

          firebase.database().ref('users/' + response.user.uid).set({
            uid: response.user.uid,
            displayName: nome,
            email: email,
            photoURL: 'images/user.png',
            admin: admin
            // phoneNumber: nome
          });

            alert('Usuario Criado com sucesso');
            document.getElementById("newName").value = '';
            document.getElementById("newEmail").value = '';
            document.getElementById("newPassword").value = '';

        }).catch(function (error) {
          console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/email-already-in-use')
              alert('Email já existe.');
            else if (email.length < 4)
              alert('Informe o endereço de e-mail, por favor.');
            else if(errorCode == 'auth/invalid-email')
              alert('Email inválido.')
            else if(errorCode == 'auth/weak-password' || password.length < 4)
              alert('Senha inválida.')
            else
              alert(errorMessage);
        });

}); // fim newBtnUser


  // function updateUser(nome, email){
  //
  //   firebase.auth().onAuthStateChanged(function(user) {
  //           if (user) {
  //           console.log("Houve uma autenticação.");
  //
  //
  //
  //
  //           //NÃO EXECUTA NA FUNÇÃO ABAIXO
  //           dbUsuario.on('value', function(/*snapshot*/) {
  //             console.log(email);
  //           var displayName = user.displayName;
  //             console.log(nome + "0000");
  //             user.updateProfile({
  //               displayName: nome,
  //               email: email
  //
  //             }).then(function onSucess(){
  //                 console.log('Nome atualizado');
  //             }).catch(function onError(err){
  //                 console.log('Erro ao salvar: ' + err);
  //             });
  //
  //           });
  //         } //fim if(user)
  //   });
  //
  //
  // } // fim uodateUser



});
