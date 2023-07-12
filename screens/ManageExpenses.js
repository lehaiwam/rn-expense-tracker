import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useContext, useState } from 'react'
import IconButton from '../UI/iconbutton/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseInputForm from '../components/expenses/ExpenseInputForm'
import { hostPostExpense, hostGetExpenses, hostPutExpense, hostDeleteExpense  } from '../util/http'
import LoadingOverlay from '../UI/loadingoverlay/LoadingOverlay'
import ErrorOverlay from '../UI/erroroverlay/ErrorOverlay'

const ManageExpenses = ({route, navigation}) => {
  const [systemError, setSystemError] = useState(null)
  const [action, setAction] = useState('')
  const expensesCtx = useContext(ExpensesContext)
  const { tranId } = route.params
  const isEditing = !!tranId

  const selectedExpense =  expensesCtx.expenses.find( expense => expense.id === tranId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])


  const errorSystemErrorHandler = () => {
    setSystemError(null)
    navigation.goBack()
  }


  const cancelHandler = () => {
    navigation.goBack()
  }

  const deleteItemHandler = async () => {
    setAction('DELETE')
    try {
      const result = await hostDeleteExpense(tranId)
      expensesCtx.deleteExpense(tranId)
      navigation.goBack()
    } catch(err) {
      setSystemError('Failed delete expense attempt!\n\n' + err.name + ': ' + err.message  )
    } 
  }


  const confirmHandler = async (expenseData) => {
    console.log('Received expenseData: ', expenseData)  
    if (isEditing) {

      setAction('UPDATE')
      try {
        const result = await hostPutExpense(tranId, expenseData)
        expensesCtx.updateExpense( tranId, expenseData )
        navigation.goBack()
      } catch (err) {
        setSystemError('Failed UPDATE expense attempt!\n\n' + err.name + ': ' + err.message  )
      }
      
    } else {
      setAction('ADD')
      try {
        const hostId = await hostPostExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id: hostId })
        navigation.goBack()
      } catch(err) {
        setSystemError('Failed ADD expense attempt!\n\n' + err.name + ': ' + err.message  )
      }
    }    
  }


  switch(action) {
    case 'ADD': {
      if(systemError) {
        return (
          <ErrorOverlay msg={systemError} onAcknowledgeError={errorSystemErrorHandler}/>
        )
      } else {
        return (
          <LoadingOverlay msg={"Please be patient, adding your record on the host..."}/>
        )
      }
    }
    case 'UPDATE': {
      if(systemError) {
        return (
          <ErrorOverlay msg={systemError} onAcknowledgeError={errorSystemErrorHandler}/>
        )
      } else {
        return (
          <LoadingOverlay msg={"Please be patient, updating your record on the host..."}/>
        )
      }
    }
    case 'DELETE': {
      if(systemError) {
        return (
          <ErrorOverlay msg={systemError} onAcknowledgeError={errorSystemErrorHandler}/>
        )
      } else {
        return (
          <LoadingOverlay msg={"Please be patient, deleting the record on the host..."}/>
        )
      }
    }
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