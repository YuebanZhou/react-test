import './HomeMain.less'
import React from 'react';// 公共封装js
import commonApi from '@A/api/commonApi'
// element消息提醒组件
import { Message } from 'element-react';
class HomeMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      techArr: [],
      activeList: null,
    }
  }
  // 获取main信息
  getTechMsg() {
    let param = {}
    commonApi.getApi('/getTechMsg', param).then((res) => {
      if (res.data.code === "1") {
        this.setState({
          techArr: res.data.data.techArr,
        })
      } else {
        Message.error('数据请求错误');
      }
    }).catch((err) => {
      Message.error('数据请求错误');
    })
  }
  // 悬浮菜单
  hoverList(e, index) {
    this.setState({
      activeList: index
    })
  }
  componentDidMount() {
    // 初始化
    this.getTechMsg()
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {

    return (
      <div id="HomeMain">
        {
          this.state.techArr.map((item, index) => {
            return (
              <div className={Number(this.state.activeList) === index ? "sinTech active" : "sinTech"}
                key={index}
                onMouseEnter={(e) => { this.hoverList(e, index) }}
                onMouseLeave={(e) => { this.hoverList(e, null) }}>
                <div className="name">{item.name}</div>
                <div className="percent">{item.percent}</div>
              </div>
            )

          })
        }
      </div>
    )
  }


}
export default HomeMain;