import moment from 'moment';
import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetailsComponent = ({data}) => {


  return (
    <>
    {
        data.map((item,index)=>(
    <View style={styles.main} key={index}>
        <View style={{...styles.secondDiv,...styles.common,...styles.total}}>
        <Text style={styles.totalTxt}>
            {item.title}
            </Text>

        </View>
        <View style={{...styles.thirdDiv,...styles.common,...styles.total}}>
        <Text style={styles.totalTxt}>
             {item.value}
            </Text>
        </View>
    </View>      
        ))
    }
    </>
  )
}

export default DetailsComponent

const styles = StyleSheet.create({
    container:{
        width:wp(96),
        marginLeft:wp(2),
        alignItems:'flex-start',
        paddingBottom:hp(10)
    },
    date:{
        color:'#333333',
        fontSize:wp(6),
        marginTop:hp(10),
        marginBottom:hp(1)
    },
    main:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'90%',
        justifyContent:'space-between',
        marginTop:hp(2),
        marginLeft:'5%'
    },
    firstDiv:{
        width:wp(8),
        height:wp(8),
    },
    secondDiv:{
        width:wp(43),
        height:hp(6),
        overflow:'hidden'
    },
    thirdDiv:{
        width:wp(43),
        height:hp(6),
        overflow:'hidden'
    },
    common:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#afafaf',
        borderWidth:1,
        borderRadius:50,
        borderTopWidth:0,
        borderBottomWidth:0,
        elevation:20,
        backgroundColor:'#fff'
    },
    closeImg:{
        color:'#333333',
        height:wp(4),
        width:wp(4)
    },
    total:{
        backgroundColor:'#333333',
    },
    totalTxt:{
        color:'#fff'
    },
    close:{
    
    }
    })