import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

import { SliderBox } from "react-native-image-slider-box";
import CardView from "react-native-cardview";
import Icon from "react-native-vector-icons/AntDesign";
import Toast from "react-native-simple-toast";

import {
    Avatar,
    NomeProduto,
    DescricaoProduto,
    PrecoProduto,
    Likes,
    NomeEmpresa,
    CentralizadoNaMesmaLinha,
    EsquerdaDaMesmaLinha,
    Espacador,
    Cabecalho
} from "../../assets/styles";
import Compartilhador from "../../components/Compatilhador";
import { getFeed, usuarioGostou, gostar, desgostar, getImagem, likesAlive, comentariosAlive } from "../../api";
import { IsSignedIn } from "../../components/Login";

const TOTAL_IMAGENS_SLIDE = 3;

export default class Detalhes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null,

            gostou: false,
            podeGostar: false,
            podeComentar: false,
            usuario: null
        }
    }

    verificarUsuarioGostou = () => {
        const { feedId, usuario } = this.state;

        usuarioGostou(usuario, feedId).then((resultado) => {
            this.setState({ gostou: (resultado.likes > 0) });
        }).catch((erro) => {
            console.log("erro verificando se usuario gostou: " + erro);
        });
    }

    carregarFeed = () => {
        const { feedId } = this.state;

        getFeed(feedId).then((feedAtualizado) => {
            this.setState({
                feed: feedAtualizado
            }, () => {
                this.verificarUsuarioGostou();
            });
        }).catch((erro) => {
            console.error("erro atualizando o feed: " + erro);
        });
    }

    componentDidMount = () => {
        IsSignedIn().then((usuario) => {
            this.setState({
                usuario: usuario
            }).catch((erro) => {
                console.error("erro recuperando usuario logado: " + erro);
            });
        });
        
        likesAlive().then((resultado) => {
            if (resultado.alive === "yes") {
                this.setState({
                    podeGostar: true
                });
            } else {
                this.setState({
                    podeGostar: false
                }, () => {
                    Toast.show("Não é possível registrar likes agora :(", Toast.LONG);
                });
            }
        }).catch((erro) => {
            console.error("erro verificando diponibilidade de servico: " + erro);
        });

        comentariosAlive().then((resultado) => {
            if (resultado.alive === "yes") {
                this.setState({
                    podeComentar: true
                });
            } else {
                this.setState({
                    podeComentar: false
                }, () => {
                    Toast.show("Não é possível comentar sobre o produto agora :(", Toast.LONG);
                });
            }
        }).catch((erro) => {
            console.error("erro verificando diponibilidade de servico: " + erro);
        });

        this.carregarFeed();
    }

    mostrarSlides = () => {
        const { feed } = this.state;
        let slides = [];
        for (let i = 0; i < TOTAL_IMAGENS_SLIDE; i++) {
            if (feed.product.blobs[i].file) {
                slides = [...slides, getImagem(feed.product.blobs[i].file)]
            }
        }

        return (
            <SliderBox
                dotColor={"#ffad05"}
                inactiveDotColor={"#5995ed"}

                resizeMethod={"resize"}
                resizeMode={"cover"}

                dotStyle={{
                    width: 15,
                    height: 15,

                    borderRadius: 15,
                    marginHorizontal: 5
                }}

                images={slides} />
        )
    }

    like = () => {
        const { feedId, usuario } = this.state;

        gostar(usuario, feedId).then((resultado) => {
            if (resultado.situacao === "ok") {
                this.carregarFeed();
                Toast.show("Obrigado pela sua avaliação!", Toast.LONG);
            } else {
                Toast.show("Ocorreu um erro nessa operação. Tente de novo mais tarde!", Toast.LONG);
            }
        }).catch((erro) => {
            console.erro("erro registrando like: " + erro);
        })
    }

    dislike = () => {
        const { feedId, usuario } = this.state;

        desgostar(usuario, feedId).then((resultado) => {
            if (resultado.situacao === "ok") {
                this.carregarFeed();
            } else {
                Toast.show("Ocorreu um erro nessa operação. Tente de novo mais tarde!", Toast.LONG);
            }
        }).catch((erro) => {
            console.erro("erro registrando like: " + erro);
        })
    }

    render = () => {
        const { feed, gostou, podeGostar, podeComentar, usuario } = this.state;

        if (feed) {
            return (
                <>
                    <Header
                        leftComponent={
                            <Icon size={28} name="left" onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                        }

                        centerComponent={
                            <CentralizadoNaMesmaLinha>
                                <Avatar source={getImagem(feed.company.avatar)} />
                                <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                            </CentralizadoNaMesmaLinha>
                        }

                        rightComponent={
                            <CentralizadoNaMesmaLinha>
                                <Compartilhador feed={feed} />
                                <Espacador />
                                {podeGostar && gostou && usuario && <Icon name="heart" size={28} color={"#ff0000"} onPress={
                                    () => {
                                        this.dislike();
                                    }
                                } />}
                                {podeGostar && !gostou && usuario && <Icon name="hearto" size={28} color={"#ff0000"} onPress={
                                    () => {
                                        this.like();
                                    }
                                } />}
                            </CentralizadoNaMesmaLinha>
                        }

                        containerStyle={Cabecalho}
                    />
                    <CardView
                        cardElevation={2}
                        cornerRadius={0}>
                        {this.mostrarSlides()}
                        <View style={{ padding: 8 }}>
                            <Espacador />
                            <NomeProduto>{feed.product.name}</NomeProduto>
                            <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                            <Espacador />
                            <EsquerdaDaMesmaLinha>
                                <PrecoProduto>R$ {feed.product.price}  </PrecoProduto>
                                <Icon name="heart" size={18} color={"#ff0000"} />
                                <Likes> {feed.likes}</Likes>
                                <Espacador />
                                {podeComentar && usuario && <Icon name="message1" size={18} onPress={
                                    () => {
                                        this.props.navigation.navigate("Comentarios",
                                            {
                                                feedId: feed._id,
                                                empresa: feed.company,
                                                produto: feed.product
                                            })
                                    }
                                } />}
                            </EsquerdaDaMesmaLinha>
                            <Espacador />
                        </View>
                    </CardView>
                </>
            );
        } else {
            return (null);
        }
    }

}