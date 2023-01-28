import React, { useState } from 'react'
import {View,Pressable,Text,StyleSheet,Image} from 'react-native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CloseIcon from './../assets/Close.png'

const DataTableComponent = ({data,handleClose}) => {

    var [total,setTotal]=useState(0)

    return (
    <View style={styles.container}>
        {   data &&
        data.map((entry,i)=>{
            total=0;
            return(
            <View key={i} style={{width:'100%'}}>
                <Text style={styles.date}>{entry.date}</Text>
                {
                    entry?.hisaabArray?.map((item,index)=>{
                        total = total+Number(item.amount)
                        return(
                        <View key={index} style={styles.main}>
                            <View style={{...styles.firstDiv,...styles.common}}>
                                <Pressable style={styles.close}
                                onPress={()=>handleClose(i,index)}
                                >
                                <Image style={styles.closeImg} source={require('./../assets/Close.png')} />
                                </Pressable>
                            </View>
                            <View style={{...styles.secondDiv,...styles.common}}>
                            <Text>
                                {item.name}
                                </Text>

                            </View>
                            <View style={{...styles.thirdDiv,...styles.common}}>
                            <Text>
                                {item.amount} Rs
                                </Text>
                            </View>

                        </View>
                    )
                    }
                    )
                }
                        <View style={styles.main}>
                        <View style={styles.firstDiv}>
                                {/* <Image style={styles.closeImg} source={require('./../assets/Close.png')} /> */}
                            </View>
                            <View style={{...styles.secondDiv,...styles.common,...styles.total}}>
                            <Text style={styles.totalTxt}>
                                Total
                                </Text>

                            </View>
                            <View style={{...styles.thirdDiv,...styles.common,...styles.total}}>
                            <Text style={styles.totalTxt}>
                                {total} Rs
                                </Text>
                            </View>
                        </View>            
            </View>
            )
        })
        }
    </View>
  )
}

export default DataTableComponent

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
    width:'100%',
    justifyContent:'space-between',
    marginTop:hp(1)
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