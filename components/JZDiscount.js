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
	Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;




var discount_url = 'http://api.meituan.com/group/v1/deal/topic/discount/city/1?ci=1&client=iphone&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pindaoquxincelue__a__leftflow___ab_i_group_5_5_onsite__b__b___ab_i_group_5_6_searchkuang__a__leftflow&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7';
var resultsCache = {
	discountData:{},//商家列表数据
};



var JZDiscount = React.createClass({
  getInitialState:function(){
    return {
      isLoading:false,
      dataSource:null,
    };
  },
  componentDidMount:function(){
    this.getDiscountData();
  },
  getDiscountData:function(){
    resultsCache.discountData = null;

    this.setState({
      isLoading:true,
      dataSource:null,
    });

    fetch(discount_url)
      .then((response) => response.json())
      .catch((error) => {
        resultsCache.discountData = null;
        this.setState({
          isLoading:false,
          dataSource:null,
        });
      })
      .then((responseData) => {
        if (responseData.data) {
          resultsCache.discountData = responseData.data;
          this.setState({
            isLoading:false,
            dataSource:resultsCache.discountData,
          });
        }
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
  test:function(data){    
    this.props.onSelect1(data)
  },
  renderItem:function(data){
    var weakself = this;
    var group = data.map(function(item,i){
      var imgurl = weakself.getImage(item.imageurl);
      var weburl = item.share.url;
      return (   
      <TouchableHighlight key = {i} 
        style = {styles.touch} 
        onPress = {() => weakself.test(weburl)}>       
          <View style = {styles.item}>
            <View style = {styles.title}>
              <Text>
                {item.maintitle}
              </Text>                
              <Text>
                {item.deputytitle}
              </Text>
            </View>
            <Image 
              style = {styles.itemImg}  
              source = {{uri : imgurl}}
            />
          </View>        

      </TouchableHighlight>    
        );
    });

    return (      
      <View style = {styles.container}>
        <View style = {styles.row}>
          {group.slice(0,2)}
        </View>
        <View style = {styles.row}>
          {group.slice(2,4)}
        </View>
      </View>
    )
  },

  render:function(){    
    if (this.state.dataSource === null) {
      return (
        <Text>
          吃肉都不开心的话，还不如吃酸菜。
        </Text>
      );
    }else {
      return (
        <View style = {styles.container}>
          {this.renderItem(this.state.dataSource)}
        </View>
      );
    }
  },
});

var styles = StyleSheet.create({
  container:{
    backgroundColor:'fff',    
  },
  row:{
    flexDirection:'row',
  },
  item:{
    flex:1,    
    flexDirection:'row',    
    borderBottomColor: 'rgba( 0, 0, 0, 0.1 )',
    borderBottomWidth: 1,
    borderRightColor: 'rgba( 0, 0, 0, 0.1 )',
    borderRightWidth: 1,
  },
  title:{
    flex:1,
    alignItems:'center',
    marginTop:10,
  },
  itemImg:{
    width:50,
    height:50,
    marginTop:5,
  },
  touch:{
    flex:1,
    backgroundColor:'white',
  },
});

module.exports = JZDiscount;
