import React, { useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { firebaseApp } from '../../FirebaseConfig';

const database = firebaseApp.database();


const Like = ({ idPost, idUser }) => {

    const [status, setStatus] = React.useState(false);


    const checkStatus = () => {
        database.ref('post/' + idPost + '/like/' + idUser)
            .on('value', function (snapshot) {
                let data = snapshot.val();
                if (data == null){
                    setStatus(false);
                }else {
                    //console.log(snapshot);
                    setStatus(snapshot.val().status);
                }
            })
    }

    useEffect(() => {
        checkStatus();
        return;
    }, [])
    return (
        <TouchableOpacity
            onPress={async () => {

                await database.ref('post/' + idPost + '/like/' + idUser)
                    .set({
                        status: !status
                    })
                await setStatus(!status);
            }}
            style={{
                flex: 1 / 2,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {
                status ?
                    (<AntDesign
                        name='heart'
                        size={30}
                        color='#FF3333'
                    />) : (
                        <AntDesign
                            name='hearto'
                            size={30}
                            color='#FF3333'
                        />
                    )
            }
        </TouchableOpacity>
    );
}
export default Like;