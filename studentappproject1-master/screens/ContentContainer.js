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

const { width } = Dimensions.get('window');

const datas = [
    {
        username: 'billgates',
        profile: 'https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg',
        image: 'https://hinhanhdephd.com/wp-content/uploads/2017/06/top-100-hinh-nen-thien-nhien-phong-canh-dep-6-1.jpg',
        likes: 1242,
        comments: 24,
    },
    {
        username: 'markzuckerberg',
        profile: 'https://stc.bindo.vn/uploads/products/details/tranh-phong-canh-nui-non-tuyet-dep-fuji-va-chua-chureito-do-voi-hoa-anh-dao-sakura-nhat-ban--279.jpg',
        likes: 2402,
        comments: 31,
    },
    {
        username: 'elonmusk',
        profile: 'https://www.biography.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTY2MzU3ODcyNjM1MDI5MTY2/spacex_ceo_elon_musk_visits_nnc_and_afspc_190416-f-zz999-006_cropped.jpg',
        image: 'https://123anhdep.net/wp-content/uploads/2016/03/bst-hinh-anh-phong-canh-thien-nhien-tuyet-dep-lang-man-tho-mong-hung-vi-nhat-the-gioi-1.jpeg',
        likes: 3210,
        comments: 32,
    },
    {
        username: 'Emma',
        profile: 'https://revelogue.com/wp-content/uploads/2020/02/Hinh-anh-cua-emma-watson-e1581709329931.jpg',
        image: 'https://travelgear.vn/blog/wp-content/uploads/2019/08/dia-diem-du-lich-va-canh-dep-nhat-ban.jpg',
        likes: 4039,
        comments: 45,
    },
    {
        username: 'stevejobs',
        profile: 'https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950',
        image: 'https://tranhphongcanhdep.com.vn/wp-content/uploads/2018/07/Tranh-phong-canh-nhat-ban-nuoc-ngoai-hoa-anh-dao-nui-sep-Amia-991_120x200.jpg',
        likes: 5212,
        comments: 90,
    },
];

const ContentContainer = () => {
    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postTopWrapper}>
                <View style={styles.postAuthorWrapper}>
                    <Image
                        source={{ uri: item.profile }}
                        resizeMode="cover"
                        style={styles.postProfileImg}
                    />
                    <Text style={styles.postUsername}>{item.username}</Text>
                </View>

                <Icon
                    style={styles.postMoreIcon}
                    name="ios-more"
                    size={24}
                    color={colors.gray}
                />
            </View>

            <Image source={{ uri: item.image }} resizeMode="center" style={styles.postImage} />

            <View style={styles.postBottomWrapper}>
                <View style={styles.postBottomLeftWrapper}>
                    <View style={styles.postDetailContainers}>
                        <Icon
                            style={styles.postDetailIcon}
                            name="ios-heart"
                            size={30}
                            color={colors.maroon}
                        />
                        <Text style={styles.postDetailNumbers}>{item.likes}</Text>
                    </View>
                    <View style={styles.postDetailContainers}>
                        <Icon
                            style={styles.postDetailIcon}
                            name="ios-chatbubbles"
                            size={30}
                            color="black"
                        />
                        <Text style={styles.postDetailNumbers}>{item.likes}</Text>
                    </View>
                </View>

                <Icon name="ios-bookmark" size={24} color="black" />
            </View>
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
export default ContentContainer;

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
    postMoreIcon: {
        transform: [{ rotate: '90deg' }],
        marginRight: 8,
    },
    postImage: {
        width: width - 32,
        height: 400,
        marginHorizontal: 8,
        borderRadius: 18,
    },
    postBottomWrapper: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        padding: 8,
    },
    postBottomLeftWrapper: {
        flexDirection: 'row',
    },
    postDetailContainers: {
        marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postDetailIcon: {
        marginRight: 8,
    },
    postDetailNumbers: {
        fontSize: 12,
    },
});