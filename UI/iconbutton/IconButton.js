import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({iconName, size, color, iconPressHandler}) => {
  return (
    <Pressable 
        onPress={ iconPressHandler }
        style={ ({pressed}) => pressed && styles.pressed}>
        <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={size} color={color}/>
        </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: 24,
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    pressed: {
        opacity: 0.45,
    }
})