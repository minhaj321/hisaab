import React from 'react'
import {View,Text,ImageBackground} from 'react-native'
import HomeBg from './../assets/bgImg.png'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'

const HeaderComponent = () => {
  return (
    <ImageBackground source={HomeBg} style={{height:hp(25),width:wp(100),marginTop:hp(0),marginBottom:hp(0),flexDirection:'row',transform:[{scaleY:1}]}}>
    <View style={{alignItems:'center',width:wp(100),height:'100%',justifyContent:'center'}}>
    <Text style={{color:'#fff',fontSize:wp(8),letterSpacing:2}}>HISAAB</Text>
    <View style={{width:wp(15),height:hp(0.5),backgroundColor:'#fff',marginTop:hp(2)}}></View>
    </View>
    </ImageBackground>
  )
}

export default HeaderComponent