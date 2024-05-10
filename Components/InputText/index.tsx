import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';

const InputText = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
  keyboardType,
}: any) => {
  return (
    <View style={{gap: 5, marginTop: 10}}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && {borderWidth: 1, borderColor: 'red'}, // Apply red border if there is an error
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={{color: 'red', marginLeft:15}}> {error}</Text>}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 55,
    borderRadius: 30,
    // elevation: 4, // for Android
    // shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    // shadowOffset: {width: 0, height: 4}, // for iOS
    // shadowOpacity: 1, // for iOS
    // shadowRadius: 20,
    flex: 1,
    padding: 15,
    fontFamily: 'Circular Std Book',
    color: Color.DustyGrey,
    fontSize: 18,
    borderColor: Color.liteGrey,
    borderWidth: 1,
  },
  labelContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -10,
    left: 25,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  label: {
    color: Color.Dune,
    fontFamily: 'Circular Std Medium',
    fontSize: 16,
  },
});
