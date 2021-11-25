import styled from "styled-components/native";

export const Avatar = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-size: 16;
    color: #59594a;
`;

export const NomeProduto = styled.Text`
    font-size: 16;
    font-weight: bold;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 14;
    color: #59594a;
`;

export const PontoProduto = styled.Text`
    font-size: 14;
    font-weight: bold;
    color: #ff0000;
`;

export const PrecoProduto = styled.Text`
    font-size: 14;
    font-weight: bold;
    color: #59594a;
`;

export const Likes = styled.Text`
    font-size: 14;
    color: #59594a;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1;
    border-radius: 8px;
`;

export const CentralizadoNaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: center;
    align-items: center;
`;

export const EsquerdaDaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Espacador = styled.View`
    flexDirection: row;
    padding: 8px;
`;

export const ContenedorMenu = styled.View`
    flex: 1;
    padding: 4px;
    font-size: 18;
    background-color: #fff;
`;

export const DivisorMenu = styled.View`
    marginVertical: 5;
    marginHorizontal: 5;

    border-bottom-width: 1;
    borderColor: #3f6ea3;
`;

export const DivisorComentario = styled.View`
    marginVertical: 5;
    marginHorizontal: 5;

    border-bottom-width: 1;
    borderColor: #3f6ea3;
`;

export const ContenedorComentarios = styled.View`
    flexDirection: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

export const ContenedorComentarioDoUsuario = styled.View`
    background-color: #ffefbd;
    border-color: #c7c7c7;
    border-width: 1;
    border-radius: 8px;
    margin-horizontal: 5px;
`;

export const ContenedorComentarioDeOutroUsuario = styled.View`
    background-color: #eff2f1;
    border-color: #c7c7c7;
    border-width: 1;
    border-radius: 8px;
    margin-horizontal: 5px;
`;

export const EspacadorComentario = styled.View`
    marginVertical: 2;
`;

export const ContenedorNovoComentario = styled.View`
    margin-top: 100;
    align-self: center;
    width: 95%;
    border-color: #7ca982;
    border-width: 1;
    border-radius: 6;
    background-color: #fffcf9;
`;

export const AutorComentario = styled.Text`
    padding: 6px;
    font-size: 16;
    color: #283044;
`;

export const Comentario = styled.Text`
    padding: 6px;
    font-size: 16;
    color: #283044;
`;

export const DataComentario = styled.Text`
    padding: 6px;
    font-size: 16;
    color: #283044;
`;

export const ContenedorMensagem = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #eff2f1;
`;

export const Mensagem = styled.Text`
    color: #283044;
`;

export const Cabecalho = {
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0
}
