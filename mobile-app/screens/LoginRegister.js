import React from "react";
import axios from "axios";
import { HOST_URI } from "../constants/data";
import { storeData, getData } from "../navigation/storage";

import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPassword: "",
            registerName: "",
            registerEmail: "",
            registerPassword: "",
        };
    }

    handleRegister = () => {
        if (this.state.registerEmail === "" || this.state.registerName === "" || this.state.registerPassword === "") {
            return;
        }


        const data = {
            name: this.state.registerName,
            email: this.state.registerEmail,
            password: this.state.registerPassword,
        };
        const url = HOST_URI + "/api/v1/register/"

        console.log(url);

        axios({
            url: url,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            this.setState({
                loginEmail: this.state.registerEmail,
                loginPassword: this.state.registerPassword,
            }, this.handleLogin);
        }).catch((error) => {
            console.log(error);
            if (error) {
                this.setState({
                    registerName: "",
                    registerEmail: "",
                    registerPassword: "",
                });
                if (error.response) {
                    console.log(error.response.data);
                }
            }
        });
    }

    handleLogin = () => {
        if (this.state.loginEmail === "" || this.state.loginPassword === "") {
            return;
        }

        const data = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        };
        const url = HOST_URI + "/api/v1/login/";

        axios({
            url: url,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return storeData("token", response.data.token + '');
        }).then(() => {
            // navigate
        }).catch((error) => {
            if (error) {
                this.setState({
                    loginEmail: "",
                    loginPassword: "",
                });
                if (error.response) {
                    console.log(error.response.data);
                }
            }
        });
    }

    render() {
        return (
            <Block flex middle>
                <StatusBar hidden />
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{ width, height, zIndex: 1 }}>
                    <Block flex middle>
                        <Block style={styles.registerContainer}>
                            <Block
                                flex={0.72}
                                middle
                                style={styles.socialConnect}>
                                <Text
                                    color="#8898AA"
                                    size={12}
                                    style={{ paddingBottom: 15 }}>
                                    Login
                                </Text>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled>
                                        <Block
                                            width={width * 0.8}
                                            style={{ marginBottom: 15 }}>
                                            <Input
                                                borderless
                                                placeholder="Email"
                                                onChangeText={(email) => {
                                                    this.setState({
                                                        loginEmail: email,
                                                    });
                                                }}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={
                                                            argonTheme.COLORS
                                                                .ICON
                                                        }
                                                        name="ic_mail_24px"
                                                        family="ArgonExtra"
                                                        style={
                                                            styles.inputIcons
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8}>
                                            <Input
                                                password
                                                borderless
                                                placeholder="Password"
                                                onChangeText={(pswrd) => {
                                                    this.setState({
                                                        loginPassword: pswrd,
                                                    });
                                                }}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={
                                                            argonTheme.COLORS
                                                                .ICON
                                                        }
                                                        name="padlock-unlocked"
                                                        family="ArgonExtra"
                                                        style={
                                                            styles.inputIcons
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block middle>
                                            <Button
                                                color="primary"
                                                style={styles.createButton}
                                                onPress={this.handleLogin}>
                                                <Text
                                                    bold
                                                    size={14}
                                                    color={
                                                        argonTheme.COLORS.WHITE
                                                    }>
                                                    LOGIN
                                                </Text>
                                            </Button>
                                        </Block>
                                    </KeyboardAvoidingView>
                                </Block>
                            </Block>

                            <Block flex>
                                <Block flex={0.17} middle>
                                    <Text color="#8898AA" size={12}>
                                        Or create an account
                                    </Text>
                                </Block>
                                <Block flex center>
                                    <KeyboardAvoidingView
                                        style={{ flex: 1 }}
                                        behavior="padding"
                                        enabled>
                                        <Block
                                            width={width * 0.8}
                                            style={{ marginBottom: 15 }}>
                                            <Input
                                                borderless
                                                placeholder="Name"
                                                onChangeText={(name) => {
                                                    this.setState({
                                                        registerName: name,
                                                    });
                                                }}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={
                                                            argonTheme.COLORS
                                                                .ICON
                                                        }
                                                        name="hat-3"
                                                        family="ArgonExtra"
                                                        style={
                                                            styles.inputIcons
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block
                                            width={width * 0.8}
                                            style={{ marginBottom: 15 }}>
                                            <Input
                                                borderless
                                                placeholder="Email"
                                                onChangeText={(email) => {
                                                    this.setState({
                                                        registerEmail: email,
                                                    });
                                                }}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={
                                                            argonTheme.COLORS
                                                                .ICON
                                                        }
                                                        name="ic_mail_24px"
                                                        family="ArgonExtra"
                                                        style={
                                                            styles.inputIcons
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block width={width * 0.8}>
                                            <Input
                                                password
                                                borderless
                                                placeholder="Password"
                                                onChangeText={(pswrd) => {
                                                    this.setState({
                                                        registerPassword: pswrd,
                                                    });
                                                }}
                                                iconContent={
                                                    <Icon
                                                        size={16}
                                                        color={
                                                            argonTheme.COLORS
                                                                .ICON
                                                        }
                                                        name="padlock-unlocked"
                                                        family="ArgonExtra"
                                                        style={
                                                            styles.inputIcons
                                                        }
                                                    />
                                                }
                                            />
                                        </Block>
                                        <Block middle>
                                            <Button
                                                color="primary"
                                                style={styles.createButton}
                                                onPress={this.handleRegister}>
                                                <Text
                                                    bold
                                                    size={14}
                                                    color={
                                                        argonTheme.COLORS.WHITE
                                                    }>
                                                    CREATE ACCOUNT
                                                </Text>
                                            </Button>
                                        </Block>
                                    </KeyboardAvoidingView>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </ImageBackground>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    registerContainer: {
        width: width * 0.9,
        height: height * 0.78,
        backgroundColor: "#F4F5F7",
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: "hidden",
    },
    socialConnect: {
        backgroundColor: argonTheme.COLORS.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#8898AA",
        paddingTop: 25,
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: "#fff",
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    socialTextButtons: {
        color: argonTheme.COLORS.PRIMARY,
        fontWeight: "800",
        fontSize: 14,
    },
    inputIcons: {
        marginRight: 12,
    },
    passwordCheck: {
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 30,
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
    },
});

export default LoginRegister;
