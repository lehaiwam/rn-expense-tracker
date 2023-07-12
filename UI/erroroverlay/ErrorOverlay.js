import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../custombutton/CustomButton';

const ErrorOverlay = ({msg, onAcknowledgeError}) => {
  return (
    <View style={styles.container}>
        <AntDesign name="warning" size={72} color="red" />
        <Text style={styles.title}>System Error Encountered!!!</Text>
        <Text style={styles.message}>{msg}</Text>
        <View style={styles.buttonsContainer}>
            <CustomButton text={'OK'} onButtonPress={onAcknowledgeError}/>
        </View>
        
    </View>
  ) 
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex:1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary500,
        paddingTop: 64,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginVertical: 32,
        marginHorizontal: 16,
        color: '#f59090'
    },
    message: {
        color: '#f59090',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
        marginHorizontal: 16
    },
    buttonsContainer: {
        backgroundColor: GlobalStyles.colors.primary200,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 8,
        borderRadius: 12,
        borderColor: '#f59090',
        borderWidth: 1,
    },

})