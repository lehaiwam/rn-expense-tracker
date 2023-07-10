import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {GlobalStyles} from '../../constants/styles'

const Input = ({ label, style, invalid, textInputConfig }) => {

  // console.log(label, invalid)

  const inputStyles = [styles.input]
  
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (label === 'amount') {
    inputStyles.push(styles.inputAmount)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{ label }</Text>
      <TextInput style={ inputStyles } {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    padding: 6,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary800,
    padding: 6,
    borderRadius: 6,
    fontSize: 20,
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  inputAmount: {
    textAlign: 'right',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 2,
    borderRadius: 12,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})