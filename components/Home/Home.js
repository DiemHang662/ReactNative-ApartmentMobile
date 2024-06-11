import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';

const Home = () => {
    const images = [
        { uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' },
        { uri: 'https://bizweb.dktcdn.net/100/391/155/products/13eb0ff1-e693-47aa-8659-b969f4a72c91.jpg?v=1591751388583' },
        { uri: 'https://file.hstatic.net/1000288788/file/2.-vi-sao-ne-trang-tri-ban-cong-chung-cu-tu-trung-hieu-an-moc_156514b16e8342e7b524b0b62e0c96f8_grande.jpg' },
       
    ];

    const renderImage = ({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.imageSlide} />
    );

    return (
        <ScrollView>
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.imageList}
            />

        <View>
            <View style={styles.h1}>
                <Text style={styles.text}>GIỚI THIỆU</Text>
            </View>

            <View style={styles.intro}>
                <Text style={styles.text1}>
                    Tất cả các phòng tại đây đều sở hữu phong cách thiết kế hiện đại với đầy đủ các trang thiết bị tiện nghi, hiện đại, đem lại sự thoải mái tối đa cho kỳ nghỉ của du khách.
                </Text>
                <Image
                    source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }}
                    style={styles.imageIntro}
                />
            </View>

            <View style={styles.h1}>
                <Text style={styles.text}>VỊ TRÍ</Text>
            </View>

            <View style={styles.intro}>
                <Image
                    source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }}
                    style={styles.imageIntro}
                />
                <Text style={styles.text1}>
                    Tất cả các phòng tại đây đều sở hữu phong cách thiết kế hiện đại với đầy đủ các trang thiết bị tiện nghi, hiện đại, đem lại sự thoải mái tối đa cho kỳ nghỉ của du khách.
                </Text>
            </View>
           
        </View>

        <View style={styles.h1}>
            <Text style={styles.text}>HÌNH ẢNH THỰC TẾ</Text>
        </View>

        <View style={styles.content}>             
                
            <View style={styles.list1}>
                <Text style={styles.text2}>Phòng khách</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://decoxdesign.com/upload/images/thiet-ke-pk-chung-cu-nho-07-decox-design.jpg' }}
                    style={styles.image}
                />
                </View>
            </View>

            <View style={styles.list1}>
                <Text style={styles.text2}>Phòng bếp</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://katahome.com/wp-content/uploads/2021/11/phong-bep.jpg' }}
                    style={styles.image}
                />
                </View>
                </View>

            <View style={styles.list1}>
                <Text style={styles.text2}>Phòng ngủ</Text>
                <View style={styles.imageContainer}>
                 <Image
                    source={{ uri: 'https://noithattugia.com/wp-content/uploads/Phong-ngu-the-hien-ca-tinh-rieng-va-theo-so-thich-cua-chu-nhan-can-phong-noi-that-tu-gia.jpg' }}
                    style={styles.image}
                />
                </View>
                 </View>

            <View style={styles.list1}>
                <Text style={styles.text2}>Phòng tập gym</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://phumyhung.vn/wp-content/uploads/2020/11/Hung-Phuc-Premier-36-Copy.jpg' }}
                    style={styles.image}
                />
            </View>
        </View>

        <View style={styles.list1}>
            <Text style={styles.text2}>Cửa hàng tiện lợi</Text>
            <View style={styles.imageContainer}>
            <Image
                source={{ uri: 'https://songmoi.vn/sites/default/files/cua_hang_tien_loi.jpg?1433382853' }}
                style={styles.image}
            />
            </View>
        </View>


        <View style={styles.list1}>
            <Text style={styles.text2}>Sân vui chơi</Text>
            <View style={styles.imageContainer}>
            <Image
                source={{ uri: 'https://mangtruot.com/wp-content/uploads/2020/12/tu-van-lap-dat-khu-vui-choi-ngoai-troi-cho-tre-em-tai-khu-chung-cu-5.jpg' }}
                style={styles.image}
            />
            </View>
        </View>

        </View>         
    </View>
</ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageList: {
       marginBottom:30,
    },
    
    imageSlide: {
        width: 410, 
        height: 210, 
        marginBottom: 20,
    },

    list1:{
        width: '49%',
        marginBottom: 15,
    },

    image: {
        width: '98%', 
        height: 200, 
        borderWidth:1,
        borderColor:'green',
        },

    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        
    },

    h1:{
        width:'70%',
        borderTopWidth: 1, 
        borderTopColor: 'green', 
        borderBottomWidth: 0, 
        borderLeftWidth: 0, 
        borderRightWidth: 0, 
    },
    

    intro:{
        alignItems: 'center',
        marginBottom:30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center',
        margin:25,
    },

    text1:{
        width:'48%',
        padding:5,
        textAlign:'left',
    },

   imageIntro:{
        width:'48%',
        height:210,
    },

    text2: {
        position:'relative',
        backgroundColor: 'white',
        color: 'darkgreen',
        textAlign:'center',
        fontWeight:'bold',
        paddingHorizontal: 5,
        paddingVertical: 5,
        width:'98%',
        borderWidth:1,
        borderColor:'green',
        borderBottomWidth: 0, 
    },

});

export default Home;
