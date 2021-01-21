import React, { useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import PreviewUser from './PreviewUser';
import PreviewUSer from './PreviewUser';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';



const SearchScreen = ({ navigation, route }) => {

    // ---------------------- STATE ---------------------
    const { fullname } = route.params;
    const [listUser, setListUser] = React.useState([]);
    const [enableView, setEnableView] = React.useState(true);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [showFilter, setShowFilter] = React.useState(false);
    const [reRender, setRerender] = React.useState(false);
    const [filterCountry, setFilterCountry] = React.useState(false);
    const [gpaRange, setGpaRange] = React.useState({
        min: 0,
        max: 4
    })
    const [sortGPA, setSortGPA] = React.useState({
        lowtohigh: false,
        hightolow: false,
        none: true
    })
    const [backupList, setBackupList] = React.useState([]);
    const [listCountry, setListCountry] = React.useState([]);


    const [currentOffset, setCurrentOffset] = React.useState(0);
    const [offset, setOffset] = React.useState(0)

    // ---------------------- FUNCTION ---------------------
    const FindUser = () => {
        console.log('Find....');
        let arr = [];
        fetch(`http://localhost:3000/information/get_user_with_criteria?fullname=${fullname}`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                data.forEach(element => {
                    arr.push(element);
                });
            })
            .then(() => {
                setListUser(arr);
                setBackupList(arr);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const PopUpSort = () => {
        setVisibleModal(true);
    }

    const quickSort = (arr) => {
        if (arr.length < 2) return arr;

        // *** lấy phần tử cuối của 'arr' làm 'pivot'
        const pivotIndex = arr.length - 1;
        const pivot = arr[pivotIndex];

        const left = [];
        const right = [];

        let currentItem;
        for (let i = 0; i < pivotIndex; i++) {
            currentItem = arr[i]

            if (currentItem.gpa < pivot.gpa) {
                left.push(currentItem);
            } else {
                right.push(currentItem);
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)];

    }

    const pressCountry = (index) => {
        // console.log(index);
        listCountry[index].status = !listCountry[index].status;
        // console.log(listCountry);
        setRerender(!reRender);
        setFilterCountry(true);
    }


    const Apply = async () => {
        let arr = [];
        let minGPA = gpaRange.min == '' ? parseFloat(0) : parseFloat(gpaRange.min);
        let maxGPA = gpaRange.max == '' ? parseFloat(4) : parseFloat(gpaRange.max);

        if (filterCountry) {
            for (let i = 0; i < listCountry.length; i++) {
                let country = await listCountry[i].country;
                if (listCountry[i].status == true) {
                    for (let index = 0; index < backupList.length; index++) {
                        if (backupList[index].country == country) {
                            await arr.push(backupList[index]);
                        }
                    }
                }
            }
            // We have a list of  country in filter
            // After choose user who have gpa range min and max from arr;
            let gpaArr = [];
            for (let i = 0; i < arr.length; i++) {
                let gpa = await parseFloat(arr[i].gpa);
                if (gpa >= minGPA && gpa <= maxGPA) {
                    await gpaArr.push(arr[i]);
                }
            }
            await setListUser(gpaArr);
        }
        else {
            let gpaArr = [];
            for (let i = 0; i < backupList.length; i++) {
                let gpa = await parseFloat(backupList[i].gpa);
                if (gpa >= minGPA && gpa <= maxGPA) {
                    await gpaArr.push(backupList[i]);
                }
            }
            await setListUser(gpaArr);
        }
        setShowFilter(false);
    };

    const Reset = async () => {
        for (let i = 0; i < listCountry.length; i++) {
            listCountry[i].status = await false;
            await setFilterCountry(false);
            await setGpaRange({
                min: 0,
                max: 4
            })
        }
        setListUser(backupList);
    }
    //-------------------EFFECT-----------------------
    useEffect(() => {
        if (offset < currentOffset || offset == 0) {
            setEnableView(true);
            setCurrentOffset(offset);
        }
        else {
            setEnableView(false);
            setCurrentOffset(offset);
        }
        return;
    }, [offset]);

    useEffect(() => {
        FindUser();
        return;
    }, []);

    useEffect(() => {
        // if (sortGPA.none) {
        //     console.log('Back up List');
        //     setListUser(backupList);
        // };
        if (sortGPA.lowtohigh) {
            console.log('low to high');
            let arr = listUser;
            setListUser(quickSort(arr));
        };
        if (sortGPA.hightolow) {
            console.log('High to low');
            let arr = listUser;
            setListUser(quickSort(arr).reverse());
        }
        return;
    }, [sortGPA])

    useEffect(() => {
        if (backupList.length > 0) {
            let arr = [];

            for (let i = 0; i < backupList.length; i++) {
                let check = arr.find(element => element.country == backupList[i].country)
                if (check == undefined) {
                    let obj = {};
                    obj['count'] = 1;
                    obj['country'] = backupList[i].country;
                    obj['status'] = false;
                    arr.push(obj);
                } else {
                    let index = arr.indexOf(check);
                    arr[index].count += 1;
                }
            }
            console.log(arr);
            setListCountry(arr);
        }
        return;
    }, [backupList]);
    // --------------------MAIN------------------------
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View
                style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: 'white',
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black',
                    shadowOpacity: 0.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        name='ios-arrow-back'
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '600', alignSelf: 'center' }}>Result for '{fullname}'</Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowFilter(true);
                    }}
                >
                    <AntDesign
                        name='filter'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                scrollEventThrottle={20}
                onScroll={(event) => {
                    let logData = `X: ${event.nativeEvent.contentOffset.x} y: ${event.nativeEvent.contentOffset.y}`
                    //console.log(logData);
                    setOffset(event.nativeEvent.contentOffset.y);
                }}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id}
                data={listUser}
                horizontal={false}
                style={{ width: '100%', alignSelf: 'center' }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress = {()=>{
                            navigation.navigate('InforUser',{
                                idUser: item._id
                            })
                        }}
                    >
                        <PreviewUSer
                            name={item.fullname}
                            country={item.country}
                            gpa={item.gpa}
                            avatar={item.avatar}
                        />
                    </TouchableOpacity>

                )}
            />

            {
                enableView ? (
                    <TouchableOpacity
                        onPress={PopUpSort}
                        style={{
                            backgroundColor: 'white',
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            position: 'absolute',
                            bottom: 15,
                            right: 15,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            opacity: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                            justifyContent: 'center',
                            flexDirection: 'column',

                        }}
                    >
                        <FontAwesome
                            name='sort'
                            size={30}
                            color='tomato'
                            style={{
                                alignSelf: 'center'
                            }}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                fontWeight: '600'
                            }}
                        >
                            Sort
                        </Text>
                    </TouchableOpacity>
                ) : null
            }
            <Modal
                isVisible={visibleModal}
                onBackdropPress={() => setVisibleModal(false)}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '85%',
                        height: 150,
                        alignSelf: 'center',
                        borderRadius: 15,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (sortGPA.none == false)
                                setSortGPA({
                                    none: true,
                                    lowtohigh: false,
                                    hightolow: false
                                })
                        }}
                        style={{
                            flexDirection: 'row',
                            flex: 1 / 3,
                            borderBottomWidth: 0.5,
                            borderColor: 'gray',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        {
                            sortGPA.none ?
                                (
                                    <MaterialIcons
                                        name='radio-button-checked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                ) : (
                                    <MaterialIcons
                                        name='radio-button-unchecked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                )
                        }
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '500',
                            fontSize: 16
                        }}
                        >
                            None
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (sortGPA.lowtohigh == false)
                                setSortGPA({
                                    none: false,
                                    lowtohigh: true,
                                    hightolow: false
                                })
                        }}
                        style={{
                            flexDirection: 'row',
                            flex: 1 / 3,
                            borderBottomWidth: 0.5,
                            borderColor: 'gray',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        {
                            sortGPA.lowtohigh ?
                                (
                                    <MaterialIcons
                                        name='radio-button-checked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                ) : (
                                    <MaterialIcons
                                        name='radio-button-unchecked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                )
                        }
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '500',
                            fontSize: 16
                        }}
                        >
                            GPA: Low to high
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (sortGPA.hightolow == false)
                                setSortGPA({
                                    lowtohigh: false,
                                    hightolow: true,
                                    none: false
                                })
                        }}
                        style={{
                            flexDirection: 'row',
                            flex: 1 / 3,
                            borderBottomWidth: 0.2,
                            borderColor: 'gray',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        {
                            sortGPA.hightolow ?
                                (
                                    <MaterialIcons
                                        name='radio-button-checked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                ) : (
                                    <MaterialIcons
                                        name='radio-button-unchecked'
                                        size={25}
                                        color='tomato'
                                        style={{
                                            marginLeft: 15
                                        }}
                                    />
                                )
                        }
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: '500',
                            fontSize: 16
                        }}
                        >
                            GPA: High to low
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                isVisible={showFilter}
                onBackdropPress={() => setShowFilter(false)}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '90%',
                        height: '70%',
                        position: 'absolute',
                        alignSelf: 'center',
                        borderRadius: 15
                    }}
                >
                    <View
                        style={{
                            flex: 6 / 10,
                            padding: 10,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>Country</Text>
                        <FlatList
                            extraData={reRender}
                            numColumns={2}
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.country}
                            data={listCountry}
                            horizontal={false}
                            // refreshing = {true}
                            style={{
                                width: '90%',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                marginTop: 10,
                                padding: 10,

                                //borderWidth: 0.5,

                            }}
                            renderItem={({ item }) => (

                                <TouchableOpacity
                                    onPress={() => {
                                        let index = listCountry.indexOf(item);
                                        pressCountry(index);
                                    }}
                                    style={{
                                        backgroundColor: 'white',
                                        width: '40%',
                                        height: 50,
                                        borderRadius: 15,
                                        margin: 5,
                                        marginHorizontal: 10,
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowColor: 'black',
                                        shadowOpacity: 0.3,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: item.status ? 1.5 : 0,
                                        borderColor: 'tomato'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '600'
                                        }}
                                    >{item.country}</Text>
                                    <Text>({item.count})</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>


                    <View
                        style={{
                            // backgroundColor:'red',
                            flex: 2 / 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: '600' }}>GPA</Text>
                        <View
                            style={{
                                backgroundColor: 'white',
                                width: '85%',
                                height: '70%',
                                marginTop: 15,
                                alignItems: 'center',
                                flexDirection: 'row',
                                padding: 5,
                                justifyContent: 'space-evenly',
                                shadowOffset: { width: 0, height: 0 },
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                            }}
                        >
                            <TextInput
                                value={gpaRange.min}
                                onChangeText={val => {
                                    setGpaRange({
                                        ...gpaRange,
                                        min: val
                                    })
                                }}
                                keyboardType='number-pad'
                                placeholder='MIN: 0'
                                style={{
                                    backgroundColor: 'white',
                                    width: '38%',
                                    height: '60%',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.2,
                                    borderRadius: 10,
                                    fontSize: 16,
                                    paddingLeft: 10
                                }}
                            />

                            <Text>-</Text>

                            <TextInput
                                value={gpaRange.max}
                                onChangeText={val => {
                                    setGpaRange({
                                        ...gpaRange,
                                        max: val
                                    })
                                }}
                                placeholder='MAX: 4'
                                style={{
                                    backgroundColor: 'white',
                                    width: '38%',
                                    height: '60%',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowColor: 'black',
                                    shadowOpacity: 0.2,
                                    paddingLeft: 10,
                                    borderRadius: 10,
                                    fontSize: 16,
                                }}
                            />
                        </View>
                    </View>


                    <View
                        style={{
                            flex: 2 / 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={Reset}
                            style={{
                                width: 100,
                                height: 45,
                                borderWidth: 2,
                                borderColor: 'tomato',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ color: 'tomato', fontSize: 16 }}>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={Apply}
                            style={{
                                width: 100,
                                height: 45,
                                backgroundColor: 'tomato',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

export default SearchScreen;