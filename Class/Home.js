import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import PlayList from './PlayList/PlayList'
export default class Home extends Component{
    static navigationOptions = {
        headerTitle:'首页',
       headerBackTitle:null

    }

   render(){
       return(
           <View style={styles.container}>
              <PlayList navigation={this.props.navigation} />
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