
import {useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Modal } from 'react-native';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';
import DateWidget from './DateWidget';
import Radio from './Radio';


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
    const[meal,setMeal]=useState("Rice");
    const navigation = useNavigation<NavigationProp>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
              const data = await response.json();
              console.log(data);
              
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

    const data =[
        {
            id:0,
            lable:"Jollof Rice with Chicken, Coleslaw, and Soda",
            value:"Jollof",
            image:"https://cdn.jwplayer.com/v2/media/BRU94itM/poster.jpg?width=720"
        },
        {
            id:1,
            lable:"Fried Rice with Fish, Mixed Vegetables, and Juice",
            value:"Gari",
            image:"https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg"
        },
        {
            id:2,
            lable:"Spaghetti Bolognese with Garlic Bread and Lemonade",
            value:"Rice",
            image:"https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36.jpg"
        },
        {
            id:3,
            lable:"Grilled Chicken with Mashed Potatoes, Gravy, and Iced Tea",
            value:"Khebab",
            image:"https://marleyspoon.com/media/recipes/44803/main_photos/large/pan_roasted_chicken_mashed_potatoes-d256922d8203656d85eb9fa0b473ea75.jpeg"
        },
        {
            id:4,
            lable:"Vegetable Stir-Fry with Tofu, Steamed Rice, and Green Tea",
            value:"pizza",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDaVcll19kN9w5p2AKqn33CtJYOzzUQiWb0A&s"
        }

    ]

    return (
        <View style={styles.container}>
                <DateWidget/>
                <View style={styles.radioSelection}>
                    <Radio data={data} checkedValue={meal} onChange={setMeal} style={{marginBottom:15,fontSize:30}}/>
                </View>
            <View style={styles.button}>
            <CustomButton title='Next' buttonWidth={355} onPress={() => setShowConfirmModal(true)}/>
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
  