import React from "react";
import axios from "axios";
import { HOST_URI } from "../constants/data";
import { storeData, getData } from "../navigation/storage";
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
import { SEVERITY, COLOR_CODES } from "../constants/data";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

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

function splitDate(date) {
    const timestr = date.toTimeString().split(" ")[0];
    const out = timestr.split(":")[0] + ":" + timestr.split(":")[1];
    return out;
}

function compare(a, b) {
    return parseInt(a.starttime) - parseInt(b.starttime);
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Schedule extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: [],
        }
    }

    componentDidMount() {
        getData("token").then((token) => {
            const data = {
                token: parseFloat(token),
            };
            const url = HOST_URI + "/api/v1/schedule/list/"
            return axios({
                url: url,
                method: "POST",
                data: data,
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }).then((response) => {
            this.setState({
                schedule: this.parse(response.data)
            })
        }).catch((error) => {
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
        const initial = new Array()
        for (let i = 0; i < 7; i++) {
            initial.push(new Array());
        }

        events.sort(compare);
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
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 6);
            if (endDate < today || startDate > nextWeek) {
                continue;
            }

            const temp = {}
            temp.time = splitDate(startDate) + " - " + splitDate(endDate);
            temp.place = event.place.split("_")[1] + ", " + event.place.split("_")[0];
            temp.severity = event.prediction;

            if (event.prediction < SEVERITY.MEDIUM) {
                temp.color = COLOR_CODES.LOW;
            } else if (event.prediction < SEVERITY.HIGH) {
                temp.color = COLOR_CODES.MEDIUM;
            } else {
                temp.color = COLOR_CODES.HIGH;
            }
            const idx = startDate.getDate() - today.getDate();
            initial[idx].push(temp);
        }

        const finalData = [];
        for (let i = 0; i < 7; i++) {
            const temp = {};
            const d = new Date();
            d.setDate(today.getDate() + i);

            temp.day = DAYS[d.getDay()];
            temp.date = MONTHS[d.getMonth()] + " " + d.getDate();
            temp.events = initial[i];
            finalData.push(temp);
        }
        console.log(finalData);
        return finalData;

    }

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
                            {
                                this.state.schedule.map((item, index) =>
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
                    {this.renderCards()}
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

export default Schedule;
