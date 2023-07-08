import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoExpensesContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noExpenseText}>There are expense items for the selected period!!!</Text>
    </View>
  )
}

export default NoExpensesContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 40,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#8a8ae5',
        borderWidth: 1,
        elevation: 4,
    },
    noExpenseText: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 600,
      textAlign: 'center',
    },
  
  })