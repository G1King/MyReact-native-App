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
import {Image} from 'react-native';
import Icon from  'react-native-vector-icons/FontAwesome';
import Home from './Class/Home';
import Find from './Class/Find';
import Mine from './Class/Mine';
import Detail from './Class/Detail';
import TabBarItem from './TabBarItem';
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
            tabBarIcon:({focused,tintColor}) =>(
              <TabBarItem
                  focused={focused}
                  tintColor={tintColor}
                  normalImage={{uri:'my_unselect'}}
                  selectImage={{uri:'my_select'}}
              />

            )
        }
    },
},
    //<Icon name = 'user' size={20} color={tintColor}/><Image source={{uri:'my_unselect'}} style={{tintColor:tintColor,width:20,height:20}} />
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
    rootVC:{screen:TabBar
    },
   detail:{
        screen:Detail
   },

},{
    headerMode:'screen'
});
export  default  Navigation;