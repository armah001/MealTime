
import {useEffect, useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Modal } from 'react-native';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';
import DateWidget from './DateWidget';
import Radio from './Radio';
import { Meal } from './Interface/Meal';
// remove later
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ConfirmModal from './ConfirmModal';
import SuccessCard from './SucessCard';
import { REACT_NATIVE_BASE_URL } from '@env';



type RootStackParamList = {
    SuccessCard: any;
    // Add other screen names here
  };

  type SelectionTabProps = {
    onConfirm: () => void;
  };
  
  type NavigationProp = StackNavigationProp<RootStackParamList, 'SuccessCard'>;

const SelectionTab = (props: SelectionTabProps) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [meal, setMeal] = useState<string | null>(null);
    // const [currentDay, setCurrentDay] = useState<string>('Monday');


    const navigation = useNavigation<NavigationProp>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
    const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const [selectedMeal, setSelectedMeal] = useState<string | null>(null); // State to hold selected meal
    const [selectedDay, setSelectedDay] = useState<string>('Monday'); 
    const [selectionsHistory, setSelectionsHistory] = useState<Array<(string | null)[]>>([[], [], [], [], []]); // Array to store selections for each day

    const fetchMeals = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Meal/GetActiveMeals`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
             
            });
      
            if (response.ok) {
              console.log('Successfully fetched meals:', response.status);
              const data: Meal[] = await response.json();
              setMeals(data);   
              filterMealsByDay(data, dayOfWeek[currentDayIndex]);
            } else {
              console.log('Failed :', response.status);
              // Handle failure scenario here if needed
            }
          } catch (error) {
            console.error('Error:', error);
            // Handle error scenario here if needed
          }
         finally {
            setIsLoading(false);
          }
        }

        const filterMealsByDay = (meals: Meal[], day: string) => {
            const filtered = meals.filter(meal => meal.daysSelection.includes(day));
            setFilteredMeals(filtered);
        };
    
        const handleDayChange = (day: string) => {
            setSelectedDay(day);
            const index = dayOfWeek.findIndex(d => d === day);
            setCurrentDayIndex(index);
            filterMealsByDay(meals, day);
                setSelectedMeal(selectionsHistory[currentDayIndex][0] || null);

        };

        const handleNextDay = () => {
            const nextIndex = (currentDayIndex + 1) % dayOfWeek.length;
            setCurrentDayIndex(nextIndex);
            filterMealsByDay(meals, dayOfWeek[nextIndex]);
        
            if (dayOfWeek[nextIndex] === 'Monday') {
              setShowConfirmModal(true);
            }
          };

        useEffect(() => {
            fetchMeals();
          }, []);

    return (
        <View style={styles.container}>
                <DateWidget currentDay={dayOfWeek[currentDayIndex]} onDayChange={handleDayChange} />

                <View style={styles.radioSelection}>
                    <Radio data={filteredMeals} checkedValue={meal} onChange={setMeal} style={{marginBottom:15,fontSize:30}}/>
                </View>
            <View style={styles.button}>
            <CustomButton title='Next' buttonWidth={355} onPress={handleNextDay}/>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirmModal}
                onRequestClose={() => {
                    setShowConfirmModal(false);
                }}
            >
                <View style={styles.overlay}>
                    <ConfirmModal 
                        onConfirm={() => {
                            setShowConfirmModal(false);
                            props.onConfirm(); 
                        }}
                        onCancel={() => {
                            setShowConfirmModal(false);
                        }}
                    />
                </View>
            </Modal>
        </View>
        
    );
};

export default SelectionTab;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioSelection:{
      flex:10,
      width:"98%",
      paddingBottom:20

    },
    button:{
        marginBottom:50
    },
    container: {
      flex:1,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      width: '100%',
      height:555,
      backgroundColor: 'white',
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
  