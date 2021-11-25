import React from "react";
import { Share } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { displayName as nomeApp } from "../../../app.json";

export default class Compartilhador extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                feed: this.props.feed
            }
        }

        compartilhar = () => {
            const { feed } = this.state;
            const mensagem = feed.product.url + "\n\n Recomendação enviada por " + nomeApp +
                " \n Baixe agora: http://play.google.com/store";

            const resultado = Share.share({
                    title: feed.product.name,
                    message: mensagem
                }
            );
        }

        render = () => {
            return(
                <Icon name="sharealt" size={28} onPress={ () => {
                    this.compartilhar();
                }}/>
            )
        }
}