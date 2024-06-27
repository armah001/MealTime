import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import BottomPopOver from '../Components/BottomPopOver';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Components/AuthContext';
import NavigationHeader from '../Components/NavigationHeader';
import Loader from '../Components/Loader';
import MenuCard from '../Components/MenuCard';
import { getRandomColor, lightenHexColor } from '../Components/Utils/Misc';
import { REACT_NATIVE_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

type RootStackParamList = {
  LogIn: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const AllMenuPage: React.FC = () => {
  const { clearFields } = React.useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const [showPopOver, setShowPopOver] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menus, setMenus] = useState<any[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null); // State to track active menu ID

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    clearFields();
    navigation.navigate('LogIn');
  };

  useEffect(() => {
    // Function to fetch all menus from the API
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Menu/GetMenus`);
        if (response.ok) {
          const data = await response.json();
          setMenus(data); // Set fetched menus to state
        } else {
          console.error('Failed to fetch menus:', response.status);
          // Handle failure scenario if needed
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
        // Handle error scenario if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus(); // Call fetchMenus when component mounts
  }, []);

  const handleMenuActivation = async (menuId: number | null) => {
    try {
      if (menuId === activeMenuId) {
        // Menu is already active, deactivate it
        await deactivateMenu(menuId);
        setActiveMenuId(null); // Update active menu ID state
      } else {
        // Deactivate currently active menu if any
        if (activeMenuId !== null) {
          await deactivateMenu(activeMenuId);
        }

        // Activate the selected menu
        await activateMenu(menuId);
        setActiveMenuId(menuId); // Update active menu ID state
      }
    } catch (error) {
      console.error('Error activating/deactivating menu:', error);
      // Handle error scenario if needed
      // Restore previous state if activation/deactivation fails
      setActiveMenuId(activeMenuId);
    }
  };

  const activateMenu = async (menuId: number) => {
    try {
      const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Menu/ActivateMenu?MenuName=${encodeURIComponent(menus.find(menu => menu.id === menuId)?.menuName)}&ActivationCode=true`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to activate menu');
      }
    } catch (error) {
      throw new Error('Error activating menu');
    }
  };

  const deactivateMenu = async (menuId: number) => {
    try {
      const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Menu/ActivateMenu?MenuName=${encodeURIComponent(menus.find(menu => menu.id === menuId)?.menuName)}&ActivationCode=false`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to deactivate menu');
      }
    } catch (error) {
      throw new Error('Error deactivating menu');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.salutationBar}>
        <NavigationHeader
          onBackPress={() => navigation.goBack()}
          onAddPress={() => setShowPopOver(true)}
          title={"All Menus"}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.body}>
        {isLoading && <Loader loading />}
        {menus.length === 0 && !isLoading ? (
          <View style={styles.bodyContent}>
            <Text style={{ textAlign: "center" }}>
              There are no menus. Click on "Add" to create a new menu.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.menuView}>
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
            {menus.map((menu) => (
              <MenuCard
                key={menu.id}
                data={menu}
                color={getRandomColor(menu.id)}
                lightColor={lightenHexColor(getRandomColor(menu.id), 80)}
                onMenuActivation={handleMenuActivation} 
                activeMenuId={activeMenuId}

                checkedValue={undefined} 
                style={undefined}
                 onOpen={undefined}           
                    />
            ))}
          </ScrollView>
        )}
        {showPopOver && (
          <BottomPopOver
            compHeight={24}
            onConfirm={() => { /* Handle confirmation */ }}
            onCancel={() => setShowPopOver(false)}
          />
        )}
      </View>
    </View>
  );
};

export default AllMenuPage;

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingTop: 40,
  },
  salutationBar: {
    height: 60,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(217,217,217,1)',
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  bodyContent: {
    marginBottom: 180,
    alignItems: 'center',
  },
  menuView: {
    padding: 20,
    alignItems: 'center',
    width: width * 0.92,
  },
});
