const FEEDS_URL = "http://172.29.1.1:5000/"
const EMPRESAS_URL = "http://172.29.1.2:5000/"
const COMENTARIOS_URL = "http://172.29.1.3:5000/"
const LIKES_URL = "http://172.29.1.4:5000/"
const ARQUIVOS_URL = "http://172.29.1.6/"

export const acessarUrl = async (url) => {
    let promise = null;

    console.log("acessando: " + url);

    try {
        resposta = await fetch(url, { method: "GET" });
        if (resposta.ok) {
            promise = Promise.resolve(resposta.json());
        } else {
            promise = Promise.reject(resposta);
        }
    } catch (erro) {
        promise = Promise.reject(erro)
    }

    return promise;
}

export const getFeeds = async (pagina) => {
    return acessarUrl(FEEDS_URL + "feeds/" + pagina);
}

export const getFeed = async (feedId) => {
    return acessarUrl(FEEDS_URL + "feed/" + feedId);
}

export const getFeedsPorProduto = async (nomeProduto, pagina) => {
    return acessarUrl(FEEDS_URL + "feeds_por_produto/" + nomeProduto + "/" + pagina);
}

export const getFeedsPorEmpresa = async (empresaId, pagina) => {
    return acessarUrl(FEEDS_URL + "feeds_por_empresa/" + empresaId + "/" + pagina);
}

export const getFeedsPorLikes = async (usuario, pagina) => {
    let promise = null;
    
    if (usuario) {
        promise = acessarUrl(FEEDS_URL + "feeds_com_gostei/" + usuario.account + "/" + pagina);
    }

    return promise;
}

export const getEmpresas = async () => {
    return acessarUrl(EMPRESAS_URL + "empresas");
}

export const usuarioGostou = async (usuario, feedId) => {
    let promise = null;
    
    if (usuario) {
        promise = acessarUrl(LIKES_URL + "gostou/" + usuario.account + "/" + feedId);
    }

    return promise;
}

export const gostar = async (usuario, feedId) => {
    let promise = null;
    
    if (usuario) {
        promise = acessarUrl(LIKES_URL + "gostar/" + usuario.account + "/" + feedId);
    }

    return promise;
}

export const desgostar = async (usuario, feedId) => {
    let promise = null;
    
    if (usuario) {
        promise = acessarUrl(LIKES_URL + "desgostar/" + usuario.account + "/" + feedId);
    }

    return promise;
}

export const getComentarios = async (feedId, pagina) => {
    return acessarUrl(COMENTARIOS_URL + "comentarios/" + feedId + "/" + pagina);
}

export const adicionarComentario = async (usuario, feedId, comentario) => {
    let promise = null;
    
    if (usuario) {
        promise = acessarUrl(COMENTARIOS_URL + "adicionar/" + feedId + "/" + encodeURIComponent(usuario.name) + "/" + usuario.account + "/" + encodeURIComponent(comentario));
    }

    return promise;
}

export const removerComentario = async (comentarioId) => {
    return acessarUrl(COMENTARIOS_URL + "remover/" + comentarioId);
}

export const feedAlive = async () => {
    return acessarUrl(FEEDS_URL + "isalive");
}

export const empresasAlive = async () => {
    return acessarUrl(EMPRESAS_URL + "isalive");
}

export const likesAlive = async () => {
    return acessarUrl(LIKES_URL + "isalive");
}


export const comentariosAlive = async () => {
    return acessarUrl(COMENTARIOS_URL + "isalive");
}


export const getImagem = (imagem) => {
    return { uri: ARQUIVOS_URL + imagem };
}