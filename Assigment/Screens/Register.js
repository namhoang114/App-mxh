import { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleSVG from '../assets/Image/Google.svg';
import styles from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [fullname, setfullname] = useState("");

  const doReg = async () => {
    if (username.length == 0) {
      alert('Chưa nhập usename'); return;
    }
    if (password.length == 0) {
      alert('Chưa nhập Password'); return;
    }
    //fletch dữ liệu
    let url_check_username = "https://6512-2001-ee0-41c1-9429-f9ef-2ad2-1672-56e1.ngrok-free.app/api/listusers?username=" + username;

    try {
      const response = await fetch(url_check_username);
      const responseData = await response.json();

      if (responseData.status === 1) {
        Alert.alert("Error", "Username đã tồn tại");
      } else {
        const objUser = { username, password, fullname }; // Tạo đối tượng khách hàng mới

        let url_req =
          "https://6512-2001-ee0-41c1-9429-f9ef-2ad2-1672-56e1.ngrok-free.app/api/regusers";

        // Gửi yêu cầu POST để đăng kí khách hàng mới
        const registerResponse = await fetch(url_req, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objUser),
        });

        const registerData = await registerResponse.json();

        if (registerData.status !== 1) {
          Alert.alert(
            "Lỗi",
            "Đăng kí chưa thành công"
          );
        } else {
          navigation.navigate("Login");
          Alert.alert("Thành công", "Đăng kí thành công");
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi vui lòng thử lại sau");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignSelf: 'center' }}>
          <Image source={require('../assets/Logo.png')} style={{ height: 200, width: 200, marginBottom: 20 }} />
        </View>
        <Text style={{ fontSize: 28, fontWeight: '500', marginBottom: 10, fontWeight: 'bold' }}>ĐĂNG KÝ</Text>
        {/* <Button title='Home' onPress={() => navigation.navigate("Home")}></Button> */}
        <View style={styles.textinputlogin}>
          <TextInput onChangeText={(txt) => { setusername(txt) }} placeholder='Ten dang nhap' style={{ flex: 1, paddingVertical: 0 }} />
        </View>
        <View style={styles.textinputlogin}>
          <TextInput onChangeText={(txt) => { setpassword(txt) }} placeholder='Mat khau' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} textContentType="password" />
        </View>
        <View style={styles.textinputlogin}>
          <TextInput onChangeText={(txt) => { setfullname(txt) }} placeholder='Họ tên đầy đủ' style={{ flex: 1, paddingVertical: 0 }}/>
        </View>

        <TouchableOpacity onPress={doReg} style={styles.btnlogin}>
          <Text style={styles.logintxt}>Đăng ký</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>Hoặc đăng ký bằng...</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.facebook}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebook}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebook}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/fb.png')} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text>Đã có tài khoản ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#ad40af', fontWeight: '700' }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}