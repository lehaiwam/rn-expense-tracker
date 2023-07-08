import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
import { useNavigation } from '@react-navigation/native'

/*
const getNewDate = (tranDate) => {

    const monthDescriptions = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    // const outStringInputDate = tranDate.toString()
    const dateArr = tranDate.toString().split('/')
    const strMon = dateArr[0]
    const strDay = dateArr[1]
    const strYear = dateArr[2]
    // const monIndex = strMon.parseInt() - 1
    // const outStrMon = monthDescriptions[strMon.parseInt() - 1]
    const outStrDate = `${strDay}-${monthDescriptions[strMon.parseInt()-1]}-${strYear}`
    console.log('Output date: ', outStrDate )
    return outStrDate
}
*/

const ExpenseItem = ({ id, date, description, amount }) => {

    const navigation = useNavigation()

    const openExpenseItem = () => {

        navigation.navigate('ManageExpenses', {
            tranId: id,
        })

    }

    return (
        <Pressable 
            onPress={ openExpenseItem }
            style={ ({pressed}) => pressed && styles.pressed }>
            <View style={styles.expenseItemContainer}>
                <View style={styles.descriptionDateContainer}>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>
                        { getFormattedDate(date) }
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>R { amount.toFixed(2) }</Text>
                </View>
            </View>  
        </Pressable>
    )
}

export default ExpenseItem

const styles = StyleSheet.create({
    expenseItemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#4e4eec',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
        backgroundColor: '#38389f',
        elevation: 4,
    },
    pressed: {
        opacity: 0.45,
    },
    descriptionDateContainer: {
        margin: 4,
    },
    textBase: {
        fontSize: 18,
        color: GlobalStyles.colors.gray100, 
    },
    description: {
        marginBottom: 4,
    },
    amountContainer: {
        backgroundColor: '#ffffff',
        padding: 4,
        borderRadius: 4,
        minWidth: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    amount: {
        color: '#1c1c79',
        fontSize: 16,
        fontWeight: 'bold',
    },
})