import React from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Image,
    Text,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from './colors';
import { Title } from 'react-native-paper';

const { width } = Dimensions.get('window');

const datas = [
    {
        username: 'billgates',
        profile: 'https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg',
        message:'Hello,How are you'
    },
    {
        username: 'markzuckerberg',
        profile: 'https://stc.bindo.vn/uploads/products/details/tranh-phong-canh-nui-non-tuyet-dep-fuji-va-chua-chureito-do-voi-hoa-anh-dao-sakura-nhat-ban--279.jpg',
        message: 'Nice to meet you.I am Mark'
    },
    {
        username: 'elonmusk',
        profile: 'https://www.biography.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTY2MzU3ODcyNjM1MDI5MTY2/spacex_ceo_elon_musk_visits_nnc_and_afspc_190416-f-zz999-006_cropped.jpg',
        message: 'Can I help you?'
    },
    {
        username: 'Emma',
        profile: 'https://revelogue.com/wp-content/uploads/2020/02/Hinh-anh-cua-emma-watson-e1581709329931.jpg',
        message: 'Nice to chat with you'
    },
    {
        username: 'stevejobs',
        profile: 'https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950',
        message: 'You are lucky to talk with me'
    },
    {
        username: 'stevejobs2',
        profile: 'https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950',
        message: 'You are lucky to talk with me'
    },
];

const ContentContainerforChat = () => {
    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postTopWrapper}>
                <View style={styles.postAuthorWrapper}>
                    <Image
                        source={{ uri: item.profile }}
                        resizeMode="cover"
                        style={styles.postProfileImg}
                    />
                    <Title style={styles.postUsername}>{item.username}</Title>
                </View>

            </View>

            <Text style={styles.postMessage}>{item.message}</Text>

            
        </View>
    );
    return (
        <FlatList
            data={datas}
            keyExtractor={item => item.username}
            renderItem={renderItem}
            style={styles.container}
            showsVerticalScrollIndicator={false}
        />
    );
};
export default ContentContainerforChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postContainer: {
        backgroundColor: 'white',
        width: width - 16,
        marginVertical: 8,
        borderRadius: 18,
    },
    postTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postAuthorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postProfileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
    },
    postUsername: {
        fontWeight: '600',
    },
    
    postMessage: {
        width: width - 32,
        height: 20,
        marginLeft:60,
        marginTop:-10,
        
    },
});