/*
 * 源码来自https://github.com/hugohua/react-native-demo，有点小修改
 */

'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');
var {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} = React;

//获取可视窗口的宽高
var { width, height, scale } = Dimensions.get('window');

var itemHeight = 100,
    picFormat = '_640x200xzq75.jpg';
    //mui 3.0 slider 规范
    //TODO 这种方式不够科学，目前只是实现效果，后续请@遂宇做优化吧
    //IP6
    if(height === 375){
        itemHeight = 117;
        picFormat = '_750x234xzq75.jpg';
    }else if(height === 414){ //IP6 Plug
        itemHeight = 99.6;
        picFormat = '_1080x260xzq75.jpg';
    }

var styles = StyleSheet.create({
    container: {
        flex: 1
    },

    pageIndicator: {
        position : 'absolute',
        backgroundColor : 'transparent',
        left : 12,
        bottom : -10,
        flexDirection: 'row'
    }
});


module.exports = React.createClass({

    mixins: [TimerMixin],

    //默认值
    getDefaultProps() {
        return {
            width: width,
            indicatorColor: '#ffffff',
            inactiveIndicatorColor: '#ffffff',
            timer : 5000,
            api : 'http://ald.taobao.com/recommend.htm?appId=lb-tms-1261576-40550'
        }
    },

    //初始化用于状态转换的值
    getInitialState() {
        return {
            currentX: 0,
            activePage: 0,
            dataSource : []
        }
    },

    

    //拉取投放的数据
    fetchData() {
        var me = this;
        fetch(me.props.api)
            .then((response) => response.json())
            .then((responseData) => {
                me.setState({
                    dataSource: responseData.data
                });
          })
          .done(function(){
            me.start();
          });
    },

    start(){

        var scrollView = this.refs.scrollView;
        var length = this.state.dataSource.length;

        this.timer = this.setInterval(function(){

            var activePage;

            if( (this.state.activePage + 1)  >= length){
                activePage = 0;
            }else{
                activePage = this.state.activePage + 1;
            }

            var currentX = this.props.width * activePage;
            scrollView.scrollResponderScrollTo(currentX, 0);

            this.setState({
                currentX: currentX,
                activePage: activePage
            });

        }, this.props.timer)
    },

    componentDidMount() {
        this.fetchData();
    },

    //TODO 开始滚动时清除timer
    _onScrollBegin(event) {
        this.clearInterval(this.timer);
    },

    _onScrollEnd() {

    },

    getImage:function(url): string{
        // return ('http://p0.meituan.net/200.120/deal/667c7aa92a0c04779e266bbfa7d77c64316233.jpg');
        if (url.search('https:') === -1) {
            return ('https:' + url);
        }else{            
            return (url);
        }
    },
    //渲染单个图片
    renderItems(data) {
        var weakself = this;
        return data.map(function(item,i){
            var imgurl = weakself.getImage(item.img);
            return(
                <Image key={i} style={{width: width,height:itemHeight}} source={{uri: imgurl + picFormat}}/>
            );
        })
    },

    render() {
        var data = this.state.dataSource
        return (
            <View style={styles.container}>
                <ScrollView
                    ref='scrollView'
                    contentContainerStyle={styles.container}
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.onAnimationEnd}
                    // onScrollBeginDrag={this._onScrollBegin}
                >
                    {this.renderItems(data)}
                </ScrollView>
                {this.renderPageIndicator()}
            </View>
            );
    },

    renderPageIndicator() {
        var indicators = [],
            style;

        for (var i=0; i< this.state.dataSource.length; i++) {
            style = i === this.state.activePage ? { color: this.props.indicatorColor,opacity : 1 } : { color: this.props.inactiveIndicatorColor,opacity : 0.3 };
            indicators.push(<Text key={i} style={[style, {fontSize: 32}]}>&bull;</Text>)
        }

        return (
            <View style={styles.pageIndicator}>
            {indicators}
            </View>
        )
    },

    onAnimationEnd(e) {
        var activePage = e.nativeEvent.contentOffset.x / this.props.width;
        // console.log(e.nativeEvent)
        this.setState({
            currentX: e.nativeEvent.contentOffset.x,
            activePage: activePage
        });
    }
});
