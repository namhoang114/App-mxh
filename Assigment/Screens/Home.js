import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../style'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Home = ({ navigation }) => {
  const [post, setpost] = useState("");
  const [img_base64, setimg_base64] = useState(null);

  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh 
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


      FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setimg_base64("data:image/" + file_ext + ";base64," + res);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });
    }
  }

  const doPost = async () => {
    if (post.length == 0) {
      alert("Không để trống post !"); return;
    }
    // tạo đối tượng dữ liệu
    let url_post = 'https://6512-2001-ee0-41c1-9429-f9ef-2ad2-1672-56e1.ngrok-free.app/api/post';
    const objPost =  {post, image: img_base64}

    const postRespone = await fetch(url_post, {
      method: 'POST',
      headers: {  
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objPost)
    })
    console.log(postRespone);
    const postData = await postRespone.json();
    if (postData.status !== 1) {
      alert('Post thất bại');
    } else {
      navigation.navigate('NewFeed');
      alert("Post thành công");
    }
  }

  return (
    <View style={{ padding: 10, justifyContent: 'center', marginTop: 30 }}>
      <View style={styles.hearder}>
        <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFF', fontWeight: 'bold' }}>New Post</Text>
      </View>

      <View style={styles.status}>
        <TextInput multiline={true} onChangeText={(txt) => { setpost(txt) }} style={{ padding: 5, fontSize: 18 }} placeholder='Hãy viết vào đây...'></TextInput>
        <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200 }} />
      </View>

      <View style={{ flexDirection: 'row', backgroundColor: '#EEEFE7' }}>
        <View style={{ alignItems: 'flex-end', }}>
          <TouchableOpacity style={styles.submit} onPress={pickImage}>
            <Text style={{ color: '#fff', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end', }}>
          <TouchableOpacity style={styles.submit}  onPress={doPost}>
            <Text style={{ color: '#fff', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Home;