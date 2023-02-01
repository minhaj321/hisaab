import React from 'react'
import {View,Text,Pressable,StyleSheet} from 'react-native'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

const TabsComponent = ({currentTab,setCurrentTab}) => {
  return (
    <View style={styles.container}>
        <Pressable style={currentTab=='daily' ? styles.selected : styles.unselected}
        onPress={()=>setCurrentTab('daily')}
        >
            <Text style={currentTab=='daily' ? styles.selectedTxt : styles.unselectedTxt}>Daily Data</Text>
        </Pressable>

        <Pressable style={currentTab=='daily' ? styles.unselected : styles.selected}
        onPress={()=>setCurrentTab('details')}
        >
        <Text style={currentTab=='daily' ? styles.unselectedTxt : styles.selectedTxt}>Details</Text>
        </Pressable>
    </View>
  )
}

export default TabsComponent

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        marginTop:hp(6),
        borderColor:'#fafafa',
        borderWidth:5,
        borderRadius:10,
        overflow:'hidden',
        width:wp(90),
        marginLeft:wp(5),
        elevation:10,
        shadowColor:'#333333'
    },
    selected:{
        width:wp(45),
        height:hp(6),
        backgroundColor:'#333333',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    unselected:{
        width:wp(45),
        height:hp(6),
        backgroundColor:'#fff',
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },
    selectedTxt:{
        color:'#fff'
    },
    unselectedTxt:{
        color:'#333333'
    }
})