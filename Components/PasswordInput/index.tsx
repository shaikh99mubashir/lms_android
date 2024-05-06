import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {Color} from '../../Constant';
import Icon from 'react-native-vector-icons/Ionicons';

const PasswordInput = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
}: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={{gap: 5, marginTop: 12}}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={[
          styles.passwordContainer,
          error && {borderWidth: 1, borderColor: 'red'},
        ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 15}}
          activeOpacity={0.8}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text>
            {isPasswordVisible ? (
              <Icon name="eye" size={25} color={Color.DustyGrey} />
            ) : (
              <Icon name="eye-off" size={25} color={Color.DustyGrey} />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={{color: 'red', marginLeft: 10}}> {error}</Text>}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 55,
    borderRadius: 50,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    padding: 15,
    fontFamily: 'Circular Std Medium',
    color: 'black',
    fontSize: 16,
    width: '90%',
  },
  label: {
    color: Color.Dune,
    fontFamily: 'Circular Std Medium',
    fontSize: 16,
  },
  // btn: {
  //     // flex: 1,
  //     height: 50,
  //     // width:360,
  //     borderRadius: 30,
  //     flexShrink: 0,
  //     backgroundColor: '#000',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginHorizontal: 15
  // },
  textType1: {
    fontWeight: '500',
    fontSize: 18,
    color: Color.white,
    fontFamily: 'Circular Std Black',
    lineHeight: 24,
  },
  textType2: {
    color: Color.IronsideGrey,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  textType3: {
    color: Color.Dune,
    fontWeight: '500',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Color.Primary,
  },
  labelContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -10,
    left: 25,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 30,
    borderColor: Color.liteGrey,
    borderWidth: 1,
  },

  eyeIconContainer: {
    padding: 8,
  },
  eyeIcon: {
    fontSize: 20,
  },
});
