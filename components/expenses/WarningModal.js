import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const WarningModal = ({showModal, setShowModal, resetInput}) => {

    const ackWarning = () => {
        console.log('ackWarning...')
        setShowModal(false)
        resetInput()
    }

    return (
        <Modal  
            visible={showModal} 
            transparent={true}
            animationType='fade'
            hardwareAccelerated
        >
            <View style={styles.centerModal}>
                <View style={styles.warningModal}>
                    <View style={styles.warningTitle}>
                        <Text style={styles.warningTitleText}>WARNING!</Text>
                    </View>

                    <View style={styles.warningBody}>
                        <Text style={styles.warningBodyText}>An invalid number entered. A valid number must be from 1 to 99</Text>
                    </View>
                    
                    <Pressable style={styles.warningButton} onPress={ackWarning} >
                        <Text style={styles.warningButtonText}>okay</Text>
                    </Pressable>

                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    warningModal: {
        backgroundColor: '#eddba1',
        width: 300,
        height: 250,
        borderWidth: 2,
        borderColor: Colors.yellow500,
        borderRadius: 20,

    },
    warningTitle: {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    warningTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    warningBody: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningBodyText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },
    warningButton: {
        height: '25%',
        backgroundColor: '#836013cd',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    warningButtonText: {
        color: Colors.white1000,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform:'capitalize',
    },    
})

export default WarningModal