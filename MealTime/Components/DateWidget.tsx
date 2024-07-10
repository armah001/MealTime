import React from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';

type DateWidgetProps = {
  currentDay: string;
  onDayChange: (day: string) => void;
};
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const DateWidget: React.FC<DateWidgetProps> = ({ currentDay, onDayChange }) => {
  const currentIndex = daysOfWeek.indexOf(currentDay);

  const handlePrevDay = () => {
    const prevDay = daysOfWeek[(currentIndex - 1 + daysOfWeek.length) % daysOfWeek.length];
    onDayChange(prevDay);
  };

  const handleNextDay = () => {
      const nextDay = daysOfWeek[(currentIndex + 1) % daysOfWeek.length];
      onDayChange(nextDay);
  };

  return (
        <View style={styles.container}>
            <View style={styles.DaysBox}>
                <Text style={styles.text} >{currentDay}</Text>
                <View style={styles.arrowIcons}>
                <View style={styles.arrowIcon}>
      <TouchableOpacity onPress={handlePrevDay}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
    </View>
    <View  >
      <TouchableOpacity onPress={handleNextDay}>
        <AntDesign name="arrowright"  size={24}/>
      </TouchableOpacity>
    </View>
                </View>
            </View>
           <View style={{backgroundColor:"rgba(217,217,217,0.4)",width:"100%",height:1}}></View>
        </View>
    );
};

export default DateWidget;

const styles = StyleSheet.create({
    container: {
      flex:1,
      width: '100%',
      height:30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    DaysBox:{
        flex:1,
        width:"100%",
        marginTop:10,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
       
    },
    text:{
        color:"#162D3A",
        fontSize:25,
        fontWeight:600,
        paddingLeft:20
        },
        arrowIcons:{
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            paddingRight:25,
            width:10
        },
        arrowIcon:{
            color:"#162D3A",
            paddingRight:10,
        }
  });
  