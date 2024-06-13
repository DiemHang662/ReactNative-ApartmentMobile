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

            <View>
                <Text style={styles.h1}>GIỚI THIỆU</Text>
            </View>

            <View style={styles.intro}>
                <Text style={styles.textIntro}> GOLDEN SEA xin gửi đến quý khách hàng lời chúc tốt đẹp nhất & lời cảm ơn quý khách đã quan tâm đến chung cư chúng tôi
                </Text>
                <Image
                    source={{ uri: 'https://xaydungnhatrongoi.vn/wp-content/uploads/2023/09/1-9.jpg' }}
                    style={styles.imageIntro}
                />
            </View>

            <View>
                <Text style={styles.h2}>VỊ TRÍ</Text>
            </View>

            <View style={styles.intro}>
                <Image
                    source={{ uri: 'https://thuanhunggroup.com/wp-content/uploads/2022/08/Saigon-Peninsula-Qua%CC%A3%CC%82n-7-Viva-Land.jpeg' }}
                    style={styles.imageIntro}
                />
                
                <Text style={styles.textIntro}>  Đường Đào Trí, Phú Thuận, Q7, TP.HCM. Nằm kế cạnh khu đô thị Peninsula được đầu tư 6 tỷ USD</Text>
            
            </View>
           
        </View>

        <View style={styles.h3}>
            <Text style={styles.text}>HÌNH ẢNH THỰC TẾ</Text>
        </View>

        <View style={styles.content}>             
                
            <View style={styles.list1}>
                <Text style={styles.text1}>Phòng khách</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://decoxdesign.com/upload/images/thiet-ke-pk-chung-cu-nho-07-decox-design.jpg' }}
                    style={styles.image}
                />
                </View>
            </View>

            <View style={styles.list1}>
                <Text style={styles.text1}>Phòng bếp</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://katahome.com/wp-content/uploads/2021/11/phong-bep.jpg' }}
                    style={styles.image}
                />
                </View>
                </View>

            <View style={styles.list1}>
                <Text style={styles.text1}>Phòng ngủ</Text>
                <View style={styles.imageContainer}>
                 <Image
                    source={{ uri: 'https://noithattugia.com/wp-content/uploads/Phong-ngu-the-hien-ca-tinh-rieng-va-theo-so-thich-cua-chu-nhan-can-phong-noi-that-tu-gia.jpg' }}
                    style={styles.image}
                />
                </View>
                 </View>

            <View style={styles.list1}>
                <Text style={styles.text1}>Phòng tập gym</Text>
                <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://phumyhung.vn/wp-content/uploads/2020/11/Hung-Phuc-Premier-36-Copy.jpg' }}
                    style={styles.image}
                />
            </View>
        </View>

        <View style={styles.list1}>
            <Text style={styles.text1}>Cửa hàng tiện lợi</Text>
            <View style={styles.imageContainer}>
            <Image
                source={{ uri: 'https://songmoi.vn/sites/default/files/cua_hang_tien_loi.jpg?1433382853' }}
                style={styles.image}
            />
            </View>
        </View>


        <View style={styles.list1}>
            <Text style={styles.text1}>Sân vui chơi</Text>
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
       marginBottom:25,
    },
    
    imageSlide: {
        width: 410, 
        height: 220, 
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
        width:'45%',
        borderTopWidth: 1, 
        borderTopColor: 'green', 
        textAlign:'center',
        marginRight:200,
        fontSize:25,
        fontWeight:'bold',
        color:'green',
        padding:15,

    },
    
    h2:{
        width:'40%',
        borderTopWidth: 1, 
        borderTopColor: 'green', 
        textAlign:'center',
        marginLeft:220,
        fontSize:25,
        fontWeight:'bold',
        color:'green',
        padding:15,

    },
    

    h3:{
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

    textIntro:{
        width:'45%',
        padding:5,
        textAlign:'justify',
        fontSize:20,
        fontStyle:'italic',
    },

   imageIntro:{
        width:'50%',
        height:220,
    },

    text1: {
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
