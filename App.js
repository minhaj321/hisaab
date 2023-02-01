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
import TabsComponent from './components/TabsComponent.js';
import DetailsComponent from './components/DetailsComponent.js';
import moment from 'moment';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';


function App(){

  const [refresh,setRefresh] = useState(0)
  var [data,setData] = useState([])
  const [currentTab,setCurrentTab] = useState('daily')
  var [detailsData,setDetailsData] = useState([
    {title:'Grand Total',value:0},
    {title:'Start Date',value:'---'},
    {title:'Total Days',value:0},
    {title:'Entry Days',value:0},
    {title:'Pay / Day',value:0},
    {title:'Pay / Month',value:0},
])
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    handleGrandTotal()
    handleDates()
},[data])


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

// total calculator in details
  const handleGrandTotal =()=>{
    detailsData[0].value=0
    data?.map((hisaabArray,index)=>{
        hisaabArray?.hisaabArray?.map((item,innerIndex)=>{
          detailsData[0].value = detailsData[0].value + Number(item.amount)
        })
    })
    // Pay / Day
    detailsData[4].value= Math.floor(detailsData[0].value/data.length) + ' Rs'

    // Pay / Month
    detailsData[5].value= Math.floor((detailsData[0].value/data.length)*30 ) + ' Rs'

    // Grand Total
    detailsData[0].value= detailsData[0].value + ' Rs'        
    setRefresh(prev=>prev+1)
} 

// handle details date entries
const handleDates = ()=>{
  detailsData[1].value = data[data.length-1]?.date
    var prev = moment(detailsData[1].value,'DD/MMM/YYYY');
    detailsData[2].value = moment().diff(prev,'days') + ' days';

    detailsData[3].value = data.length + ' entries';
    setRefresh(prev=>prev+1)
}

  return (
    <SafeAreaView style={{minHeight:hp(100),backgroundColor:'#f2f2f2'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
          <HeaderComponent />
          <PrintComponent data={data}  detailsData={detailsData} getData={getData} />
          <FormComponent handleSubmit={handleSubmit} />
         
         <TabsComponent setCurrentTab={setCurrentTab} currentTab={currentTab} />
         {
          currentTab=='daily' &&
          <DataTableComponent handleClose={handleClose}  data={data} />
         }
         {
          currentTab=='details' &&
          <DetailsComponent data={detailsData} />
         }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
