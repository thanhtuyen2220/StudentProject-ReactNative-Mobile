import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';


const PreviewUSer = ({name, country, gpa, avatar}) => {
    
   let image = avatar;
   image = image.replace('hhttps', "https");
    return (
        <View
            style={{
                backgroundColor: 'white',
                width: '94%',
                height: 80,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black',
                shadowOpacity: 0.3,
                borderRadius:15,
                marginTop:10,
            }}
        >
            <Image
               source={{ uri: image }} 
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                    marginLeft:10
                }}
            />
            <View style = {{
                height:80,
                justifyContent:'space-between',
                marginLeft:10,
                maxWidth:'80%',
                paddingVertical:5
            }}>
                <Text
                    style = {{
                        fontSize:16,
                        fontWeight:'600',
                    }}
                >
                    {name}
                </Text>
                    <Text>Country: {country}</Text>
                    <Text>GPA: {gpa}</Text>
            </View>
        </View>
    );
}

export default PreviewUSer;