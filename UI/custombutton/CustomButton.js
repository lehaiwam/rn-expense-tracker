import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import { GlobalStyles } from '../../constants/styles'

const CustomButton = ({ text , mode, style, onButtonPress }) => {

    //console.log('What are children: ', children)

    return (
        <View style={style}>
            <Pressable 
                onPress={onButtonPress}
                style={ ({pressed})=> pressed && styles.pressed }>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{text}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        minHeight: 30,
        minWidth: 100,
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    flat: {
        backgroundColor: '#ffffff',
       
    },
    flatText: {
        color: GlobalStyles.colors.primary800,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.45,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    }
})