import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import styles from '../style'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './Home';
import Posts from './Posts';
import Follow from './Follow';

const Tab = createMaterialTopTabNavigator();


const NewFeed = ({ navigation }) => {
    return (

        <View style={{ padding: 10, justifyContent: 'center', marginTop: 30 }}>
            <View style={styles.hearder1}>
                <Text style={{ alignSelf: 'center', fontSize: 20, color: '#FFF', fontWeight: 'bold', marginTop: 20 }}>Bảng tin</Text>
                <Tab.Navigator screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 , fontWeight: 'bold', color: '#fff'},
                    tabBarStyle: { backgroundColor: '#ad40af'},
                }}>
                    <Tab.Screen name="Posts" component={Posts} />
                    <Tab.Screen name="Follow" component={Follow} />
                </Tab.Navigator>
            </View>

            <View style={{ alignItems: 'flex-end', backgroundColor: '#EEEFE7', }}>
                <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate("Home")}>
                    <Text style={{ color: '#fff', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Tạo Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NewFeed;