var usuario = {id : "user", nome: "User"}; // TODO: aqui será trocado os dados do usuário

var lista = new Firebase('https://chat-test-utils.firebaseIO.com/chat/usuarios/');
var chat = new Firebase('https://chat-test-utils.firebaseIO.com/chat/mensagens/' + usuario.id + '/');

$(document).ready(function() {
    $('.msg_container_base')[0].scrollTop = $('.msg_container_base')[0].scrollHeight;
    
    $('.chat_input').keypress(function (e) {
        if (e.keyCode == 13) {
            gravarMensagem(this.value);
            return false;
        }
    });
    
    $("#btn-chat").click(function() {
        var mensagem = $(".chat_input").val();
        gravarMensagem(mensagem);
    });
    
    var gravarMensagem = (function(mensagem) {
        Mensagem.inserir({ firebase: chat, mensagem: mensagem, usuario: usuario });
        Mensagem.atualizarUsuarioNaLista({ firebase: lista, mensagem: mensagem, usuario: usuario });
    });
    
    var mostrarMensagem = (function(msg) {
        $('.msg_container_base').append(msg);
        $('.msg_container_base')[0].scrollTop = $('.msg_container_base')[0].scrollHeight;

        $(".chat_input").val("");
    });
    
    chat.on('child_added', function(snap) {
        var mensagem = snap.val();
        
        var msg = null;
        if (mensagem.usuario.id == usuario.id) {
            var msg = '<div class="row msg_container base_sent" data-uuid="' + mensagem.uuid + '">' +
                                    '<div class="col-md-10 col-xs-10 ">' +
                                        '<div class="messages msg_sent">' +
                                            '<p>' + mensagem.mensagem + '</p>' +
                                            '<time datetime="2009-11-13T20:00">' + DateUtils.time({timestamp: mensagem.timestamp}) + '</time>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-md-2 col-xs-2 avatar">' +
                                        '<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">' +
                                    '</div>' +
                                '</div>';
        } else {
            msg = '<div class="row msg_container base_receive" data-uuid="' + mensagem.uuid + '">' +
                            '<div class="col-md-2 col-xs-2 avatar">' +
                                '<img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">' +
                            '</div>' +
                            '<div class="col-xs-10 col-md-10">' +
                                '<div class="messages msg_receive">' +
                                    '<p>' + mensagem.mensagem + '</p>' +
                                    '<time datetime="2009-11-13T20:00">' + DateUtils.time({timestamp: mensagem.timestamp}) + '</time>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        }

        mostrarMensagem(msg);
    });
});