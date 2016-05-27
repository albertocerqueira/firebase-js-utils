var admin = {id: "albertocerqueira", nome: "Alberto Cerqueira"};
var lista = new Firebase('https://chat-test-utils.firebaseIO.com/chat/usuarios/');

jQuery.chatPainel = (function(usuario) {
	var Class = (function(usuario) {
        var chat = new Firebase('https://chat-test-utils.firebaseIO.com/chat/mensagens/' + usuario.id + '/');
        
        this.init = (function() {
            $('.msg-wrap')[0].scrollTop = $('.msg-wrap')[0].scrollHeight;
            
            $('textarea').keypress(function (e) {
                if (e.keyCode == 13) {
                    _self.gravarMensagem(this.value);
                    return false;
                }
            });
            
            $("#send-message").click(function() {
                var mensagem = $("textarea").val();
                _self.gravarMensagem(mensagem);
            });
            
            chat.on('child_added', function(snap) {
                var mensagem = snap.val();
                
                _self.mostrarMensagem(mensagem, DateUtils.time({timestamp: mensagem.timestamp}), {id: mensagem.id, nome: mensagem.usuario.nome});
            });
            
            lista.on('child_added', function(snap) {
                var usuario = snap.val();
                
                var user = '<div class="media conversation" data-id="' + usuario.id + '">' +
                           '<a class="pull-left" href="?' + usuario.id + '=' + usuario.nome + '">' +
                           '<img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACqUlEQVR4Xu2Y60tiURTFl48STFJMwkQjUTDtixq+Av93P6iBJFTgg1JL8QWBGT4QfDX7gDIyNE3nEBO6D0Rh9+5z9rprr19dTa/XW2KHl4YFYAfwCHAG7HAGgkOQKcAUYAowBZgCO6wAY5AxyBhkDDIGdxgC/M8QY5AxyBhkDDIGGYM7rIAyBgeDAYrFIkajEYxGIwKBAA4PDzckpd+322243W54PJ5P5f6Omh9tqiTAfD5HNpuFVqvFyckJms0m9vf3EY/H1/u9vb0hn89jsVj8kwDfUfNviisJ8PLygru7O4TDYVgsFtDh9Xo9NBrNes9cLgeTybThgKenJ1SrVXGf1WoVDup2u4jFYhiPx1I1P7XVBxcoCVCr1UBfTqcTrVYLe3t7OD8/x/HxsdiOPqNGo9Eo0un02gHkBhJmuVzC7/fj5uYGXq8XZ2dnop5Mzf8iwMPDAxqNBmw2GxwOBx4fHzGdTpFMJkVzNB7UGAmSSqU2RoDmnETQ6XQiOyKRiHCOSk0ZEZQcUKlU8Pz8LA5vNptRr9eFCJQBFHq//szG5eWlGA1ywOnpqQhBapoWPfl+vw+fzweXyyU+U635VRGUBOh0OigUCggGg8IFK/teXV3h/v4ew+Hwj/OQU4gUq/w4ODgQrkkkEmKEVGp+tXm6XkkAOngmk4HBYBAjQA6gEKRmyOL05GnR99vbW9jtdjEGdP319bUIR8oA+pnG5OLiQoghU5OElFlKAtCGr6+vKJfLmEwm64aosd/XbDbbyIBSqSSeNKU+HXzlnFAohKOjI6maMs0rO0B20590n7IDflIzMmdhAfiNEL8R4jdC/EZIJj235R6mAFOAKcAUYApsS6LL9MEUYAowBZgCTAGZ9NyWe5gCTAGmAFOAKbAtiS7TB1Ng1ynwDkxRe58vH3FfAAAAAElFTkSuQmCC" />' +
                           '</a>' +
                           '<div class="media-body">' +
                           '<a class="pull-left ' + ((usuario.visualizado) ? 'visualizado' : '') + '" href="?' + usuario.id + '=' + usuario.nome + '">' +
                           '<h5 class="media-heading">' + usuario.nome + '</h5>' +
                           '<small>' + usuario.mensagem + '</small>' +
                           '</a>' +
                           '</div>' +
                           '</div>';
                    
                $('.conversation-wrap').prepend(user);
                $('.conversation-wrap')[0].scrollTop = 0;
            });
            
            lista.on('child_changed', function(snap, prevChildKey) {
                var usuario = snap.val();
                
                $(".conversation-wrap div").each(function(i) {
                    var id = $(this).attr("data-id");
                    if (usuario.id == id) {
                        $(this).find(".media-body a small").empty().append(usuario.mensagem);
                        if ($(this).find(".media-body a").hasClass("visualizado")) {
                            $(this).find(".media-body a").removeClass("visualizado");
                        }
                        
                        $(this).prependTo($(".conversation-wrap"));
                    }
                });
            });
        });
        
        this.gravarMensagem = (function(mensagem) {
            Mensagem.inserir({ firebase: chat, mensagem: mensagem, usuario: admin });
        });
        
        this.mostrarMensagem = (function (mensagem, time, usuario) {
            var msg = '<div class="media msg" data-uuid="' + mensagem.uuid + '">' +
                    '<a class="pull-left" href="#">' +
                        '<img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 32px; height: 32px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACqUlEQVR4Xu2Y60tiURTFl48STFJMwkQjUTDtixq+Av93P6iBJFTgg1JL8QWBGT4QfDX7gDIyNE3nEBO6D0Rh9+5z9rprr19dTa/XW2KHl4YFYAfwCHAG7HAGgkOQKcAUYAowBZgCO6wAY5AxyBhkDDIGdxgC/M8QY5AxyBhkDDIGGYM7rIAyBgeDAYrFIkajEYxGIwKBAA4PDzckpd+322243W54PJ5P5f6Omh9tqiTAfD5HNpuFVqvFyckJms0m9vf3EY/H1/u9vb0hn89jsVj8kwDfUfNviisJ8PLygru7O4TDYVgsFtDh9Xo9NBrNes9cLgeTybThgKenJ1SrVXGf1WoVDup2u4jFYhiPx1I1P7XVBxcoCVCr1UBfTqcTrVYLe3t7OD8/x/HxsdiOPqNGo9Eo0un02gHkBhJmuVzC7/fj5uYGXq8XZ2dnop5Mzf8iwMPDAxqNBmw2GxwOBx4fHzGdTpFMJkVzNB7UGAmSSqU2RoDmnETQ6XQiOyKRiHCOSk0ZEZQcUKlU8Pz8LA5vNptRr9eFCJQBFHq//szG5eWlGA1ywOnpqQhBapoWPfl+vw+fzweXyyU+U635VRGUBOh0OigUCggGg8IFK/teXV3h/v4ew+Hwj/OQU4gUq/w4ODgQrkkkEmKEVGp+tXm6XkkAOngmk4HBYBAjQA6gEKRmyOL05GnR99vbW9jtdjEGdP319bUIR8oA+pnG5OLiQoghU5OElFlKAtCGr6+vKJfLmEwm64aosd/XbDbbyIBSqSSeNKU+HXzlnFAohKOjI6maMs0rO0B20590n7IDflIzMmdhAfiNEL8R4jdC/EZIJj235R6mAFOAKcAUYApsS6LL9MEUYAowBZgCTAGZ9NyWe5gCTAGmAFOAKbAtiS7TB1Ng1ynwDkxRe58vH3FfAAAAAElFTkSuQmCC">' +
                        '</a>' +
                        '<div class="media-body">' +
                            '<small class="pull-right time"><i class="fa fa-clock-o"></i> ' + time + '</small>' +
                            '<h5 class="media-heading">' + usuario.nome + '</h5>' +
                            '<small class="col-lg-10">' + mensagem.mensagem + '</small>' +
                        '</div>' +
                    '</div>';
            
            $('.msg-wrap').append(msg);
            $('.msg-wrap')[0].scrollTop = $('.msg-wrap')[0].scrollHeight;
    
            $("textarea").val("");
        });
        
        var _self = this;
    });
    
    return new Class(usuario);
});

var usuario = document.location.search;
if (usuario != null && usuario != "") {
    usuario = usuario.replace("?", "").split("=");
    Mensagem.atualizarUsuarioNaLista({ firebase: lista, usuario: {id: usuario[0], nome: decodeURI(usuario[1])}, mensagem: "", visualizado: true });
} else {
    usuario = ["user-default", "User Default"];
}
var chatPainel = $.chatPainel({id : usuario[0], nome: usuario[1]});
chatPainel.init();