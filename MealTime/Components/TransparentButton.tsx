import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; 

const TransparentButton = ({ buttonWidth, title , onPress, backgroundColor, borderColor, textColor }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.button, 
                { 
                    width: buttonWidth, 
                    backgroundColor: backgroundColor ?? 'white', 
                    borderColor: borderColor ?? '#000033', // blue black color
                }
            ]}
        >
            <Text style={[styles.buttonText, { color: textColor ?? '#000033' }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height:44,
        borderRadius:4,
        alignItems: "center",
        padding: 10,
        borderWidth: 1, // Add border width for the border to show
    },
    buttonText: {
        fontSize: 16,
        fontWeight:400
    }
});

TransparentButton.propTypes = {
    buttonWidth: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    textColor: PropTypes.string,
};

export default TransparentButton;