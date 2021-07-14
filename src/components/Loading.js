import './Loading.less'
import React from 'react';
class Loading extends React.Component {
  render() {
    return (
      <div className="maskLoading">
        <div className="loadingBlock">
          <div className="cirBig"></div>
          <div className="cirSmall"></div>
        </div>
      </div>
    )
  }
}
export default (Loading);