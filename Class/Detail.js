import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import API from "../Config/APIConfig";
import Widnow from '../Config/Maco';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 3,
            ready: true
        }
    }

    static navigationOptions = {
        headerTitle: '详情',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2A362C',
            opacity: 1,
        },
        headerRight: <Button title='分享' style={{color: 'red'}} onPress={() => alert('点击了分享')}/>,

    }

    componentDidMount() {
        this._fetchServerData();
    }

    _fetchServerData = () => {
        const id = this.props.navigation.state.params.id;
        let params = new FormData();
        params.append('apiKey', '0b2bdeda43b5688921839c8ecb20399b');
        params.append('city', '北京');
        params.append('client', 'something');
        params.append('udid', 'dddddddddddddddddddddd');
        fetch(`${API.movieInfo_Url}/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: params
        }).then(response => response.json()).then(data => {
            this.setState({
                ready: false,
                data: data,
            });
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {

        const {
            title,
            year,
            countries,
            genres,
            summary,
            ratings_count,
            mainland_pubdate,
            durations,
            photos,
            images,
            casts,
            rating,
            popular_comments
        } = this.state.data;
        console.log(images);
        console.log(this.state.data);
        return (
            <ScrollView bounces={false}
            >
                {
                    this.state.ready ? <ActivityIndicator size='large' style={{marginTop: 200}}/> :

                        <View style={styles.container}>
                            /*图片背景*/
                            <View style={styles.poster}>
                                <Image style={styles.posterImage} source={{uri: images.large}}/>
                            </View>

                            /*电影信息*/
                            <View style={styles.movieContainer}>
                                <View>
                                    <Text style={styles.movieTitle}>{title}</Text>
                                    <Text style={styles.otherMovieInfo}>{year}/{countries}/{genres}</Text>
                                    <Text style={styles.otherMovieInfo}>上映时间:{mainland_pubdate}({countries})</Text>
                                    <Text style={styles.otherMovieInfo}>片长{durations}</Text>
                                </View>
                                <View style={styles.infoSquare}>
                                    <Text style={styles.otherMovieInfo}>豆瓣评分</Text>
                                    <Text style={{fontSize: 20, fontWeight: '600'}}>{rating.average}</Text>
                                    //查个星星
                                    <Text style={styles.otherMovieInfo}>{ratings_count}人</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.seeButton}>
                                    <Text style={{color: '#FFAE36'}}>想看</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.seedButton}>
                                    <Text style={{color: '#FFAE36'}}>看过</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                <View style={styles.buyTicketContainer}>
                                    <Text>选座购票</Text>
                                    <TouchableOpacity onPress={() => {
                                        alert('点击了购买')
                                    }}>
                                        <Text style={{color: '#FF645A', fontSize: 10}}>$33></Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 13,
                                        marginBottom: 12,
                                        marginTop: 20,
                                        color: '#9B9B9B'
                                    }}>剧情简介</Text>
                                    <View>
                                        <Text style={{color: '#343334'}} numberOfLines={this.state.num}>{summary}</Text>
                                        <TouchableOpacity onPress={() => {
                                            if (this.state.num == 0) {
                                                this.setState({num: 3})
                                            } else {
                                                this.setState({num: 0})
                                            }
                                        }}>
                                            <Text
                                                style={{color: '#2CBA48'}}>{this.state.num == 0 && '收起' || this.state.num != 0 && '展开'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.peoplePhotos}>
                                <Text style={{fontSize: 12, color: '#9B9B9B'}}>影人</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{marginTop: 8, marginBottom: 10, flexDirection: 'row'}}>
                                        {
                                            casts.map((value, index, array) => {
                                                return (
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginRight: 5,
                                                        width: 80,
                                                        height: 160
                                                    }}>
                                                        <Image source={{uri: value.avatars.large}}
                                                               style={{width: 80, height: 120}}/>
                                                        <Text style={{lineHeight: 22}}
                                                              numberOfLines={1}>{value.name}</Text>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.peoplePhotos}>
                                <Text style={{color: '#9B9B9B', fontSize: 12}}>预告片/剧照</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{flexDirection: 'row', marginTop: 15}}>
                                        {
                                            photos.map((v, index, array) => {
                                                return (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginRight: 5,
                                                        width: 140,
                                                        height: 100
                                                    }}>
                                                        <Image style={{width: 140, height: 100}}
                                                               source={{uri: v.image.replace('webp', 'png')}}/>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                            <ScrollableTabView renderTabBar={() => <DefaultTabBar/>}
                                               tabBarUnderlineStyle={{
                                                   backgroundColor: '#000',
                                                   height: 1,
                                               }}
                                               tabBarBackgroundColor='#f3f3f3'
                                               tabBarActiveTextColor='#000'
                                               tabBarInactiveTextColor='#959595'
                                               tabBarTextStle={{fontSize:13}}
                            >
                                <View tabLabel = '评论' style={{marginBottom:15,paddingLeft:15,paddingRight:15}}>
                                    <View style={{flexDirection:'row',paddingTop:20,justifyContent:'space-between'}}>
                                        <Text>短频</Text>
                                        <TouchableOpacity style={{borderWidth:1,borderColor:'#3FAC00',borderRadius:5,padding:4}} onPress={()=>{
                                            alert('点击评论');
                                        }}>
                                            <Text style={{color:'#3FAC00',fontSize:10}}>写短频</Text>
                                        </TouchableOpacity>

                                    </View>
                                    {
                                        popular_comments.map((v,i,array) =>{
                                            return(
                                                <View style={{marginTop:18,flexDirection:'row',paddingRight:20}}>
                                                    <View>
                                                        <Image source={{uri:v.author.avatar}} style={{width:40,height:40,borderRadius:20}}></Image>
                                                    </View>
                                                    <View style={{marginLeft:10,flex:1}}>
                                                        <View style={{flexDirection:'row'}}>
                                                            <Text style={{lineHeight:25}}>{v.author.name}</Text>

                                                        </View>
                                                        <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                                        <Text style={styles.otherMovieInfo}>4天前</Text>
                                                    </View>
                                                    <View style={{position:'absolute',right:0, top:0}}>
                                                        <Text style={{color:"#9b9b9b"}}>👍{v.useful_count}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View tabLabel = '讨论区' style={{marginBottom:15,paddingLeft:15,paddingRight:15}}>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20}}>
                                        <Text>话题</Text>
                                        <TouchableOpacity style={{borderWidth:1,borderColor:'#3FAC00',borderRadius:5,padding:4}}
                                                          onPress={()=>{
                                                              alert('写话题')
                                                          }}>
                                            <Text  style={{color:'#3FAC00'}}>写话题</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        popular_comments.map((v,i,array) => {
                                            return(
                                                <View style={{flexDirection:'row', marginTop: 18,paddingRight:20}}>
                                                    <View >
                                                        <Image source={{uri:v.author.avatar}} style={{width:40,height:40,borderRadius:20}}/>
                                                    </View>
                                                    <View style={{marginLeft:10,flex:1}}>
                                                        <View style={{flexDirection:'row'}}>
                                                            <Text style={{lineHeight:25}}>{v.author.name}</Text>
                                                        </View>
                                                        <Text style={{marginBottom:8,color:'#3B3B3B'}}>{v.content}</Text>
                                                        <Text style={styles.smallFont}>
                                                            4天前
                                                        </Text>
                                                    </View>
                                                    <View style={{position:'absolute',right:0,top:0}}>
                                                        <Text style={{color:"#9b9b9b"}}>👍{v.useful_count}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }



                                </View>

                            </ScrollableTabView>
                        </View>
                }

            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f9f5'
    },
    //海报背景
    poster: {
        alignItems: 'center',
        width: Widnow.width,
        height: 310,
        backgroundColor: "#2A362C"
    },
    //海报图片
    posterImage: {
        marginTop: 2,
        width: Widnow.width / 2,
        height: 280
    },
    //电影信息荣耀
    movieContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,

    },
    movieTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5
    },
    otherMovieInfo: {
        fontSize: 11,
        color: "#9b9b9b"
    },
    infoSquare: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        backgroundColor: '#ffffff',
        shadowColor: '#9B9B9B',
        shadowRadius: 6,
        shadowOpacity: 0.5,
        shadowOffset: {height: 0, width: 0},
    },
    buttonContainer: {
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    seeButton: {
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderColor: '#FFAE36',
        borderWidth: 1,
        borderRadius: 5
    },
    seedButton: {
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        borderColor: '#FFAE36',
        borderWidth: 1,
        borderRadius: 5

    },
    buyTicketContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingBottom: 15,
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1
    },
    peoplePhotos: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    moviePhoto: {
        paddingBottom: 15,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }

})