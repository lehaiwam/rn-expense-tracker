import { StyleSheet, ActivityIndicator, View, Text } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const LoadingOverlay = ({msg}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.message}>{msg}</Text>
        <ActivityIndicator size='large' color='#ffffff' />
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary500,
    },
    message: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 16,

    },

})