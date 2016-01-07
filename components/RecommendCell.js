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
	PixelRatio,
	Platform,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableNativeFeedback,
	View
} = React;

//变量
var getImageSource = require('./getImageSource');

var RecommendCell = React.createClass({
	render : function(){
		var price = this.props.shopData.price;
		var TouchableElement = TouchableHighlight;

		if (Platform.OS === 'android') {
			//
		};

		return (
			<View>
				<TouchableElement
					onPress = {this.props.onSelect}//$$
					onShowUnderlay = {this.props.onHighlight}
					onHideUnderlay = {this.props.onUnhighlight}>
					<View style = {styles.row}>
						<Image
							source = {getImageSource(this.props.shopData, 'imgurl')}
							style = {styles.cellImage}
						/>

						<View style = {styles.textContainer}>
							<Text style = {styles.shopTitle} numberOfLines = {1}>
								{this.props.shopData.brandname}
							</Text>
							<Text style={styles.movieYear} numberOfLines={2}>
                				{this.props.shopData.title}
              				</Text>
              				<Text style={styles.priceColor}>
                  				{price}元
                			</Text>
						</View>
					</View>
				</TouchableElement>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	textContainer: {
    flex: 1,
  },
  shopTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    // marginBottom: 2,
    marginTop: 2,
    height:30,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
    // marginTop:5,
    marginBottom:5,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 93,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  priceColor:{
  	color:'#3EB433'
  },
});


module.exports = RecommendCell;
