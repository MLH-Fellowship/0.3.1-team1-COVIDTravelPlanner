import React from "react";
import axios from "axios";
import { HOST_URI } from "../constants/data";
import { storeData, getData } from "../navigation/storage";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import CustomCard from "../components/CustomCard";
import MapImg from "../assets/imgs/map.png"
import { SEVERITY, COLOR_CODES } from "../constants/data";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function splitDate(date) {
    const timestr = date.toTimeString().split(" ")[0];
    const out = timestr.split(":")[0] + ":" + timestr.split(":")[1];
    return out;
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            now: null,
        };
    }

    componentDidMount() {
        getData("token")
            .then((token) => {
                const data = {
                    token: parseFloat(token),
                };
                const url = HOST_URI + "/api/v1/user/";
                return axios({
                    url: url,
                    method: "POST",
                    data: data,
                    headers: {
                        "Content-Type": "application.json",
                    },
                });
            })
            .then((response) => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                });
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    console.log(error.response);
                    if (error.response) {
                        console.log(error.response.data);
                    }
                }
            });

        getData("token")
            .then((token) => {
                const data = {
                    token: parseFloat(token),
                };
                const url = HOST_URI + "/api/v1/schedule/list/";
                return axios({
                    url: url,
                    method: "POST",
                    data: data,
                    headers: {
                        "Content-Type": "application.json",
                    },
                });
            })
            .then((response) => {
                this.setState({
                    now: this.parse(response.data),
                });
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    console.log(error.response);
                    if (error.response) {
                        console.log(error.response.data);
                    }
                }
            });
    }

    parse = (events) => {
        const today = new Date();
        
        for (let event of events) {
            const startDate = new Date(event.starttime);
            const endDate = new Date(event.endtime);

            if (
                startDate.getDate() !== endDate.getDate() ||
                startDate.getMonth() !== endDate.getMonth() ||
                startDate.getFullYear() !== endDate.getFullYear()
            ) {
                continue;
            }
            if (today < startDate || today > endDate) {
                continue;
            }

            const temp = {};
            temp.time = splitDate(startDate) + " - " + splitDate(endDate);
            temp.place =
                event.place.split("_")[1] + ", " + event.place.split("_")[0];
            temp.severity = event.prediction;
            temp.image = MapImg;
            if (event.prediction < SEVERITY.MEDIUM) {
                temp.color = COLOR_CODES.LOW;
            } else if (event.prediction < SEVERITY.HIGH) {
                temp.color = COLOR_CODES.MEDIUM;
            } else {
                temp.color = COLOR_CODES.HIGH;
            }
            return temp;
        }

        return null;
    };

    render() {
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            style={{ width, paddingTop: 20 }}>
                            <Block flex style={styles.profileCard}>
                                <Block middle style={styles.avatarContainer}>
                                    <Image
                                        source={{ uri: Images.ProfilePicture }}
                                        style={styles.avatar}
                                    />
                                </Block>

                                <Block flex>
                                    <Block middle style={styles.nameInfo}>
                                        <Text bold size={28} color="#32325D">
                                            {this.state.name}
                                        </Text>
                                        <Text
                                            size={16}
                                            color="#32325D"
                                            style={{
                                                marginTop: 10,
                                                fontStyle: "italic",
                                            }}>
                                            {this.state.email}
                                        </Text>
                                    </Block>
                                    <Block
                                        middle
                                        style={{
                                            marginTop: 30,
                                            marginBottom: 16,
                                        }}>
                                        <Block style={styles.divider} />
                                    </Block>

                                    <Block
                                        row
                                        style={{
                                            paddingVertical: 2,
                                            alignItems: "baseline",
                                        }}>
                                        <Text bold size={16} color="#525F7F">
                                            Now
                                        </Text>
                                    </Block>
                                    <Block
                                        row
                                        style={{
                                            paddingVertical: 2,
                                        }}>
                                        {this.state.now && (
                                            <CustomCard
                                                horizontal={true}
                                                item={this.state.now}
                                            />
                                        )}
                                    </Block>
                                    <Block
                                        row
                                        style={{
                                            paddingBottom: 20,
                                            justifyContent: "flex-end",
                                        }}></Block>
                                </Block>
                            </Block>
                        </ScrollView>
                    </ImageBackground>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    profile: {
        // marginTop: Platform.OS === "android" ? HeaderHeight : 0,
        // marginBottom: -HeaderHeight * 2,
        flex: 1,
        zIndex: -1
    },
    profileContainer: {
        width: width,
        // height: height,
        padding: 0,
        zIndex: 1,
    },
    profileBackground: {
        width: width,
        height: height / 2,
    },
    profileCard: {
        // position: "relative",
        padding: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: 90,
        borderRadius: 6,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    info: {
        paddingHorizontal: 40,
    },
    avatarContainer: {
        position: "relative",
        marginTop: -105,
    },
    avatar: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 0,
    },
    nameInfo: {
        marginTop: 35,
    },
    divider: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: "center",
        width: thumbMeasure,
        height: thumbMeasure,
    },
});

export default Profile;
