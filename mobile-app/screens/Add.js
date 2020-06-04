import React from "react";
import {
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
} from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";

import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { DISTRICTS } from "../constants/data";

const { width, height } = Dimensions.get("screen");

export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            startTime: null,
            endTime: null,
            showDateSelect: false,
            showStartTimeSelect: false,
            showEndTimeSelect: false,
            localeState: null,
            localeDistrict: null,
        }

        this.localeStateList = []
        for (let state of Object.keys(DISTRICTS)) {
            this.localeStateList.push({
                label: state,
                value: state,
            })
        }
        this.localeDistrictList = {}
        for (let [state, districts] of Object.entries(DISTRICTS)) {
            const temp = []
            for (let district of districts) {
                temp.push({
                    label: district,
                    value: district
                });
            }
            this.localeDistrictList[state] = temp;
        }
        
    }

    handleChangeDate = (event, newDate) => {
        const currDate = newDate || this.state.date;
        console.log(currDate)
        this.setState({
            date: currDate,
            showDateSelect: Platform.OS === "ios",
        });
    }

    handleShowDate = () => {
        this.setState({
            showDateSelect: true
        });
        console.log(this.state.showDateSelect);
    }

    handleChangeStartTime = (event, newDate) => {
        const currDate = newDate || this.state.startTime;
        this.setState({
            startTime: currDate,
            showStartTimeSelect: Platform.OS === "ios",
        });
    }

    handleShowStartTime = () => {
        this.setState({
            showStartTimeSelect: true
        });
    }
    
    handleChangeEndTime = (event, newDate) => {
        const currDate = newDate || this.state.endTime;
        this.setState({
            endTime: currDate,
            showEndTimeSelect: Platform.OS === "ios",
        });
    }

    handleShowEndTime = () => {
        this.setState({
            showEndTimeSelect: true
        });
    }

    handleSubmit = () => {
        if (
            this.state.date == null ||
            this.state.startTime == null ||
            this.state.endTime == null ||
            this.state.localeState == null ||
            this.state.localeDistrict == null
        ) {
            return;
        }
        const startDateTime = new Date(this.state.date.getTime())
        startDateTime.setHours(this.state.startTime.getHours())
        startDateTime.setMinutes(this.state.startTime.getMinutes());
        startDateTime.setSeconds(this.state.startTime.getSeconds());

        const endDateTime = new Date(this.state.date.getTime());
        endDateTime.setHours(this.state.endTime.getHours());
        endDateTime.setMinutes(this.state.endTime.getMinutes());
        endDateTime.setSeconds(this.state.endTime.getSeconds());

        if (endDateTime < startDateTime) {
            return;
        }

        const data = {
            starttime: startDateTime.getTime(),
            endtime: endDateTime.getTime(),
            district: this.state.localeDistrict,
            state: this.state.localeState,
            // token left
        }
    }

    render() {
        return (
            <Block flex center style={{ height: height }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ height: "100%" }}>
                    <Block flex style={styles.group}>
                        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                            <Block center>
                                <Button
                                    color="secondary"
                                    textStyle={{
                                        color: "black",
                                        fontSize: 12,
                                        fontWeight: "700",
                                    }}
                                    style={styles.button}
                                    onPress={this.handleShowDate}>
                                    {this.state.date == null
                                        ? "SET DATE"
                                        : this.state.date.toDateString()}
                                </Button>
                            </Block>
                            <Block center>
                                <Button
                                    color="secondary"
                                    textStyle={{
                                        color: "black",
                                        fontSize: 12,
                                        fontWeight: "700",
                                    }}
                                    style={styles.button}
                                    onPress={this.handleShowStartTime}>
                                    {this.state.startTime == null
                                        ? "SET START TIME"
                                        : "FROM " +
                                          this.state.startTime.toLocaleTimeString()}
                                </Button>
                            </Block>
                            <Block center>
                                <Button
                                    color="secondary"
                                    textStyle={{
                                        color: "black",
                                        fontSize: 12,
                                        fontWeight: "700",
                                    }}
                                    style={styles.button}
                                    onPress={this.handleShowEndTime}>
                                    {this.state.endTime == null
                                        ? "SET END TIME"
                                        : "TO " +
                                          this.state.endTime.toLocaleTimeString()}
                                </Button>
                            </Block>

                            {this.state.showDateSelect && (
                                <DateTimePicker
                                    value={this.state.date || new Date()}
                                    minimumDate={new Date()}
                                    maximumDate={(() => {
                                        const d = new Date();
                                        d.setDate(d.getDate() + 6);
                                        return d;
                                    })()}
                                    mode={"date"}
                                    is24Hour={true}
                                    display={"default"}
                                    onChange={this.handleChangeDate}
                                />
                            )}
                            {this.state.showStartTimeSelect && (
                                <DateTimePicker
                                    value={this.state.startTime || new Date()}
                                    mode={"time"}
                                    is24Hour={true}
                                    display={"default"}
                                    onChange={this.handleChangeStartTime}
                                />
                            )}
                            {this.state.showEndTimeSelect && (
                                <DateTimePicker
                                    value={this.state.endTime || new Date()}
                                    mode={"time"}
                                    is24Hour={true}
                                    display={"default"}
                                    onChange={this.handleChangeEndTime}
                                />
                            )}

                            <Block center>
                                <DropDownPicker
                                    items={this.localeStateList}
                                    containerStyle={styles.dropdown}
                                    style={{ backgroundColor: "#fafafa" }}
                                    dropDownStyle={{
                                        backgroundColor: "#fafafa",
                                    }}
                                    dropDownMaxHeight={300}
                                    placeholder={"SELECT STATE"}
                                    defaultValue={this.state.localeState}
                                    onChangeItem={(item) =>
                                        this.setState({
                                            localeState: item.value,
                                            localeDistrict: null,
                                        })
                                    }
                                />
                            </Block>
                            <Block center>
                                <DropDownPicker
                                    items={
                                        this.state.localeState == null
                                            ? []
                                            : this.localeDistrictList[
                                                  this.state.localeState
                                              ]
                                    }
                                    containerStyle={styles.dropdown}
                                    placeholder={"SELECT DISTRICT"}
                                    defaultValue={this.state.localeDistrict}
                                    disabled={this.state.localeState == null}
                                    style={{ backgroundColor: "#fafafa" }}
                                    dropDownStyle={{
                                        backgroundColor: "#fafafa",
                                    }}
                                    dropDownMaxHeight={300}
                                    onChangeItem={(item) =>
                                        this.setState({
                                            localeDistrict: item.value,
                                        })
                                    }
                                />
                            </Block>
                            <Block center>
                                <Button color="primary" style={styles.buttonFlat} onPress={this.handleSubmit}>
                                    ADD EVENT
                                </Button>
                            </Block>
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: argonTheme.COLORS.HEADER,
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2,
        flexGrow: 1,
    },
    shadow: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2,
    },
    button: {
        marginBottom: theme.SIZES.BASE * 2,
        width: width - theme.SIZES.BASE * 2,
    },
    buttonFlat: {
        marginBottom: theme.SIZES.BASE * 2,
        width: width - theme.SIZES.BASE * 2,
        elevation: 0,
    },
    dropdown: {
        marginBottom: theme.SIZES.BASE * 2,
        width: width - theme.SIZES.BASE * 2,
        height: 48,
    },
    optionsButton: {
        width: "auto",
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
    },
    inputDefault: {
        borderBottomColor: argonTheme.COLORS.PLACEHOLDER,
    },
    inputTheme: {
        borderBottomColor: argonTheme.COLORS.PRIMARY,
    },
    inputTheme: {
        borderBottomColor: argonTheme.COLORS.PRIMARY,
    },
    inputInfo: {
        borderBottomColor: argonTheme.COLORS.INFO,
    },
    inputSuccess: {
        borderBottomColor: argonTheme.COLORS.SUCCESS,
    },
    inputWarning: {
        borderBottomColor: argonTheme.COLORS.WARNING,
    },
    inputDanger: {
        borderBottomColor: argonTheme.COLORS.ERROR,
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: "center",
    },
});