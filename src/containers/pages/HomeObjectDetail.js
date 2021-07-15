import './HomeObjectDetail.less'
import React from 'react';// 公共封装js
import commonApi from '@A/api/commonApi'
// element组件
import { Message } from 'element-react';
class HomeObjectDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: "",
      objectItem: []
    }
  }
  getMsg() {
    console.log('子组件触发', this.props.parent.state.activeCompanyId)
    let param = {
      // companyId: this.props.parent.state.activeCompanyId
      companyId: '1111'
    }
    commonApi.getApi('/getObjectList', param).then((res) => {
      if (res.data.code === "1") {

        this.setState({
          companyName: res.data.data.objectItem.name,
          objectItem: res.data.data.objectItem.object,
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
  render() {
    return (
      <div id="HomeObjectDetail">
        <div className="companyName">{this.state.companyName}</div>
        <div className="msgBlock">
          {
            this.state.objectItem.map((item, index) => {
              return (
                <div className="sinObject" key={index}>
                  <div className="top">
                    <div className="objectName">{item.objectName}</div>
                    <div className="startTime">{item.startTime}</div>
                    <div className="endTime">{item.endTime}</div>
                  </div>

                  <div className="objectDetail">{item.objectDetail}</div>
                  <div className="objectMyType">{item.objectMyType}</div>
                  <div className="objectTechnology">{item.objectTechnology}</div>
                  <div className="objectIssue">{item.objectIssue}</div>
                  <div className="objectAnswer">{item.objectAnswer}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }


}
export default HomeObjectDetail;