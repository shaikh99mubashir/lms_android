import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Color } from '../../Constant';
// import { Feather } from 'react-native-vector-icons/Feather';
import Feather from "react-native-vector-icons/Feather"

const CustomDropDown3 = ({ items, defaultSelected, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultSelected || items[0]?.ddValue || '');
  const dropdownRef = useRef(null);

  const handleSelection = (item: any) => {
    setSelectedValue(item.ddValue);
    setOpen(false);
    onSelect(item);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleDropdownToggle = () => {
    setOpen(!open);
  };

  return (
    <View ref={dropdownRef}>
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <View>
          <View style={{ flexDirection: 'row', gap: 10, }}>
            <Text style={{ color: Color.IronsideGrey, fontFamily: 'Circular Std Book', fontSize: 14, top: 6 }}>
              Sort By
            </Text>
            <View>
              <TouchableOpacity
                onPress={handleDropdownToggle}
                activeOpacity={0.8}
                style={{
                  backgroundColor: Color.white,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                  alignItems: 'center',
                  borderRadius: 6,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: Color.lineColor,
                  width: 135,
                }}>
                <Text style={[styles.textType3, {fontSize: 14}]}>{selectedValue}</Text>
                {open ? (
                  <Feather name="chevron-up" size={20} color={Color.Dune} />
                ) : (
                  <Feather name="chevron-down" size={20} color={Color.Dune} />
                )}
              </TouchableOpacity>
              {open && (
                <View
                  style={{
                    backgroundColor: Color.white,
                    borderRadius: 6,
                    paddingHorizontal: 20,
                    paddingTop: 15,
                    marginTop: 3,
                    zIndex: 999,
                    position: 'absolute',
                    top: 32,
                    width: 135,
                    elevation: 2,
                  }}>
                  {items.map((item: any, index: number) => (
                    <TouchableOpacity key={index} onPress={() => handleSelection(item)}>
                      <Text style={[styles.textType3,{ fontSize: 14, paddingBottom: 16 }]}>{item.ddValue}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CustomDropDown3;
const styles = StyleSheet.create({
  textType3: {
    color: Color.Dune,
    fontSize: 16,
    fontFamily: 'Circular Std Medium',
  },
  textType1: {
    fontWeight: '500',
    fontSize: 26,
    color: Color.Black,
    fontFamily: 'Circular Std Medium',
    lineHeight: 24,
    fontStyle: 'normal',
  },

});
