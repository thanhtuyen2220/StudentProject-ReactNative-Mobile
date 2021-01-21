import React, { useEffect } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import {firebaseApp} from '../../FirebaseConfig';

const database = firebaseApp.database();

const PreChat = ({ idUser, idfriend }) => {
    const [friend, setFriend] = React.useState({
        fullname: '',
        avatar: '',
    });

    const getInfor = () => {
        fetch(`http://localhost:3000/information/get_user_by_id?id=${idfriend}`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                setFriend({
                    avatar: data.avatar,
                    fullname: data.fullname
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const [lastMessage,setLastMessage] = React.useState('');
    const getLastMessage =()=>{
        database.ref('message/'+idUser+'/'+idfriend)
                .limitToLast(1)
                .on('value',function(snapshot){
                    // console.log(snapshot);
                    snapshot.forEach(function(element){
                        setLastMessage(element.val().content)
                    })
                })
    }

    useEffect(() => {
        getInfor();
        getLastMessage();
        return;
    }, [])

    return (
        <View
            style={{
                backgroundColor: 'white',
                width: '100%',
                height: 70,
                borderRadius: 15,
                height: 60,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black',
                shadowOpacity: 0.2,
                flexDirection: 'row',
                alignItems: 'center', marginBottom: 10
            }}
        >
            <Image
                source={{ uri: friend.avatar }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginLeft: 10
                }}
            />
            <View style={{ borderRadius: 10, maxWidth: '80%', padding: 5 }}>
                <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 10 }}>{friend.fullname}</Text>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 14, marginLeft: 10, marginTop: 5
                    }}>{lastMessage}</Text>
            </View>
        </View>
    );
}
export default PreChat;