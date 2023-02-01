import React,{useState} from 'react'
import {Pressable,View,Image,StyleSheet,Text} from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
import RNPrint from 'react-native-print';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

const PrintComponent = ({data,getData,detailsData}) => {

    
    const [deleteConfirm,setDeleteConfirm] = useState(false);

    const createPDF=async()=>{
        var htmlContent;
        var total;
        htmlContent='<div>'+
        detailsData.map((item,index)=>{
            return(
            `
            <div>
            <div style='display:flex;flex-direction:row;align-items:center;justify-content:space-between;
            width: 60%;padding:0px 10px;margin: auto;background:#333333'>
            <h4 style='font-size: 20px;color:white'>${item.title}</h4>
            <h4 style='font-size: 20px;;color:white'>${item.value}</h4>
            </div>
            <hr style="width: 50%;margin: auto;"/>
        </div>   
            `
        )}

        )
        +
        data.map((entry,i)=>{
            total=0
        return(
            `<div>
            <br/><br/><br/>
        <h2 style='text-decoration:underline' >${entry.date}</h2>
        `+
        entry.hisaabArray.map((item,index)=>{
            total = total+Number(item.amount)
            return(
            `
            <div>
            <div style='display: flex;flex-direction: row;align-items: center;justify-content: space-between;
            width: 60%;margin: auto;padding:0px 10px;'>
            <h4 style='font-size: 20px;margin-top:0px'>${item.name}</h4>
            <h4 style='font-size: 20px;margin-top:0px'>${item.amount}</h4>
            </div>
            <hr style="width: 50%;margin: auto;"/>
        </div>   
            `
        )}

        )
        +
        `<div style='display: flex;flex-direction: row;align-items: center;justify-content: space-between;
        width: 60%;margin: auto;padding:0px 10px;background:red'>
        <h4 style='color:white;font-size: 20px;'>Total</h4>
        <h4 style='color:white;font-size: 20px;'>${total}</h4>
        </div>
`
        +'</div>'
        )

    })
        +'</div>'

        let options = {
          html: htmlContent,
          fileName: 'fileHere',
          directory: 'Hisaab',
        };
        // moment().format('DD/MMM/YYYY').toString()
        let results = await RNHTMLtoPDF.convert(options)
        await RNPrint.print({ filePath: results.filePath })  
    }

    handleDelete = async()=>{
        await AsyncStorage.removeItem('hisaabData');
        getData()
        setDeleteConfirm(false)
    }

    return (
    <View style={styles.container}>

         <Modal isVisible={deleteConfirm}>
        <View style={styles.modal}>
          <Text style={styles.confirmTxt}>Do you want to delete your data?</Text>

        <View style={styles.modalBtnMain}>
          <Pressable style={styles.noBtn} onPress={()=>setDeleteConfirm(false)}>
            <Text style={{color:'#333333'}}>No</Text>
        </Pressable>
          <Pressable style={styles.yesBtn} onPress={handleDelete}>
            <Text style={{color:'#fff'}}>Yes</Text>
        </Pressable>
        </View>

        </View>
      </Modal>

        <Pressable style={styles.deleteImgDiv}
        onPress={()=>setDeleteConfirm(true)}
        >
        <Image style={styles.deleteImg} source={require('./../assets/Delete.png')}  />
        </Pressable>
        <Pressable style={styles.imgDiv}
        onPress={createPDF}
        >
        <Image style={styles.img} source={require('./../assets/Print.png')}  />
        </Pressable>
    </View>
    )
}

export default PrintComponent

const styles = StyleSheet.create({
    img:{
        height:wp(8),
        width:wp(8),
    },
    container:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-end',
        flexDirection:'row',
        width:wp(96),
        marginLeft:wp(2)
    },
    imgDiv:{
        borderRadius:50,
        backgroundColor:'#333333',
        height:wp(12),
        width:wp(12),
        justifyContent:'center',
        alignItems:'center'
    },
    deleteImgDiv:{
        borderRadius:50,
        backgroundColor:'#EF2727',
        height:wp(12),
        width:wp(12),
        justifyContent:'center',
        alignItems:'center'
    },
    deleteImg:{
        height:wp(7),
        width:wp(5.5),
        borderRadius:5
    },
    modal:{
        backgroundColor:'#fff',
        width:wp(70),
        alignSelf:'center',
        paddingVertical:hp(3),
        paddingHorizontal:'5%',
        borderRadius:5
    },
    confirmTxt:{
        textAlign:'center',
        fontWeight:'500',
        fontSize:wp(4.5),
        color:'black'
    },
    modalBtnMain:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:hp(5)
    },
    yesBtn:{
        width:'40%',
        paddingVertical:hp(1),
        backgroundColor:'#EF2727',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderColor:'#EF2727',
        borderWidth:1,
        elevation:10,
        shadowColor:'#EF2727'

    },
    noBtn:{
        width:'40%',
        paddingVertical:hp(1),
        backgroundColor:'#f2f2f2',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#f2f2f2',
        borderRadius:5,
        elevation:5
        // borderColor:'#f2f2f2',
        // borderWidth:1
    }

})