import './HomeObjectDetail.less'
import React from 'react';// 公共封装js
import commonApi from '@A/api/commonApi'
// element组件
import { Message } from 'element-react';
class HomeObjectDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyList: []
    }
  }
  getMsg() {

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
      <div className="objectDetailList">
        


      </div>
    )
  }


}
export default HomeObjectDetail;