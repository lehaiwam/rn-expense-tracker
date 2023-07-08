import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useContext } from 'react'
import IconButton from '../UI/iconbutton/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseInputForm from '../components/expenses/ExpenseInputForm'

const ManageExpenses = ({route, navigation}) => {

  const expensesCtx = useContext(ExpensesContext)

  const { tranId } = route.params
  const isEditing = !!tranId

  const selectedExpense =  expensesCtx.expenses.find( expense => expense.id === tranId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteItemHandler = () => {
    expensesCtx.deleteExpense(tranId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = (expenseData) => {
    console.log('Received expenseData: ', expenseData)

    if (isEditing) {
      expensesCtx.updateExpense( tranId, expenseData )
    } else {
      expensesCtx.addExpense(expenseData)
    }
    
    navigation.goBack()
  }

  return (
    <View style={styles.container}>

      <ExpenseInputForm 
        isEditing={isEditing} 
        onCancel={ cancelHandler } 
        onConfirm={ confirmHandler }
        defaultValues={selectedExpense}
      />

      { isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            iconName={'trash'} 
            size={44} 
            color={GlobalStyles.colors.error500} 
            iconPressHandler={ deleteItemHandler } />
        </View>
      )}

    </View>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})