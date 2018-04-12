import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import API from "../Config/APIConfig";
import Rank from './Rank';

import Window from '../Config/Maco';

export default class Find extends Component {
    static navigationOptions = {
        headerTitle: '发现'
    }

    constructor(props) {
        super(props);
        this.state = {
            top250: [],
            weekly: [],
            us_box: [],
            new_movies: [],
            ready: true
        };
    }

    //开始渲染
    render() {
        const {top250,weekly,us_box,new_movies} = this.state;
        const {navigate} = this.props.navigation;

        return (
        this.state.ready ? <ActivityIndicator size='large' style={{marginTop: 200}}/> :  <View style={styles.container}>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar/>}
                                   tabBarUnderlineStyle={{
                                       backgroundColor: 'red',
                                       height: 1,
                                   }}

                                   tabBarBackgroundColor='#f3f3f3'
                                   tabBarActiveTextColor='#000'
                                   tabBarInactiveTextColor='#959595'
                                   tabBarTextStle={{fontSize: 13}}
                                   onChangeTab={(i) => this._changeData(i)}>

                    <View tabLabel='Top250' style={{marginBottom:50}}>
                        <FlatList

                         data={top250}
                         renderItem={({item,index}) => {
                             const {title,id,rating,directors,casts,images} = item;//解构 es6 语法
                             return(
                                 <Rank
                                     navigation = {this.props.navigation}
                                     title={title}
                                     average={rating.average}
                                     star={rating.stars}
                                     directors={directors[0].name}
                                     casts={casts}
                                     index={index}
                                     image={images.large}
                                     id={id}
                                     style={{backgroundColor:'red'}}
                                 />
                             )
                         }}
                         keyExtractor={(item, index) => index}
                        />

                    </View>

                </ScrollableTabView>
            </View>
        )

    }

    //组件已经装载
   async componentDidMount() {
        const json = await this._fetchData();

        this.setState({
            top250:json,
        });
    }

    //请求数据
    _fetchData = (start = 0, type = 'top250') => {
        let params = new FormData();
        params.append('apikey', '0b2bdeda43b5688921839c8ecb20399b',)
        params.append('city', '北京',)
        params.append('client', 'something',)
        params.append('udid', 'dddddddddddddddddddddd');

        return fetch(`${API.findInfo_Url}/${type}?start=${start}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: params
        }).then((response) => response.json()).then(data => {
            this.setState({
                ready: false,
            });
            return data.subjects;
        })

    }
    _changeData = async (obj) => {
        const {i} = obj;
        let type = '';
        switch (i) {
            case 0:
                type = 'top250'
                break;
            case 1:
                type = 'weekly'

                break;
            case 2:
                type = 'us_box'
                break;
            case 3:
                type = 'new_movies'
                break;

        }

        this.setState({
            ready:true,
        });
        const json = await this._fetchData(0, type);
        this.setState({
            ready: true,
            [type]: json,
        })

    }
}
const styles = StyleSheet.create({
    container: {
        width:Window.width,
        height:Window.height - 64,
        backgroundColor: '#FFF',


    }

});