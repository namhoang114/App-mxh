import { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const doLogin = async () => {
    //kiểm tra hợp lệ dữ liệu
    if (username.length == 0) {
      alert('Chưa nhập usename'); return;
    }
    if (password.length == 0) {
      alert('Chưa nhập Password'); return;
    }
    //fletch dữ liệu
    let url_check_login = "https://6512-2001-ee0-41c1-9429-f9ef-2ad2-1672-56e1.ngrok-free.app/api/listusers?username=" + username;

    try {
      const response = await fetch(url_check_login);
      const responeData = await response.json();

      if (responeData.status !== 1) {
        alert('username không tồn tại');
      } else {
        const objUser = responeData.data[0];

        if (objUser.password !== password) {
          alert('Sai mật khẩu')
        } else {
          try {
            await AsyncStorage.setItem('loginInfo', JSON.stringify(objUser));
            navigation.navigate('NewFeed');
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert('Đã xảy ra lỗi')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignSelf: 'center' }}>
          <Image source={require('../assets/Logo.png')} style={{ height: 200, width: 200, marginBottom: 20 }} />
        </View>
        <Text style={{ fontSize: 28, fontWeight: '500', marginBottom: 10, fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
        {/* <Button title='Home' onPress={() => navigation.navigate("Home")}></Button> */}
        <View style={styles.textinputlogin}>
          <TextInput onChangeText={(txt) => { setusername(txt) }} placeholder='Ten dang nhap' style={{ flex: 1, paddingVertical: 0 }} />
        </View>
        <View style={styles.textinputlogin}>
          <TextInput onChangeText={(txt) => { setpassword(txt) }} placeholder='Mat khau' style={{ flex: 1, paddingVertical: 0 }} secureTextEntry={true} textContentType="password" />
          <TouchableOpacity>
            <Text style={styles.quenmatkhau}>Forgot ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={doLogin} style={styles.btnlogin}>
          <Text style={styles.logintxt}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: '#666',}}>Hoặc đăng nhập bằng...</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginTop: 20, marginBottom: 20}}>
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

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Chưa có tài khoản ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#ad40af', fontWeight: '700' }}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}