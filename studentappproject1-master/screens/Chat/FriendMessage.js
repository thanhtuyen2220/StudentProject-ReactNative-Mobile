import React from 'react';
import {
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MyMessage = ({ content,timestamp }) => {
    return (
        <LinearGradient
            colors={['#F1F1F1','#EBEBEB']}
            style={{
                height: null,
                padding: 15,
                alignSelf: 'flex-start',
                marginTop: 15,
                marginLeft: 20,
                borderRadius: 10,
                maxWidth:'80%'
            }}>
            <Text
                 style = {{
                    fontSize:16
                }}
            >
                {content}
            </Text>
        </LinearGradient>
    );
}
export default MyMessage;


