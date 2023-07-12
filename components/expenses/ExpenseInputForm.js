import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import { GlobalStyles } from '../../constants/styles'
import CustomButton from '../../UI/custombutton/CustomButton'

const ExpenseInputForm = ({ isEditing, onCancel, onConfirm, defaultValues }) => {

  const [ formData, setFormData ] = useState({
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
  })

  const [ isFormDataInvalid, setIsFormDataInvalid ] = useState(false)

  const inputChangeHandler = ( identifier, enteredValue ) => {
    setFormData( (currValuesState) => {
      return (
        { ...currValuesState, [identifier]: { value: enteredValue, isValid: true } }
      )
    })
  }

  const formSubmitHandler = () => {
    const submittedData = {
      date: formData.date.value,                        // This is still a Date() variable               
      amount: +formData.amount.value,                   // the + sign coverts the sting to number
      description: formData.description.value,
    }

    const enteredDateArr = submittedData.date.slice(0,10).split('-')
    const enteredYear = enteredDateArr[0]
    const enteredMonth = enteredDateArr[1]
    const enteredDay = enteredDateArr[2]

    const currDate = new Date().toISOString().slice(0, 10)
    const currDateArr = currDate.split('-')
    const currYear = currDateArr[0]

    // Input data validation
    let dateIsValid = true
    if  ( ( enteredYear > currYear ) || 
          ( enteredMonth < 1 || enteredMonth > 12 ) ||
          ( enteredDay < 1 || enteredDay > 31) ) {
      dateIsValid = false
    }

    if (dateIsValid) {
      const testDate = new Date(submittedData.date)
      if ( testDate > new Date()) {
        dateIsValid = false
      }
    }

    if (!dateIsValid) {
      setFormData( (currState) => {
        return(
          { ...currState, date: { isValid: dateIsValid} }
        )
      })
    } else {
      setFormData( (currState) => {
        return(
          { ...currState, date: { value: submittedData.date, isValid: dateIsValid} } // Ensure we forward a Date() type variabl
        )
      })
    }

    const amountIsValid = !isNaN(submittedData.amount) && submittedData.amount > 100
    if (!amountIsValid) {
      setFormData( (currState) => {
        return(
          { ...currState, amount: { isValid: amountIsValid} }
        )
      })
    } else {  
      setFormData( (currState) => {
        return(
          { ...currState, amount: { value: submittedData.amount, isValid: amountIsValid} }
        )
      })
    }

    const descriptionIsValid = submittedData.description.trim().length > 3 && submittedData.description.trim().length <= 25
    if (!descriptionIsValid) {
      setFormData( (currState) => {
        return(
          { ...currState, description: { isValid: descriptionIsValid} }
        )
      })

      /*
      Alert.alert(
        'WARNING!', 
        'DESCRIPTION entered is INVALID! Must be more than 3 chars long! Please check and try again? ', 
        [{text: 'Okay', style:'cancel'}]
      )
      */

    } else {
      setFormData( (currState) => {
        return(
          { ...currState, description: { value: submittedData.description, isValid: descriptionIsValid} }
        )
      })
    }

    if (!dateIsValid || !amountIsValid || !descriptionIsValid) {
      setIsFormDataInvalid(true)
      return
    }
    // console.log('\n   Data yote urembo sana!')
    submittedData.date = new Date(submittedData.date)
    onConfirm( submittedData )
  }

  return (
    <View style={styles.formContainer}>

      <Text style={styles.titleText}>your expense</Text>
      { isFormDataInvalid &&
        <View style={ styles.errorTextContainer }> 
          <Text style={ styles.errorText }> Some input data is invalid see highlighted fields...</Text>
        </View>
      }
      <View style={styles.dateAmountContainer}>
        <Input 
          label="date" 
          style={ styles.dateAmountFlex }
          invalid = {!formData.date.isValid}
          textInputConfig={{ 
            keyboardType: 'number-pad',
            placeholder: 'CCYY-MM-DD', 
            maxLenght: 10, 
            value: formData.date.value,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
       
        <Input 
          label="amount"
          style={ styles.dateAmountFlex }
          invalid = {!formData.amount.isValid}
          textInputConfig={{ 
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
            value: formData.amount.value,
            onChangeText: inputChangeHandler.bind(this, 'amount'),           
          }}
        />
      </View>

      <Input 
          label="description"
          invalid = {!formData.description.isValid}
          textInputConfig={{ 
            multiline: true,
            autoCorrect: false,
            value: formData.description.value,
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
  errorTextContainer: {
    backgroundColor: GlobalStyles.colors.error50,
    borderColor: '#ff0000',
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
    marginVertical: 12,
  },
  errorText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: 'bold',
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