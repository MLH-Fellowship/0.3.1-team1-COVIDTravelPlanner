import React from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { argonTheme } from "../constants";

export default class CustomCard extends React.Component {
    render() {
        const {
            item,
            horizontal,
            full,
            style,
            ctaColor,
            imageStyle,
        } = this.props;

        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle,
        ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [
            styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow,
        ];

        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableWithoutFeedback
                    onPress={() => {}}>
                    <Block flex style={imgContainer}>
                        <Image
                            source={item.image}
                            style={imageStyles}
                            resizeMode="cover"
                        />
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {}}>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Text
                            size={12}
                            style={styles.cardTime}
                            color={argonTheme.COLORS.ACTIVE}>
                                {item.time}
                        </Text>
                        <Text size={20} style={styles.cardTitle} bold>
                            {item.place}
                        </Text>
                        <Text
                            size={18}
                            muted={!ctaColor}
                            color={item.color}
                            style={{
                                fontWeight: "bold"
                            }}
                            >
                            {item.severity}
                        </Text>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

CustomCard.propTypes = {
    item: PropTypes.object,
    horizontal: PropTypes.bool,
    full: PropTypes.bool,
    ctaColor: PropTypes.string,
    imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 16,
    },
    cardTime: {
        flex: 0.2,
        flexWrap: "wrap",
        paddingBottom: 0,
    },
    cardTitle: {
        flex: 1,
        flexWrap: "wrap",
        paddingBottom: 6,
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2,
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: "hidden",
        flex: 0.7
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 140,
        width: "auto",
    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    fullImage: {
        height: 215,
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});
