import { StyleSheet, Text, View, Alert } from 'react-native'
import React, {useState} from 'react'
import Input from './Input'
import { GlobalStyles } from '../../constants/styles'
import CustomButton from '../../UI/custombutton/CustomButton'
// import { getFormattedDate } from '../../util/date'

const ExpenseInputForm = ({ isEditing, onCancel, onConfirm, defaultValues }) => {

  const [ inputValues, setInputValues ] = useState({
    date: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
    amount: defaultValues ? defaultValues.amount.toString() : '',
    description: defaultValues ? defaultValues.description : '',
  })

  const inputChangeHandler = ( identifier, enteredValue ) => {
    // console.log('Entered Value: ', enteredValue, 'Id: ', identifier )
    setInputValues( (currValuesState) => {
      return (
        { ...currValuesState, [identifier]: enteredValue }
      )
    })
  }

  const formSubmitHandler = () => {
    const submittedData = {
      date: inputValues.date,         // 'CCYY-MM-DD' string creates a date variable
      amount: +inputValues.amount,              // the + sign coverts the sting to number
      description: inputValues.description,
    }
  
    console.log('Submitted Data: ', submittedData)
    const enteredDateArr = submittedData.date.split('-')
    const enteredYear = enteredDateArr[0]
    const enteredMonth = enteredDateArr[1]
    const enteredDay = enteredDateArr[2]

    const currDate = new Date().toISOString().slice(0, 10)
    console.log('currDate: ', currDate);
    const currDateArr = currDate.split('-')
    const currYear = currDateArr[0]
    const currMonth = currDateArr[1]
    const currDateDay = currDateArr[2]

    // Input data validation
    let dateIsValid = true
    if  ( ( enteredYear > currYear ) || 
          ( enteredMonth < 1 || enteredMonth > 12 ) ||
          ( enteredDay < 1 || enteredDay > 31) ) {
      dateIsValid = false
    }

    submittedData.date = new Date(submittedData.date)
    if (dateIsValid) {
      if (submittedData.date > new Date()) {
        dateIsValid = false
      }
    }

    if (!dateIsValid) {
      Alert.alert(
        'WARNING!', 
        'Invalid transaction DATE entered!!! Please check and try again?', 
        [{text: 'Okay', style:'cancel'}]
      )
      return
    }

    const amountIsValid = !isNaN(submittedData.amount) && submittedData.amount > 100
    if (!amountIsValid) {
      Alert.alert(
        'WARNING!', 
        'Invalid AMOUNT entered! Must be at least greater than R100!!! Please check and try again?', 
        [{text: 'Okay', style:'cancel'}]
      )
      return
    }

    const descriptionIsValid = submittedData.description.trim().length > 3 && submittedData.description.trim().length <= 25
    if (!descriptionIsValid) {
      Alert.alert(
        'WARNING!', 
        'DESCRIPTION entered is INVALID! Must be more than 3 chars long! Please check and try again? ', 
        [{text: 'Okay', style:'cancel'}]
      )
      return
    }

    onConfirm( submittedData )
  }


  return (
    <View style={styles.formContainer}>

      <Text style={styles.titleText}>your expense</Text>
    
      <View style={styles.dateAmountContainer}>
        <Input 
          label="date" 
          style={ styles.dateAmountFlex }
          textInputConfig={{ 
            keyboardType: 'number-pad',
            placeholder: 'CCYY-MM-DD', 
            maxLenght: 10, 
            value: inputValues.date,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
       
        <Input 
          label="amount"
          style={ styles.dateAmountFlex }
          textInputConfig={{ 
            keyboardType: 'decimal-pad',
            placeholder: '999.99',
            value: inputValues.amount,
            onChangeText: inputChangeHandler.bind(this, 'amount'),           
          }}
        />
      </View>

      <Input 
          label="description"
          textInputConfig={{ 
            multiline: true,
            autoCorrect: false,
            value: inputValues.description,
            onChangeText: inputChangeHandler.bind(this, 'description' ),
          }}
      />
      
      <View style={styles.buttonsContainer}>
        <CustomButton 
          text='Cancel'
          mode="flat" 
          style={styles.buttonStyle}
          onButtonPress={ onCancel }
        />
        <CustomButton 
          text={ isEditing ? 'Update' : 'Add' }
          style={styles.buttonStyle}
          onButtonPress={ formSubmitHandler }
        />
      </View>

    </View>
  )
}

export default ExpenseInputForm

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 16,
  },
  titleText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 20,
  },
  dateAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  dateAmountFlex: {
    flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 8,
  },
})