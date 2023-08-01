import { FlatList, TextInput, Image, Text, View, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../style';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Posts = () => {
  const [dspost, setdspost] = useState([]);
  const [posts, setposts] = useState("");
  const [showdialog, setshowdialog] = useState(false);
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

  const getListpost = async () => {
    let url_api = 'http://10.24.0.156:3000/tb_posts';

    try {
      const response = await fetch(url_api); // load dữ liệu

      const json = await response.json(); // chuyển dữ liệu thành json

      setdspost(json);// đổ dữ liệu vào state
    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình load dữ liệu, kể cả có lỗi cũng gọi vào lệnh này
    }
  }

  useEffect(() => {
    getListpost();
  }, [dspost]);


  const renderposts = ({ item }) => {
    const xoaPost = () => {
      // link xóa
      let url_api_del = 'http://10.24.0.156:3000/tb_posts/' + item.id;

      fetch(url_api_del, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.status == 200) {

          }

        })
        .catch((ex) => {
          console.log(ex);
        });

    }

    const suapost = () => {
      // tạo đối tượng dữ liệu
      let objSP = { post: posts, image: img_base64 };
      let url_api = 'http://10.24.0.156:3000/tb_posts/' + item.id;

      fetch(url_api, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objSP)
      })
        .then((res) => {
          if (res.status == 201)
            alert("Sửa thành công")
          setshowdialog(false);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }

    const showAlert = () => {
      // Alert.alert('Tiêu đề','Nội dung thông báo',mảng_nút_bấm, option);
      Alert.alert('', 'Bạn có muốn xoá ?',
        [
          {
            text: "Yes",
            onPress: () => {
              xoaPost();
            }
          },
          {
            text: 'No', onPress: () => { return; }
          }
        ], {
        cancelable: true,
        onDismiss: () => {
          // khi người dùng bấm ra ngoài hộp thoại hoặc nút back
          console.log("Dialog bị tắt");
        }
      });
    }


    return (
      <View style={styles.khungpost}>
        <Modal visible={showdialog}
          onRequestClose={() => { setshowdialog(false) }}>
          <View style={{ padding: 10, justifyContent: 'center', marginTop: 30 }}>
            <View style={styles.hearder}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFF', fontWeight: 'bold' }}>New Post</Text>
            </View>

            <View style={styles.status}>
              <TextInput multiline={true} onChangeText={(txt) => { setposts(txt) }} style={{ padding: 5, fontSize: 18 }} defaultValue={item.post} />
              <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200 }} />
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#EEEFE7' }}>
              <View style={{ alignItems: 'flex-end', }}>
                <TouchableOpacity style={styles.submit} onPress={pickImage}>
                  <Text style={{ color: '#fff', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, alignItems: 'flex-end', }}>
                <TouchableOpacity style={styles.submit} onPress={suapost}>
                  <Text style={{ color: '#fff', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>





        <View>
          <Text style={styles.itemtxt}>{item.post}</Text>
          <Image style={{ width: "98%", height: 200, alignSelf: 'center', marginTop: 20 }} source={{ uri: item.image }} />
        </View>
        <Text style={{ margin: 10, borderBottomWidth: 2 }}></Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { setshowdialog(true) }} style={{ width: 60, height: 30, backgroundColor: '#FFB84C', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10 }}>
              <Text>Sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={showAlert} style={{ width: 60, height: 30, backgroundColor: '#FFB84C', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10 }}>
              <Text>Xoá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }


  return (
    <FlatList data={dspost}
      keyExtractor={(item_posts) => { return item_posts.id }}
      renderItem={renderposts} />
  )
}

export default Posts;