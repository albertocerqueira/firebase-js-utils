var Mensagem = {
    inserir: (function(dado) {
        var uuid = Math.uuid(25, 10);
        
        dado.firebase.push({ uuid: uuid,
                             usuario: dado.usuario,
                             mensagem: dado.mensagem,
                             timestamp: Firebase.ServerValue.TIMESTAMP });
        
        dado["uuid"] = uuid;
        return dado;
    }),
    
    atualizarUsuarioNaLista: (function(dado) {
        var concluido = function(error) {
            if (error) {
                var usuario = {};
                usuario[usuario.id] = { id: dado.usuario.id, 
                                        nome: usuario.nome, 
                                        mensagem: dado.mensagem,
                                        visualizado: false };
                dado.firebase.push(usuario);
            } else {
                // console.log('synchronization succeeded');
            }
        };
        
        var usuario = {};
        usuario[dado.usuario.id] = {};
        usuario[dado.usuario.id]['id'] = dado.usuario.id;
        
        if (dado.visualizado == null) {
            usuario[dado.usuario.id]['visualizado'] = false;
        } else {
            usuario[dado.usuario.id]['visualizado'] = dado.visualizado;
        }
        
        if (dado.usuario.nome != null) {
            usuario[dado.usuario.id]['nome'] = dado.usuario.nome;
        }
        
        if (dado.mensagem != null) {
            usuario[dado.usuario.id]['mensagem'] = dado.mensagem;
        }
        
        dado.firebase.update(usuario);
    })
};