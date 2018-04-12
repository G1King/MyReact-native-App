import React ,{Component} from 'react';
import {View,Image,StyleSheet,Text} from 'react-native';
import PropTypes from 'prop-types';
export  default class Star extends Component{
  static defaultProps = {
      value:'35',
      width:12,
      height:12
  }
  static propTypes = {
      value:PropTypes.string.isRequired,
    }

  _startRender = (props) => {
      const {width,height,value} = props;
      const results = [];
      let  flag = true;
      if (value == '00'){
          return <Text style={styles.smallFont}>暂无评分</Text>
      }
      for (let i = 0; i<5 ; i++){
          if ( i < value[0]){
              results.push(<Image source={require('../resources/star-full.png')} style={{width:width,height:height}}/>)
          } else {
              if (flag && value[1] == '5'){
                  flag = false;
                  results.push(<Image source={require('../resources/star-half.png')} style={{width:width,height:height}}/>)
              } else {
                  results.push(<Image source={require('../resources/star-empty.png')} style={{width:width,height:height}}/>)
              }
          }
      }
      return results;
  }

  render(){
      return(
          <View style={{flexDirection:'row'}}>
              {this._startRender(this.props)}
          </View>
      )
  }
}
const styles = StyleSheet.create({
    smallFont: {
        lineHeight: 20,
        color: '#A6A6A6',
        fontSize: 12
    },
    star:{
        marginRight: 2,
    }
})