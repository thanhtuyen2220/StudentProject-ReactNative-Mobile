import React from 'react';
import {
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MyMessage = ({ content, timestamp }) => {
    return (
        <LinearGradient
            colors={['#2A9FFD', '#0E90F8']}
            style={{
                height: null,
                maxWidth: '80%',
                padding: 15,
                alignSelf: 'flex-end',
                marginTop: 15,
                marginRight: 20,
                borderRadius: 10
            }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 16
                }}
            >
                {content}
            </Text>
        </LinearGradient>
    );
}
export default MyMessage;


