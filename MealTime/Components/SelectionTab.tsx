import { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, ScrollView,Text } from 'react-native';
import CustomButton from './CustomButton';
import DateWidget from './DateWidget';
import Radio from './Radio';
import { Meal } from './Interface/Meal';
// remove later
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ConfirmModal from './ConfirmModal';
import { REACT_NATIVE_BASE_URL } from '@env';
import Loader from '../Components/Loader';
type RootStackParamList = {
  SuccessCard: any;
  FailCard:any
  // Add other screen names here
};

type SelectionTabProps = {
  onConfirm: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SuccessCard'>;

const SelectionTab = (props: SelectionTabProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<(string | null)[]>(new Array(5).fill(null));
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const navigation = useNavigation<NavigationProp>();

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
    } finally {
      setIsLoading(false);
    }
  };

  const filterMealsByDay = (meals: Meal[], day: string) => {
    const filtered = meals.filter(meal => meal.daysSelection.includes(day));
    setFilteredMeals(filtered);
  };
  
  const handleDayChange = (day: string) => {
    const index = dayOfWeek.findIndex(d => d === day);
    setCurrentDayIndex(index);
    filterMealsByDay(meals, day);
  };

  const handleNextDay = () => {
    const nextIndex = (currentDayIndex + 1) % dayOfWeek.length;
    setCurrentDayIndex(nextIndex);
    filterMealsByDay(meals, dayOfWeek[nextIndex]);

    if (dayOfWeek[nextIndex] === 'Monday') {
      setShowConfirmModal(true);
    }
  };

  const handleMealChange = (meal: string) => {
    const updatedSelectedMeals = [...selectedMeals];
    updatedSelectedMeals[currentDayIndex] = meal;
    setSelectedMeals(updatedSelectedMeals);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    if (meals.length > 0) {
      filterMealsByDay(meals, dayOfWeek[currentDayIndex]);
    }
  }, [currentDayIndex, meals]);

  return (
    <View style={styles.container}>
      <DateWidget currentDay={dayOfWeek[currentDayIndex]} onDayChange={handleDayChange} />

      <View style={styles.radioSelection}>
      {isLoading && <Loader loading />}
      {filteredMeals.length === 0 && !isLoading ? (
          <View style={styles.bodyContent}>
            <Text style={{ textAlign: "center" }}>
              Menu has not been uploaded yet
            </Text>
          </View>
        ) : (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Radio
          data={filteredMeals}
          checkedValue={selectedMeals[currentDayIndex]}
          onChange={handleMealChange}
          style={{ marginBottom: 15, fontSize: 30 }}
        />
        </ScrollView>
        )}
      </View>
      <View style={styles.button}>
        <CustomButton title='Next' buttonWidth={355} onPress={handleNextDay} />
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
                selectedMeals={selectedMeals}
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
    height: 555,
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
  text: {
    color: '#162D3A',
    fontSize: 25,
    fontWeight: '600',
    paddingLeft: 20,
  },
  arrowIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 25,
    width: 10,
  },
  arrowIcon: {
    color: '#162D3A',
    paddingRight: 10,
  },
  bodyContent: {
    marginTop:80,
    alignItems: 'center',
  },
});
