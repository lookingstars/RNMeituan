/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * 愁眉弯唇皆是为你从此眉间心上再无一人
 */
 'use strict'

var React = require('react-native');

var {
	Image,
	Text,
	View,
	StyleSheet,
} = React;

var cardData = [{
  img : 'icon_homepage_entertainmentCategory',
  text : '美食',
  link : 'http://3c.m.tmall.com'                      
},{
  img : 'icon_homepage_foottreatCategory',
  text : '电影',
  link : 'http://3c.m.tmall.com'                      
},{
  img : 'icon_homepage_hotelCategory',
  text : '酒店',
  link : 'http://3c.m.tmall.com'                      
},{
  img : 'icon_homepage_KTVCategory',
  text : 'KTV',
  link : 'http://3c.m.tmall.com'                      
}

];


var JZMenuCard = React.createClass({
	//初始化
	getInitialState(){
		return {
			//配置项
		};
	},

	renderItems(data){
		return data.map(function(items,i){
			return (
				<View key={i} style = {styles.boxtd}>
					<Image source={{uri : items.img}} style={styles.cardImg} />
					<Text style = {styles.cardText}>
						{items.text}
					</Text>
				</View>
			)
		});
	},

	render(){
		return (
			<View style = {styles.container}>
				<View style = {styles.boxtr}>
					{this.renderItems(cardData)}
				</View>
				<View style = {styles.boxtr}>
					{this.renderItems(cardData)}
				</View>
			</View>
		)		
	},
});

var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
	boxtr:{
		flexDirection:'row',
		justifyContent:'center',
		paddingTop: 10,
        paddingBottom : 10,
        paddingLeft : 5,
        paddingRight: 5,        
	},
	boxtd:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		padding:3,
	},
	cardImg:{
		width: 40,
		height: 40,		
	},
	cardText:{
		color:'#000',
		fontSize: 14,
		marginTop:10,
	},
});

module.exports = JZMenuCard;