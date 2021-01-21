import React, { useEffect } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const Post = ({ idPost }) => {
    const [data, setData] = React.useState({
        content: '',
        idUser: '',
        time: '',
    });
    const [infor, setInfor] = React.useState({
        avatar: 'https://macmillan.yale.edu/sites/default/files/pictures/picture-218-1440186731.jpg',
        fullname: '',
    });

    useEffect(() => {
        fetch(`http://localhost:3000/post/get_post_by_id?id=${idPost}`)
            .then((response) => response.json())
            .then((json) => {
                setData({
                    ...data,
                    idUser: json.data.idUser,
                    content: json.data.content,
                    time: json.data.timeStamp
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const getInforUser = async () => {

        fetch(`http://localhost:3000/information/get_user_by_id?id=${data.idUser}`)
            .then((response) => response.json())
            .then((json) => {
                let data = json.data;
                let image = data.avatar;
                image = image.replace('hhttps', "https");
                setInfor({
                    avatar: image,
                    fullname: data.fullname,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        if (data.idUser.length !== 0) {
            getInforUser();
        }
        return;
    }, [data.idUser])
    return (
        <View
            style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: '#cccc'
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: infor.avatar }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                    }}
                />
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10, marginTop: 5 }}>{infor.fullname}</Text>
                    <Text style={{ fontSize: 14, marginLeft: 10,marginTop:3,color:'gray' }}>{data.time}</Text>
                </View>


            </View>
            <Text style={{ fontSize: 15, marginLeft: 10, marginVertical: 10}}>{data.content}</Text>
        </View>
    );
}
export default Post;