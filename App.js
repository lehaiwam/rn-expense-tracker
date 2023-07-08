import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpenses from './screens/ManageExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './UI/iconbutton/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const ExpensesOverview = () => {

  const addExpense = () => {
    console.log('\n  Adding an expense ...')
  }

  return (
    <BottomTab.Navigator 
      screenOptions={ ({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => {
          return  <IconButton 
                    iconName='add-circle-outline' 
                    size={26} 
                    color={tintColor}
                    iconPressHandler={ () => {
                      navigation.navigate('ManageExpenses', {})
                    }} 
                  />
        },
      })}> 
      <BottomTab.Screen 
        name="RecentExpenses" 
        component={ RecentExpenses }
        
        options={{
          title: "Recent Expenses",
          tabBarLabel: 'List Recent',
          tabBarIcon: ({color, size})=> {
            return <Ionicons name='md-hourglass-sharp' size={24} color={color} />
          },

        }}/>

      <BottomTab.Screen 
        name="AllExpenses" 
        component={ AllExpenses }
        options={{
          title: "All Expenses",
          tabBarLabel: 'List All',
          tabBarIcon: ({color, size})=> {
            return <Ionicons name='md-calendar-sharp' size={24} color={color} />
          },
        }}/>
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='ExpensesOverview'
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}  
          >
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ ExpensesOverview } 
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="ManageExpenses" 
              component={ ManageExpenses } 
              options={{
                presentation: 'modal',            
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  flex: 1,
});
