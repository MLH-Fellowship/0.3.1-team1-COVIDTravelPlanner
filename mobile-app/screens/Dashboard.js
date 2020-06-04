import React from "react";
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

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
    render() {
        return (
            <Block flex style={styles.profile}>
                <Block flex>
                    <ImageBackground
                        source={Images.ProfileBackground}
                        style={styles.profileContainer}
                        imageStyle={styles.profileBackground}>
                        <ScrollView
                            contentContainerStyle={{flexGrow: 1}}
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
                                            Jessica Jones
                                        </Text>
                                        <Text
                                            size={16}
                                            color="#32325D"
                                            style={{ marginTop: 10, fontStyle: 'italic' }}>
                                            jessica.jones@example.com
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
                                            <CustomCard
                                                horizontal={true}
                                                item={{
                                                    time: "3pm-5pm",
                                                    place: "Delhi",
                                                    severity: "~5",
                                                    color: "#53CC9D",
                                                    image: MapImg
                                                }}/>
                                        </Block>
                                    <Block
                                        row
                                        style={{
                                            paddingBottom: 20,
                                            justifyContent: "flex-end",
                                        }}>
                                    </Block>
                                    
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
