import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const IconButton = ({ props }) => {
    return (
        <TouchableOpacity onPress={() => { }}>
            <View>
                <Icon {...props} />
            </View>
        </TouchableOpacity>
    );
};
export default IconButton;
