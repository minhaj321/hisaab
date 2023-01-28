import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FormComponent from './components/FormComponent';
import DataTableComponent from './components/DataTableComponent';
import HeaderComponent from './components/HeaderComponent.js';
import PrintComponent from './components/PrintComponent.js';
import moment from 'moment';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';


function App(){

  const [refresh,setRefresh] = useState(0)
  var [data,setData] = useState([])

  useEffect(()=>{
    getData();
  },[])


  // fetching data function
  const getData = async()=>{
    var totalData = await AsyncStorage.getItem('hisaabData');
    if(totalData==null){
      totalData = [];
    }else{
      totalData = JSON.parse(totalData);
    }
    setData(totalData)
    setRefresh(prev=>prev+1)
  }

  // new entry function
  const handleSubmit=(name,amount)=>{
    if(name=='' || amount==0){
    }
    else{
      var findIndex = data?.findIndex(item=>item.date==moment().format('DD/MMM/YYYY'))
      if(findIndex!=-1){
        // date already exist
        data[0].hisaabArray = [{name,amount},...data[0].hisaabArray];
      }
      else{
        // date doesn't exist
        data = [{
          date:moment().format('DD/MMM/YYYY'),
          hisaabArray : [
            {name,amount},
              ]
        },...data];
      }
      setData(data)
      setRefresh(prev=>prev+1)
      
      AsyncStorage.setItem('hisaabData',JSON.stringify(data) )
    }
  }

  // delete item
  const handleClose = (mainIndex,subIndex)=>{

    if(data[mainIndex].hisaabArray.length==1){

      data = [...data.slice(0,mainIndex),...data.slice(mainIndex+1)]
    }else{
      data[mainIndex] = {
        date:data[mainIndex].date,
        hisaabArray:data[mainIndex].hisaabArray.filter((item,index)=>index!=subIndex)
      };
    }

    setData(data)
    AsyncStorage.setItem('hisaabData',JSON.stringify(data) )
    setRefresh(prev=>prev+1)


  }

  return (
    <SafeAreaView style={{minHeight:hp(100),backgroundColor:'#f2f2f2'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
          <HeaderComponent />
          <PrintComponent data={data} getData={getData} />
          <FormComponent handleSubmit={handleSubmit} />
          <DataTableComponent handleClose={handleClose}  data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
