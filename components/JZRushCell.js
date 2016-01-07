/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * 愁眉弯唇皆是为你从此眉间心上再无一人
 */
'use strict';

var React = require('react-native');
var {
  	Image,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
} = React;

var rush_url = 'http://api.meituan.com/group/v1/deal/activity/1?__skck=40aaaf01c2fc4801b9c059efcd7aa146&__skcy=NF9S7jqv3TVBAoEURoapWJ5VBdQ%3D&__skno=FB6346F3-98FF-4B26-9C36-DC9022236CC3&__skts=1434530933.316028&__skua=bd6b6e8eadfad15571a15c3b9ef9199a&__vhost=api.mobile.meituan.com&ci=1&client=iphone&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&ptId=iphone_5.7&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pindaoquxincelue__a__leftflow___ab_i_group_5_5_onsite__b__b___ab_i_group_5_6_searchkuang__a__leftflow&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7';
var resultsCache = {
	rushData:{},
}



var JZRushCell = React.createClass({

	getInitialState:function(){
		return {
			isLoading: false,
			dataSource: null,
		};
	},

	componentDidMount:function(){
  		this.getRushData();
  	},
  	//request data
  	getRushData:function(){
  		//
  		resultsCache.rushData = null;
  		this.setState({
  			isLoading:true,
  			dataSource: null,
  		});

  		fetch(rush_url)
  			.then((response) => response.json())
  			.catch((error) =>{
  				resultsCache.rushData = undefined;

  				this.setState({
  					isLoading:false,
  				});
  			})
  			.then((responseData) => {
  				if (responseData.data) {
  					resultsCache.rushData = responseData.data.deals;

  					this.setState({
  						isLoading:false,
  						dataSource:resultsCache.rushData,
  					});
  				};
  			})
  			.done();

  	},

  	getImage:function(url): string{
  		// return ('http://p0.meituan.net/200.120/deal/667c7aa92a0c04779e266bbfa7d77c64316233.jpg');
  		if (url.search('w.h') === -1) {
  			return (url);
  		}else{
  			url = url.replace('w.h','200.120');
  			return (url);
  		}
  	},
  	renderItems(data){
  		if (data) {
  			var weakself = this;
  			return data.map(function(items,i){
  				var imgurl = weakself.getImage(items.mdcLogoUrl);
  				return (
  					<View key={i} style = {styles.boxtd}>
						<Image source={{uri : imgurl}} style={styles.cardImg} />
						<Text style = {styles.cardText}>
							{items.price}元
						</Text>
					</View>
  				)
  			});
  		}else{
  			return (
  				<Text>
  					吃肉都不开心的话，还不如吃酸菜。
  				</Text>
  			)
  		}
  	},

	render:function(){
		if (this.state.dataSource === null) {
			return (
				<View>
					<Text>
						空数据
					</Text>
				</View>
			)
		}else{
			return (
				<TouchableHighlight onPress = {this.props.onSelect}>
				<View style = {styles.container}>
					<Text style = {styles.titleIcon}>
						名店抢购
					</Text>
					<View style = {styles.boxtr}>
						{this.renderItems(this.state.dataSource)}
					</View>
				</View>
				</TouchableHighlight>
			)
		}
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
		width: 80,
		height: 40,
	},
	cardText:{
		color:'#000',
		fontSize: 14,
		marginTop:10,
	},
	titleIcon:{
		width:78,
		fontSize:14,
		color:'#FF9900',
		paddingLeft:10,
		paddingTop:5,
	},



});

module.exports = JZRushCell;
