import React,{useState,useEffect} from 'react'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {View,Text,Pressable,TextInput,Button,StyleSheet} from 'react-native'

const FormComponent = ({handleSubmit}) => {

    const [name,setName] = useState('')
    const [amount,setAmount] = useState(0)


  return (
    <View style={styles.container}>
        <TextInput value={name} onChangeText={val=>setName(val)} style={styles.input} placeholder='Item Name' />
        <TextInput value={amount} onChangeText={val=>setAmount(val)} style={styles.input} keyboardType='number-pad'  placeholder='Item Amount' />
        <Pressable  style={styles.button} onPress={()=>{
            handleSubmit(name,amount)
            setName('');
            setAmount(0);
        }
        }>
            <Text style={styles.txt}>
        Add
            </Text>
        </Pressable>
    </View>
  )
}

export default FormComponent

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:hp(2)
    },
    txt:{
        color:'#fff',
        fontSize:wp(4)
    },
    button:{
        backgroundColor:'#333333',
        minWidth:wp(35),
        marginTop:hp(4),
        height:hp(5),
        textTransform:'capitalize',
        borderRadius:50,
        color:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:wp(90),
        backgroundColor:'#f2f2f2',
        marginTop:hp(2),
        color:'#333333',
        borderRadius:10,
        paddingHorizontal:20,
        shadowColor:'black',
        elevation:20
    }
})