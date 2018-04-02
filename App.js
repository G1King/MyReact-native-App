/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import Icon from  'react-native-vector-icons/FontAwesome';
import Home from './Class/Home';
import Find from './Class/Find';
import Mine from './Class/Mine';
const  TabBar = TabNavigator({
     Home:{
         screen:Home,
         navigationOptions:{
             tabBarLabel: '首页',
             tabBarIcon:({tintColor}) =>(
                 <Icon name = 'home' size={20} color={tintColor}/>
             )
         }
     },
    Find:{
        screen:Find,
        navigationOptions:{
            tabBarLabel: '发现',
            tabBarIcon:({tintColor}) =>(
                <Icon name = 'eye' size={20} color={tintColor}/>
            )
        }
    },
        Mine:{
        screen:Mine,
        navigationOptions:{
            tabBarLabel: '我的',
            tabBarIcon:({tintColor}) =>(
                <Icon name = 'user' size={20} color={tintColor}/>
            )
        }
    },
},
    {
        tabBarPosition:'bottom',
        tabBarOptions:{
            activeTintColor:'rgb(37, 96, 160)',
            inactiveTintColor:'#494949',
            labelStyle: {
                fontSize:12,
            },
            style:{
                borderTopWidth: 1,
                borderTopColor: '#c3c3c3',
                height: 50,
                backgroundColor:'#fff'
            }
        }

    });
const Navigation = StackNavigator({
    home:{screen:TabBar}
},{
    headerMode:'screen'
});
export  default  Navigation;