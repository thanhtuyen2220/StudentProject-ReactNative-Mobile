import React, { useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UserElement from './Search/UserElement';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width;


const Search = ({navigation}) => {

    // State -----------------------------

    const [searchtxt, setSearchtxt] = React.useState('');
    const [listRecomment, setRecomment] = React.useState([]);

    // Function--------------------------
    // http://localhost:3000/information/get_user_with_criteria?fullname=abramo
    const getUserByName = () => {
        let arr = [];
        fetch(`http://localhost:3000/information/get_user_with_criteria?fullname=${searchtxt}&limit=15`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                data.forEach(element => {
                    arr.push(element.fullname);
                });
            })
            .then(() => {
                setRecomment(arr);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // Effect ----------------------------

    useEffect(() => {
        if (searchtxt.length >= 3) {
            // console.log(searchtxt);
            getUserByName();
        }
        else{
            setRecomment([]);
        }
        return;
    }, [searchtxt])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    width: '96%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}
            >
                <TextInput
                    autoCorrect={false}
                    autoFocus={true}
                    style={styles.findbar}
                    placeholder='Find...'
                    returnKeyType='search'
                    onChangeText={(val) => {
                        setSearchtxt(val);
                    }}
                />
                <TouchableHighlight
                    onPress = {()=>{
                        navigation.navigate('ResultSearch',{
                                fullname: searchtxt
                            })
                    }}
                    activeOpacity={1}
                    underlayColor={'#ccd0d5'}
                    style={styles.search_icon_box}>
                    <Icon name="search" size={22} color="#000000" />
                </TouchableHighlight>
            </View>

            <FlatList
                style={{
                    alignSelf: 'center',
                    width: '94%',
                }}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode={true}
                //keyExtractor={item => item}
                data={listRecomment}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress = {()=>{
                            navigation.navigate('ResultSearch',{
                                fullname: item
                            })
                        }}
                    >
                        <UserElement
                            name={item}
                        />
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView>
    );
};
export default Search;

const styles = StyleSheet.create({
    post: {
        backgroundColor: '#e4e6eb',
        height: 100,
        margin: 16,
        borderRadius: 16
    },
    findbar: {
        backgroundColor: 'white',
        height: 45,
        width: '85%',
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 5
    }

});