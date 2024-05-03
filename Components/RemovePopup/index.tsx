import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../Constant'
import CustomButton from '../CustomButton'

const RemovePopup = ({ modalVisible, handleCloseModal ,modalText}:any) => {
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
      }}>
      <View
        style={[
          styles.modalContainer,
          { padding: 30, marginHorizontal: 20 },
        ]}>
        {/* <Text style={styles.textType1}>Logout?</Text>
        <View style={{ margin: 5 }}></View> */}
        <Text style={styles.textType3}>
        {modalText}
        </Text>
        <View style={{ margin: 15 }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <View style={{ width: '48%' }}>
            <CustomButton
              btnTitle="No"
              onPress={handleCloseModal}
              backgroundColor={Color.WhiteSmoke} // Assuming Color is defined
              color={Color.Black} // Assuming Color is defined
            />
          </View>
          <View style={{ width: '48%' }}>
            <CustomButton btnTitle="Yes" onPress={handleCloseModal} />
          </View>
        </View>
      </View>
    </View>
  </Modal>
  )
}

export default RemovePopup

const styles = StyleSheet.create({
    textType3: {
        color: Color.Dune,
        fontWeight: '500',
        fontSize: 22,
        fontFamily: 'Circular Std Medium',
        fontStyle: 'normal',
      },
      textType1: {
        fontWeight: '500',
        fontSize: 26,
        color: Color.Black,
        fontFamily: 'Circular Std Medium',
        lineHeight: 24,
        fontStyle: 'normal',
      },
      modalContainer: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
      },
      modalText: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'Circular Std Medium',
      },
})