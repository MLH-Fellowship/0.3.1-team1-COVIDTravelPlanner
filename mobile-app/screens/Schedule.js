import React from "react";
import {
    ScrollView,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions,
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";

import CustomCard from "../components/CustomCard";
import MapHeader from "../assets/imgs/map-header.png";
import MapImg from "../assets/imgs/map.png"

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
    {
        title: "Music Album",
        description:
            "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
        image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80",
        price: "$125",
    },
    {
        title: "Events",
        description:
            "Rock music is a genre of popular music. It developed during and after the 1960s in the United Kingdom.",
        image:
            "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80",
        price: "$35",
    },
];

const dummyData = [
    {
        date: "Jun 17",
        day: "Monday",
        events: [
            {
                time: "3pm-5pm",
                place: "Delhi",
                severity: "~5",
                color: "#53CC9D",
            },
            {
                time: "5pm-6pm",
                place: "Noida",
                severity: "~50",
                color: "#53CC9D",
            },
            {
                time: "5pm-6pm",
                place: "Noida",
                severity: "~50",
                color: "#53CC9D",
            },
            {
                time: "5pm-6pm",
                place: "Noida",
                severity: "~50",
                color: "#53CC9D",
            },
            {
                time: "5pm-6pm",
                place: "Noida",
                severity: "~50",
                color: "#53CC9D",
            },
        ],
    },
    {
        date: "Jun 18",
        day: "Tuesday",
        events: [
            {
                time: "3pm-5pm",
                place: "Delhi",
                severity: "~5",
                color: "#53CC9D",
            },
            {
                time: "5pm-6pm",
                place: "Noida",
                severity: "~50",
                color: "#53CC9D",
            },
        ],
    },
];

class Articles extends React.Component {
    renderProduct = (item, index) => {
        const { navigation } = this.props;

        return (
            <TouchableWithoutFeedback
                style={{ zIndex: 3 }}
                key={`product-${item.day}`}
                onPress={() => {}}>
                <Block center style={styles.productItem}>
                    <Image
                        resizeMode="contain"
                        style={styles.productImage}
                        source={MapHeader}
                    />
                    <Block
                        center
                        style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text
                            center
                            size={16}
                            color={theme.COLORS.MUTED}
                            style={styles.productPrice}>
                            {item.date}
                        </Text>
                        <Text center size={34}>
                            {item.day}
                        </Text>
                        <Block flex>
                            <ScrollView showsVerticalScrollIndicator={false} style={{width: width, marginBottom: 100}}>
                                {
                                    item.events.map((item, index) => {
                                        item.image = MapImg;
                                        return (
                                            <Block row style={{marginHorizontal: 33}}>
                                                <CustomCard
                                                    horizontal={true}
                                                    item={item}
                                                />
                                             </Block> 
                                        );
                                    })
                                }
                            </ScrollView>
                        </Block>
                    </Block>
                </Block>
            </TouchableWithoutFeedback>
        );
    };

    renderCards = () => {
        return (
            <Block flex style={styles.group}>
                <Block flex>
                    <Block flex style={{ marginTop: theme.SIZES.BASE / 2}}>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            decelerationRate={0}
                            scrollEventThrottle={16}
                            snapToAlignment="center"
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={
                                cardWidth + theme.SIZES.BASE * 0.375
                            }
                            contentContainerStyle={{
                                paddingHorizontal: theme.SIZES.BASE / 2,
                            }}>
                            {categories &&
                                dummyData.map((item, index) =>
                                    this.renderProduct(item, index)
                                )}
                        </ScrollView>
                    </Block>
                </Block>
            </Block>
        );
    };

    render() {
        return (
            <Block flex center>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    {this.renderCards()}
                {/* </ScrollView> */}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    group: {
        paddingTop: theme.SIZES.BASE,
    },
    productItem: {
        width: cardWidth - theme.SIZES.BASE * 2,
        marginHorizontal: theme.SIZES.BASE,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 7 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
    },
    productImage: {
        width: cardWidth - theme.SIZES.BASE,
        borderRadius: 3,
    },
    productPrice: {
        paddingTop: theme.SIZES.BASE,
    },
    productDescription: {
        paddingTop: theme.SIZES.BASE,
        // paddingBottom: theme.SIZES.BASE * 2,
    },
});

export default Articles;
