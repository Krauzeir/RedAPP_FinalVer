import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

import { GoogleSignin } from "react-native-google-signin";
import Icon from "react-native-vector-icons/AntDesign";

export const SIGNERS = {
    Google: "Google",
    Facebook: "Facebook",
    None: "None"
};

export const ERRORS = {
    NO_SIGNER: "Falha de configuração do autenticador",
    NO_SIGNED_USER: "Nenhum usuário encontrado",
    FAILED_TO_SIGNIN: "Login falhou",
    FAILED_TO_SIGOUT: "Logout falhou"
};

export const ConfigureGoogleSigner = () => {
    GoogleSignin.configure({
        webClientId: "30798704049-6thjd0pq59lolq3fud23b3okcfm9l8o4.apps.googleusercontent.com",
        offlineAccess: false
    });
}

export const FromGoogleUserToUser = (guser) => {
    const user = { name: guser.user.name, account: guser.user.email, signer: SIGNERS.Google };

    return user;
}

export const SignIn = async (signer) => {
    if (signer === SIGNERS.Google) {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();

            return Promise.resolve(signer);
        } catch (error) {
            return Promise.reject(error);
        }
    } else {
        return Promise.reject(ERRORS.NO_SIGNER);
    }
}

export const IsSignedIn = async () => {
    const isSigned = await GoogleSignin.isSignedIn();
    if (isSigned) {
        const user = await GoogleSignin.getCurrentUser();

        return Promise.resolve(FromGoogleUserToUser(user));
    } else {
        return Promise.reject(ERRORS.NO_SIGNED_USER);
    }
}

export const SignOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

        return Promise.resolve(SIGNERS.Google);
    } catch (error) {
        return Promise.reject(error);
    }
}

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signer: this.props.signer,

            onLogin: this.props.onLogin
        }
    }

    componentDidMount = () => {
        const { signer } = this.state;

        if (signer === SIGNERS.Google) {
            ConfigureGoogleSigner();
        }
    }

    getSignedUser = () => {
        const { onLogin } = this.state;

        IsSignedIn().then((user) => {
            if (onLogin) {
                onLogin(user);
            }
        }).catch((error) => {
            if (error !== ERRORS.NO_SIGNED_USER) {
                console.error(error);
            }
        });
    }

    signUserIn = () => {
        const { signer } = this.state;

        SignIn(signer).then(() => {
            this.getSignedUser();
        }).catch((error) => {
            console.error("Erro de autenticação: " + error);
        });
    }

    showGoogleSignInButton = () => {
        return (
            <Button
                icon={
                    <Icon
                        name={"google"}
                        size={22}
                        color={"#fff"}
                    />}
                title={" Login"}
                type={"solid"}

                onPress={() => { this.signUserIn() }} />);
    }

    showFacebookSignInButton = () => {
        return (
            <Button
                icon={
                    <Icon
                        name={"facebook-square"}
                        size={22}
                        color={"#fff"}
                    />}
                title={" Login"}
                type={"solid"}
                color={"030303"}

                onPress={() => { this.signUserIn() }} />);
    }

    render = () => {
        const { signer } = this.state;

        if (signer === SIGNERS.Google) {
            return this.showGoogleSignInButton();
        } else if (signer === SIGNERS.Facebook) {
            return this.showFacebookSignInButton();
        } else {
            return null;
        }
    }

}

export class Logout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onLogout: this.props.onLogout
        };
    }

    componentDidMount = () => {
        ConfigureGoogleSigner();
    }

    signUserOut = () => {
        const { onLogout } = this.state;

        SignOut().then((signer) => {
            if (onLogout) {
                onLogout(signer);
            }
        }).catch((error) => {
            console.error("Erro de autenticação. Error: " + error);
        });
    }

    render = () => {
        return (
            <Button
                icon={
                    <Icon
                        name={"logout"}
                        size={22}
                        color={"#fff"}
                    />}
                title={" Desconectar"}
                type={"solid"}
                color={"030303"}

                onPress={() => { this.signUserOut() }} />);
    }

}

export class LoginOptionsMenu extends React.Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            user: null
        };
    }

    componentDidMount = () => {
        IsSignedIn().then((signedUser) => {
            if (signedUser) {
                this.setState({
                    user: signedUser
                });
            }
        }).catch((error) => {
            if (error !== ERRORS.NO_SIGNED_USER) {
                console.log("erro recuperando usuario logado: " + error);
            }
        });
    }

    login = () => {
        const { onLogin } = this.props;
 
        this.setState({
            user: null
        });

        IsSignedIn().then((signedUser) => {
            if (signedUser) {
                this.setState({
                    user: signedUser
                }, () => {
                    onLogin(signedUser);
                });
            }
        }).catch((error) => {
            if (error !== ERRORS.NO_SIGNED_USER) {
                console.log("erro recuperando usuario logado: " + error);
            }
        });
    }

    logout = () => {
        const { onLogout } = this.props;

        this.setState({
            user: null
        }, () => {
            onLogout();
        });
    }

    showLogout = () => {
        const { user } = this.state;

        return (
            <View style={{ padding: 5, backgroundColor: "#fff" }}>
                <Logout signer={user.signer} onLogout={this.logout} />
            </View>);
    }

    showLogin = () => {
        let key = 0;
        return (
            Object.values(SIGNERS).map((signer) => {
                if (signer !== "None") {
                    return (
                        <View style={{ padding: 5, backgroundColor: "#fff" }} key={++key}>
                            <Login signer={signer} onLogin={this.login} />
                        </View>
                    );
                }
            })
        );
    }

    render = () => {
        const { user } = this.state;

        if (user) {
            return (this.showLogout());
        } else {
            return (this.showLogin());
        }
    }

}