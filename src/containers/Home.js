import './Home.less'
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import banner1 from '../asserts/images/banner1.jpg'
import banner2 from '../asserts/images/banner2.jpg'
import banner3 from '../asserts/images/banner3.jpg'
import banner4 from '../asserts/images/banner4.jpg'
import { Carousel, Menu } from 'element-react'
const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#364d79',
};
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: null
        }
    }
    selectMenuLev1(e, index) {
        this.setState({
            activeMenu: index
        })
        if (e.target.classList.length == 1) {
            e.target.classList.add('active');
        } else {
            e.target.classList.remove('active');
        }
        // console.log(e.target.classList)
    }
    selectMenuLev2(e) {
        if (e.target.classList.length == 1) {
            e.target.classList.add('active');
        } else {
            e.target.classList.remove('active');
        }
        // console.log(e.target.classList)
    }
    render() {
        let bannerArr = [
            { imgSrc: banner1 },
            { imgSrc: banner2 },
            { imgSrc: banner3 },
            { imgSrc: banner4 },
        ]
        return (
            <div className="homeBlock">
                <div className="headMenu">
                    <div className="posiBlock">
                        <div className="lev1Menu">
                            <div className="lev1Name"
                                onMouseEnter={(e) => { this.selectMenuLev1(e, 0) }}
                                onMouseLeave={(e) => { this.selectMenuLev1(e, 0) }}
                            >首页</div>
                        </div>
                        <div className="lev1Menu">
                            <div className="lev1Name"
                                onMouseEnter={(e) => { this.selectMenuLev1(e, 1) }}
                                onMouseLeave={(e) => { this.selectMenuLev1(e, 1) }}
                            >多次</div>
                            <div className={this.state.activeMenu == 1 ? "lev2Menu active" : "lev2Menu"}
                                onMouseLeave={(e) => {
                                    this.setState({
                                        activeMenu: null
                                    })
                                }}>
                                <div className="lev2Name"
                                    onMouseEnter={(e) => { this.selectMenuLev2(e) }}
                                    onMouseLeave={(e) => { this.selectMenuLev2(e) }}
                                >多次1</div>
                                <div className="lev2Name"
                                    onMouseEnter={(e) => { this.selectMenuLev2(e) }}
                                    onMouseLeave={(e) => { this.selectMenuLev2(e) }}
                                >多次2</div>
                                <div className="lev2Name"
                                    onMouseEnter={(e) => { this.selectMenuLev2(e) }}
                                    onMouseLeave={(e) => { this.selectMenuLev2(e) }}
                                >多次3</div>
                            </div>
                        </div>
                        <div className="lev1Menu">
                            <div className="lev1Name"
                                onMouseEnter={(e) => { this.selectMenuLev1(e, 2) }}
                                onMouseLeave={(e) => { this.selectMenuLev1(e, 2) }}
                            >其他</div>
                            <div className={this.state.activeMenu == 2 ? "lev2Menu active" : "lev2Menu"}
                                onMouseLeave={(e) => {
                                    this.setState({
                                        activeMenu: null
                                    })
                                }}>
                                <div className="lev2Name"
                                    onMouseEnter={(e) => { this.selectMenuLev2(e) }}
                                    onMouseLeave={(e) => { this.selectMenuLev2(e) }}
                                >其他1</div>
                                <div className="lev2Name"
                                    onMouseEnter={(e) => { this.selectMenuLev2(e) }}
                                    onMouseLeave={(e) => { this.selectMenuLev2(e) }}
                                >其他2</div>
                            </div>
                        </div>
                        <div className="lev1Menu">
                            <div className="lev1Name"
                                onMouseEnter={(e) => { this.selectMenuLev1(e, 3) }}
                                onMouseLeave={(e) => { this.selectMenuLev1(e, 3) }}
                            >关于</div>
                        </div>
                    </div>

                </div>
                <div className="bannerMenu">

                    <img src={banner1} />
                    {/* <Carousel height="600px">
                        {

                            bannerArr.map((item, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img src={item.imgSrc} />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel> */}
                </div>
                <div className="listMenu"></div>
            </div >
        )
    }
}
export default Home;
