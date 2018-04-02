import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class Home extends Component{
   render(){
       return(
           <View style={styles.container}>
               <Text style={styles.proText}>我是首页</Text>
           </View>
       )

   }
}
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#999',

   },
   proText:{
       textAlign:'center',
       fontSize:20,
       color:'red'
   }

});