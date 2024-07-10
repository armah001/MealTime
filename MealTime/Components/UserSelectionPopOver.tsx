import { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Meal } from './Interface/Meal';
// remove later
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ConfirmModal from './ConfirmModal';
import { REACT_NATIVE_BASE_URL } from '@env';
import { Feather } from '@expo/vector-icons';
import Loader from './Loader';
import UserSelectedMeal from './UserSelectedMeal';
import * as SecureStore from 'expo-secure-store';
import SelectionTab from './SelectionTab';
type RootStackParamList = {
  SuccessCard: any;
  FailCard:any;
  HomePage:any
  // Add other screen names here
};
type SelectionTabProps = {
  onConfirm: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SuccessCard'>;

const UserSelectionPopOver = (props: SelectionTabProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<(string | null)[]>(new Array(5).fill(null));
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSelectedMeals, setUserSelectedMeals] = useState<Meal[]>([]);
 
  const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const navigation = useNavigation<NavigationProp>();

  const fetchUserSelectedMeals = async () => {
    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync("accessToken"); 

      if (!token) {
          throw new Error('No token found');
      }

      const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/User/ViewSelections`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
      });

      if (response.ok) {
          console.log('Successfully submitted meal selections:', response.status);
          const data = await response.json();
          setUserSelectedMeals(data) ; // You can handle the response data as needed
      } else {
          console.log('Failed to submit meal selections:', response.status);
          // Handle failure scenario here if needed
      }
  } catch (error) {
      console.error('Error:', error);
      // Handle error scenario here if needed
  }
   finally {
      setIsLoading(false);
    }
  };
  const handleEdit = () => {
    navigation.navigate( "HomePage" );
    setShowConfirmModal(false);
  };

  // const filterMealsByDay = (meals: Meal[], day: string) => {
  //   const filtered = meals.filter(meal => meal.daysSelection.includes(day));
  //   setFilteredMeals(filtered);
  // };

  useEffect(() => {
    fetchUserSelectedMeals();
  }, []);
console.log("jnfowpodcvw",userSelectedMeals);

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <View style={styles.innerTextBox}>
          <Text style={styles.text} >My Meals For The Week</Text>
          <TouchableOpacity>
            <View style={styles.icon}>
              <Feather name="edit" size={25} color="rgba(217,217,217,5)" onPress={handleEdit}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "rgba(217,217,217,0.4)", width: "100%", height: 1 }}>
        </View>
      </View>   
      <View style={styles.radioSelection}>
      {isLoading && <Loader loading />}
      {userSelectedMeals==null ? (<ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <UserSelectedMeal data={userSelectedMeals}/>
        </ScrollView>
      ): <Text style={{textAlign:"center",paddingTop:60}}>Couldnt load your meal selection</Text>}
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
      
         
        </View>
      </Modal>
    </View>
  );
};

export default UserSelectionPopOver;
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#162D3A",
    fontSize: 25,
    fontWeight: "600",
    paddingLeft: 20,
    textAlign: "left",
  },
  textBox: {
    paddingTop: 13,
    flexDirection: "column",
    justifyContent: "space-between",
    width: width,
    height: height * 0.065,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  innerTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingRight: 23,
    paddingLeft:9
  },
  radioSelection: {
    flex: 10,
    width: '98%',
    paddingBottom: 20,
  },
  button: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DaysBox: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  arrowIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 25,
    width: 10,
  },
  icon: {
    paddingTop: 5
  },
  bodyContent: {
    marginTop: 80,
    alignItems: 'center',
  },
});
