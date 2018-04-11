import React,{Component} from 'react';
import {Image} from 'react-native';

export default class TabBarItem extends Component {

    render() {
        return(
            <Image source={this.props.focused ? this.props.selectImage : this.props.normalImage}
                   style={ { tintColor:this.props.tintColor,width:25,height:25 } }
            />
        )
    }

}