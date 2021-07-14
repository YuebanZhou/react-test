import './HomeMain.less'
import React from 'react';// 公共封装js
import commonApi from '../../asserts/api/commonApi'
// element消息提醒组件
import { Message } from 'element-react';
// loading组件
import Loading from '../../components/Loading'
class HomeMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      techArr: [],
      activeList: null,
      shouLoading: false//是否显示loading
    }
  }
  // 获取main信息
  getTechMsg() {
    this.setState({
      shouLoading: true
    })
    let param = {}
    commonApi.getApi('/getTechMsg', param).then((res) => {
      this.setState({
        shouLoading: false
      })
      if (res.data.code == 1) {
        this.setState({
          techArr: res.data.data.techArr,
        })
      } else {
        Message.error('数据请求错误');
      }
    }).catch((err) => {
      this.setState({
        shouLoading: false
      })
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
  render() {

    return (
      <div className="techList">
        {
          this.state.techArr.map((item, index) => {
            return (
              <div className={this.state.activeList == index ? "sinTech active" : "sinTech"}
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