import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Toast from "react-native-simple-toast"

import {
    Avatar, 
    NomeEmpresa,
    ContenedorMenu,
    DivisorMenu, 
    EsquerdaDaMesmaLinha
} from "../../assets/styles";
import { LoginOptionsMenu } from "../../components/Login";
import { getEmpresas, getImagem } from "../../api";

export default class Menu extends React.Component {

    constructor(props) {
        super(props)

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);

        this.state = {
            atualizar: true, 
            filtrar: props.filtragem,
            usuarioMudou: props.usuarioMudou, 

            empresas: []
        }
    }

    componentDidMount = () => {
        getEmpresas().then((maisEmpresas) => {
            this.setState({
                empresas: maisEmpresas
            });
        }).catch((erro) => {
            console.error("ocorreu um erro criando menu de empresas: " + erro);
        });
    }

    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state;

        return(
            <TouchableOpacity onPress={() => {
                filtrar(empresa);
            }}>
                <DivisorMenu />
                <EsquerdaDaMesmaLinha>
                    <Avatar source={getImagem(empresa.avatar)} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
            </TouchableOpacity>
        );
    }

    onLogin = (usuario) => {
        const { usuarioMudou } = this.state;

        this.setState({
            atualizar: true
        }, () => {
            Toast.show("Você foi conectado com sucesso com sua conta " + usuario.signer,
                Toast.LONG);

            if (usuarioMudou) {
                usuarioMudou();
            }
        });
    }

    onLogout = () => {
        const { usuarioMudou } = this.state;

        this.setState({
            atualizar: true
        }, () => {
            Toast.show("Você foi deconectado com sucesso");
            if (usuarioMudou) {
                usuarioMudou();
            }
        });
    }

    render = () => {
        const {empresas} = this.state;

        return(
            <SafeAreaInsetsContext.Consumer>
                {insets => 
                    <ScrollView style={{ paddingTop: insets.top }}>
                        <LoginOptionsMenu onLogin={this.onLogin} onLogout={this.onLogout}/>
                        <ContenedorMenu>
                            {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                        </ContenedorMenu>
                    </ScrollView>
                }
            </SafeAreaInsetsContext.Consumer>
        );
    }

}