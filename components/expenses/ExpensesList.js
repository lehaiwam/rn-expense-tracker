import { StyleSheet, FlatList, View, Text, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({expenses}) => {

  return (
    <View style={styles.expenseItemsContainer}>
      <FlatList 
          data={expenses}
          keyExtractor={ item => item.id}
          renderItem={ ({item}) => {
              return ( 
                <ExpenseItem { ...item } />  
              )
          }}
      />
    </View>
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  expenseItemsContainer: {
    width: '100%',
    paddingVertical: 8,
  },

})