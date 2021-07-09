import './Square.less'
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class Square extends React.Component {
    render() {
        return (
            <div>{
                //点击事件执行内容
            }</div>
        )
    }
}
class Board extends React.Component {
    renderSquare(i) {
        return <Square />
    }
    render() {
        const status = "Next player:X"
        return (
            <div className="boardBlock">
                <div className="status">
                    {status}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                    {this.renderSquare(0)}
                </div>
            </div>
        )
    }

}
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        )
    }
}
export default withRouter(Game);
