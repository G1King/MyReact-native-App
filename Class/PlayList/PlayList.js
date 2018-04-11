import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import API from '../../Config/APIConfig';
import Detail from '../../Class/Detail';

export default class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],//数据列表
            refreshing: false
        }
    }

    componentDidMount() {
        //fetch data
        this._fetchData();
    }

    //获取数据
    _fetchData = () => {

        fetch(API.playlist_Url).then((response) => {
            this.setState({refreshing: false});
            return response.json();
        }).then((responseText) => {
            let arrData = responseText.subjects;
            let i = 0;
            let data = [];
            arrData.map(d => {
                data.push({key: i, value: d});
                i++;
            })
            //赋值给属性
            this.setState({movies: data, refreshing: false});

        }).catch((error) => {
            console.error(error);
        });
    }

    //刷新数据
    _refreshData = () => {
        this.setState({refreshing: true});
        this._fetchData();
    }

    //渲染数据
    render() {
        let movies = this.state.movies;
        return (
            <View style={{backgroundColor: '#efefef'}}>

                <FlatList
                    data={movies}
                    // onRefresh={this._fetchData()}
                    refreshing={this.state.refreshing}

                    renderItem={({item}) => {

                        return (

                            <TouchableOpacity
                                style={[styles.container, item.key + 1 == movies.length && styles.lastCell]}

                                onPress={() => this.props.navigation.navigate('detail', {
                                    id: item.value.id
                                })}
                            >

                                <View style={styles.leftContainer}>
                                    <Image source={{uri: item.value.images.large.replace('webp', 'png')}}
                                           style={styles.image}/>
                                </View>
                                <View style={styles.rightContainer}>
                                    <Text style={styles.title}>
                                        {item.value.title}

                                    </Text>
                                    <View style={{marginTop: 3, marginBottom: 3}}>
                                        <Image source={require('../../resources/star-full.png')}/>
                                    </View>
                                    <Text style={styles.directors}>
                                        导演:{item.value.directors[0].name}
                                    </Text>
                                    <Text style={styles.directors}>
                                        主演:{item.value.casts.map((v) => v.name).join('/')}
                                    </Text>
                                    <Text style={styles.collect}>{item.value.collect_count}人看过</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    }
                    }
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        height: 130,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999'

    },
    lastCell: {
        borderBottomWidth: 0
    },
    image: {
        marginLeft: 18,
        marginTop: 18,
        width: 80,
        height: 100
    },
    leftContainer: {
        flex: 1,

    },
    rightContainer: {
        marginRight: 15,
        alignItems: 'flex-start',
        flex: 2,
        // backgroundColor: 'red'
        marginBottom:5
    },
    title: {
        color: 'black',
        fontSize: 15,
    },
    //导演 主演
    directors: {
        lineHeight: 20,
        color: '#A6A6A6',
        fontSize: 16
    },
    collect: {
        lineHeight: 20,
        fontSize: 13
    }
})