import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const ConfirmationCodeField = () => {
    const [user, setUser] = useState(false);
    const CELL_COUNT = 4;
    // const { confirmation, phoneNum } = route.params;
    const [code, setCode] = useState('');
    const [uploading, setUploading] = useState(false);
    const [codeError, setCodeError] = useState(false)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    return (
        <>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </>
    )
}

export default ConfirmationCodeField

const styles = StyleSheet.create({

    codeFieldRoot: {
        marginTop: 40,
        justifyContent: 'space-between',
        alignItems:"center",
        gap:10
    },
    cell: {
        width: 65,
        height: 65,
        padding: 10,
        paddingTop:13,
        alignItems: 'center',
        fontFamily: 'Circular Std Bold',
        fontSize: 33,
        marginHorizontal: 4,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#1FC07D1A',
        textAlign: 'center',
        backgroundColor: '#1FC07D1A',
        color: 'black',
        justifyContent:'space-between'
    },
    focusCell: {
        borderColor: '#1FC07D1A',
    }
})