import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from './colors';


const datas = [
    {
        name: 'Mark Zuckerberg',
        image: 'https://www.nydailynews.com/resizer/7JCjE4Azz_ujlEyYBPq9AFYRWC8=/1200x800/top/cloudfront-us-east-1.images.arcpublishing.com/tronc/TNQ5KBGVINGAJLPWUBUBOIMPHY.jpg',
    },
    {
        name: 'Elon Musk',
        image: 'https://www.biography.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTY2MzU3ODcyNjM1MDI5MTY2/spacex_ceo_elon_musk_visits_nnc_and_afspc_190416-f-zz999-006_cropped.jpg',
    },
    {
        name: 'Emma Watson',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Emma_Watson_interview_in_2017.jpg',
    },
    {
        name: 'Steve Jobs',
        image: 'https://image.cnbcfm.com/api/v1/image/100496736-steve-jobs-march-2011-getty.jpg?v=1513863842&w=1400&h=950',
    },
];

const Stories = () => {
    const renderItem = item => (
        <LinearGradient
            colors={colors.gradients.primary}
            key={item.name}
            style={styles.itemContainer}>
            <View style={styles.itemImgWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="cover" />
            </View>
        </LinearGradient>
    );

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {datas.map(renderItem)}
        </ScrollView>
    );
};
export default Stories;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 8,
    },
    itemContainer: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    itemImgWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    itemImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});