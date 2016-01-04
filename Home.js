/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * QQ:863784757
 * QQ群:112365317
 * Copyright (c) 2015年 jinzelu. All rights reserved.
 * 愁眉弯唇皆是为你从此眉间心上再无一人
 */
'use strict'

var React = require('react-native');

var {
	ScrollView,
	View,
	Platform,
	StyleSheet,
} = React;

var CloverSlider = require('./components/CloverSlider');
var JZListView = require('./components/JZListView');
var JZMenuCard = require('./components/JZMenuCard');
var JZRushCell = require('./components/JZRushCell');
var JZWebView = require('./components/JZWebView');

var Home = React.createClass({
	//初始化
	getInitialState(){
		return {
			//配置项
		};
	},

	//选中一行
  	selectShop:function(shopData : Object){
  		if (Platform.OS === 'ios') {
  			this.props.navigator.push({
  				title:'限时抢购',
  				component:JZWebView,
  				passProps:{shopData},
  			});
  		}else{
  			//android对应的处理
  		}
  	},

  	selectRush:function(){
  		if (Platform.OS === 'ios') {
  			this.props.navigator.push({
  				title:'限时抢购',
  				component:JZWebView,
  				passProps:{},
  			});
  		}else{
  			//android对应的处理
  		}	
  	},

	render(){
		return (
			<View style = {styles.container}>
				<ScrollView>
					<CloverSlider />
					<View style={{height : 4, backgroundColor : '#F2F2F2'}} />
					<JZMenuCard />
					<View style={{height : 4, backgroundColor : '#F2F2F2'}} />
					<JZRushCell 
						onSelect = {() => this.selectRush()}
					/>
					<View style={{height : 4, backgroundColor : '#F2F2F2'}} />
					<JZListView 
						onSelect = {() => this.selectShop('')}
					/>
				</ScrollView>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container:{
    flex:1,
    backgroundColor:'white',
  },
});

module.exports = Home;