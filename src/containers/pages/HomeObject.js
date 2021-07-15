import './HomeObject.less'
import React from 'react';// 公共封装js
import commonApi from '@A/api/commonApi'
// 页面需要的图片
import more from '@A/images/more.png'
// element组件
import { Message } from 'element-react';
class HomeObject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyList: []
    }
  }
  getMsg() {
    let param = {}
    commonApi.getApi('/getCompanyList', param).then((res) => {
      if (res.data.code === "1") {
        this.setState({
          companyList: res.data.data.companyList,
        })
      } else {
        Message.error('数据请求错误');
      }
    }).catch((err) => {
      Message.error('数据请求错误');
    })
  }
  componentDidMount() {
    // 初始化
    this.getMsg()
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  changeCompany(e, item, index) {
    Message.success('触发子传父事件');
    this.props.parent.changeCompany(item, index)
  }
  render() {

    return (
      <div id="HomeObject"  >
        <div className="lineDotList">
        </div>
        <div className="msgBlock">
          {
            this.state.companyList.map((item, index) => {
              return (
                <div className="sinCompany" key={index}>
                  <div className="top">
                    <div className="name">{item.name}</div>
                    <div className="time">
                      <span className="timeVal">{item.startTime}</span>
                      <span className="text">至</span>
                      <span className="timeVal">{item.endTime}</span>
                    </div>
                    <div className="more" onClick={(e) => { this.changeCompany(e, item, index) }}>
                      <span>详细</span>
                      <img src={more} alt="" title="" />
                    </div>
                  </div>
                  <div className="msg">{item.msg}</div>
                </div>
              )
            })
          }
        </div>

      </div>
    )
  }


}
export default HomeObject;