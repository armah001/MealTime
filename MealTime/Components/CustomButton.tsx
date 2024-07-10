import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; 

const CustomButton = ({ buttonWidth, title , onPress, backgroundcolor}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { width: buttonWidth , backgroundColor: backgroundcolor ?? "#254E65"}]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor:"#254E65",
        height:44,
        borderRadius:4,
        alignItems: "center",
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight:400
    }
});

CustomButton.propTypes = {
    buttonWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundcolor: PropTypes.string};

export default CustomButton;