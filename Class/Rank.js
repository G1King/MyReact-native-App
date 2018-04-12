import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import Star from './Star';
export default class Rank extends Component{
    //给属性给予默认值
    static defaultProps = {
        index:0,
        title:null,
        star:null,
        img:null,
        large:null,
        id:null,
        average:null,
        directors:null,
        casts:[]
    }
    render(){
        const {navigate} = this.props.navigation;
        const {key,title,star,directors,average,index,casts,image,id} = this.props;

        return(
            <TouchableOpacity style={styles.container} onPress={()=>navigate('detail',{
                  id:id,
                }
            )}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.line}></View>
                        <Text style={{paddingRight:10,paddingLeft:10,color:'red'}}>{index+1}</Text>
                    <View style={styles.line}></View>
                </View>
                    <View style={styles.contentContainer}>
                        <View style={{marginLeft:15}}>
                            <Image style={{width:80,height:100}} source={{uri:image}}/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontWeight:'800',fontSize:18}}>{title}</Text>
                            <View style={{marginTop:10,marginBottom:10,flexDirection:'row'}}>
                                <Star value={star} />
                                <Text style={{color:'#9b9b9b',fontSize:11}}>{average}</Text>
                            </View>

                            <Text style={styles.gray}>导演:{directors}</Text>
                            <Text style={styles.gray}>主演:{casts.map((v,i,array)=>{
                                return v.name + (i!=2 ? '/':'')
                            })}</Text>
                        </View>
                    </View>
                <View>
                    <Text style={{color:'#494949'}}>影片ID:{id}</Text>
                </View>

            </TouchableOpacity>
        )

    }
}
 const styles = StyleSheet.create({
     container:{
         marginTop:15,
         paddingLeft:15,
         paddingRight:15,
         height:200
     },
     line:{
         width:65,
         height:1,
         backgroundColor:'#DEDEDE'
     },
     contentContainer:{
         flex:1,
         flexDirection:'row',
         alignItems:'center',
         marginTop:18,
         marginBottom:15,
         borderWidth:1,
         borderColor:'#ccc',
         borderRadius:2,

     },
        gray:{
        color:'#9B9B9B',
        fontSize:12,
        lineHeight:20,
            paddingRight:15,
    }
 })