import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const NavigationHeader = ({ title, onBackPress, onAddPress, nameLabel }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <View style={styles.backNav}>
          <AntDesign name="arrowleft" size={24} color="#162D3A" />
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress}>
      <View style={styles.logOutIcon}>
        
          <MaterialIcons name="add" size={24} color="#035176" />
        <Text style={{color:"#035176", fontSize:18}}>{nameLabel}</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#162D3A',
    marginLeft: 10,
  },
  logOutIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
    width: 100,
    height: 40,
    marginTop:10,
    marginRight: 14,
  },
  backNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NavigationHeader;
