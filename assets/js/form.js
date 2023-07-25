var buttonEnviar = document.getElementById("enviar_form");
var campoNome = document.getElementById("campo_nome");
var campoMensagem = document.getElementById("campo_mensagem");

var campoEmail = document.getElementById("campo_email");
var campoSenha = document.getElementById("campo_senha");
var entrarForm = document.getElementById("entrar_form");

buttonEnviar.addEventListener("click", function(){
    if(campoNome.value != '' && campoMensagem.value != '') {
        alert("Mensagem enviada com sucesso!");
    }
}, false);


entrarForm.addEventListener("click", function(e){
    if(campoEmail.value != 'admin@admin.com' || campoSenha.value != 'admin') {
        alert('E-mail ou senha errados');
        e.preventDefault();
    } else {
        localStorage.setItem('email', 'admin@admin.com');
        localStorage.setItem('senha', 'admin');
    }
}, false);

