import React from 'react';
import {
    ImageBackground,
    Dimensions
} from 'react-native';
import img_config from '../rev-manifest.json'
import os from '../os.json'

const dimen = Dimensions.get('window');
let cdnUrl = os.ip;
if (cdnUrl.indexOf("http") < 0) {
    cdnUrl = "http://" + os.ip + ":18097/";
}
const scale = parseInt(dimen.scale.toFixed());

/**
 * 使用远程图片,本地使用app的缓存
 *  <Background name="test" ext="png" />
 * 自动根据倍率使用test.png或者test@x2.png图片,优先当前倍率,其次查找低倍率
 * 1倍图不需要添加其他后缀
 */
export default class Background extends React.Component {

    static defaultProps = {
        name: "default",
        ext: "png",
        resizeMode: "cover",
        resizeMethod: "auto"
    }
    imgSource = {}
    constructor(props) {
        super(props);
        let imgname = props.name;
        let ext = "." + props.ext;
        let imgscale = scale;
        let imgSrc = img_config[imgname + ext];
        while (imgscale > 1) {
            if (img_config[imgname + "@x" + imgscale + ext]) {
                imgSrc = img_config[imgname + "@x" + imgscale + ext];
                break;
            }
            imgscale--;
        }
        if (!imgSrc) imgSrc = "default.png";
        this.imgSource = { uri: cdnUrl + imgSrc, cache: "force-cache" }
        // log("使用Background", this.imgSource, props.name);
    }

    render() {
        const { children, width, height } = this.props;
        return <ImageBackground source={this.imgSource}
            onError={e => console.log(this.props.name, e.nativeEvent)}
            // onLoad={e => console.log(e.nativeEvent)}
            // onLoadEnd={console.log(this.imgSource)}
            resizeMode={this.props.resizeMode} resizeMethod={this.props.resizeMethod}
            style={this.props.style} >
            {this.props.children}
        </ImageBackground>
    }
    
}
