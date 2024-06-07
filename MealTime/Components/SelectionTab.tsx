
import React from 'react';
import { StyleSheet,View, Text } from 'react-native';
import CustomButton from './CustomButton';

const SelectionTab = () => {
    return (
        <View style={styles.container}>
            <CustomButton buttonWidth={335} title="Next" />
        </View>
    );
};

export default SelectionTab;

const styles = StyleSheet.create({
    container: {
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      width: '100%',
      height:555,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:2
    },
  });
  