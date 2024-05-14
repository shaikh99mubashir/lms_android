import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Color} from '../../Constant';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SearchBar = ({
  label,
  placeholder,
  onChangeText,
  value,
  error,
  keyboardType,
}: any) => {
  return (
    <View style={{}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={[
            styles.input,
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 0,
            },
          ]}>
          <View>
            <EvilIcons name="search" size={28} color={Color.Black} />
          </View>

          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            //   onChangeText={e => searchOpen(e)}
            style={{
              width: '90%',
              padding: 8,
              color: 'black',
              fontFamily: 'Circular Std Book',
              fontSize: 18,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 12,
    elevation: 4, // for Android
    shadowColor: 'rgba(213, 226, 245, 0.40)', // for iOS
    shadowOffset: {width: 0, height: 4}, // for iOS
    shadowOpacity: 1, // for iOS
    shadowRadius: 20,
    flex: 1,
    padding: 15,
    fontFamily: 'Circular Std Book',
    color: 'black',
    fontSize: 18,
  },
  label: {
    color: Color.Dune,
    fontFamily: 'Circular Std Medium',
    fontSize: 16,
  },
});
