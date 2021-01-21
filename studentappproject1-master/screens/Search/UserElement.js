import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TextInput } from 'react-native-gesture-handler';

const UserElement = ({name}) => {
    return (
        <View
            style={{
                width: '94%',
                height: 50,
                //alignSelf: 'center',
                flexDirection: 'row',
                borderColor: '#ddd',
                borderBottomWidth: 0.8,

            }}
        >
            <EvilIcons
                name='search'
                size={30}
                style={{
                    alignSelf: 'center',
                    marginRight: 10
                }}
            />

            <Text
                style={{
                    alignSelf: 'center',
                    fontSize:15
                }}
            >
                {name}
            </Text>
        </View>
    );
}

export default UserElement;