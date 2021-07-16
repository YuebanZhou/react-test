import './HomeObjectDetail.less'
import React from 'react';// 公共封装js
import commonApi from '@A/api/commonApi'
// 页面需要的图片
import more from '@A/images/more.png'
// element组件
import { Message, Collapse, Notification } from 'element-react';
class HomeObjectDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: "",
      objectItem: [],
      activeName: "0"
    }
  }
  getMsg() {
    let param = {
      companyId: this.props.parent.state.activeCompanyId
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
  changeCompany() {
    Notification({
      title: '提示',
      message: '触发子传父，返回到公司列表',
      type: 'success'
    });
    this.props.parent.changeCompany(null, "2")
  }
  render() {
    return (
      <div id="HomeObjectDetail">
        <div className="companyName">
          <div className="name">{this.state.companyName}</div>
          <div className="return" onClick={(e) => { this.changeCompany() }}>
            <span>返回</span>
            <img src={more} alt="" title="" />
          </div>
        </div>
        <div className="msgBlock">
          <Collapse value={this.state.activeName} accordion>
            {
              this.state.objectItem.map((item, index) => {
                return (
                  <Collapse.Item title={
                    <div className="top" key={index}>
                      <div className="objectName">{item.objectName}</div>
                      <div className="time">
                        <span className="startTime">{item.startTime}</span>
                        <span className="text">至</span>
                        <span className="endTime">{item.endTime}</span>
                      </div>
                    </div>
                  } name={String(index)} key={index}>
                    <div className="msgDetail">
                      <div className="objSinList objectDetail">
                        <div className="label">阿巴阿巴:</div>
                        <div className="value">{item.objectDetail}</div>
                      </div>
                      <div className="objSinList objectMyType">
                        <div className="label">阿巴阿巴:</div>
                        <div className="value">{item.objectMyType}</div>
                      </div>
                      <div className="objSinList objectTechnology">
                        <div className="label">阿巴阿巴:</div>
                        <div className="value">{item.objectTechnology}</div>
                      </div>
                      <div className="objSinList objectIssue">
                        <div className="label">阿巴阿巴:</div>
                        <div className="value">{item.objectIssue}</div>
                      </div>
                      <div className="objSinList objectAnswer">
                        <div className="label">阿巴阿巴:</div>
                        <div className="value">{item.objectAnswer}</div>
                      </div>
                    </div>
                  </Collapse.Item>
                )
              })
            }

          </Collapse>
        </div>
      </div>
    )
  }


}
export default HomeObjectDetail;