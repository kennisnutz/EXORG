import React, { Component } from 'react';
import Logo from '../logo.jpg'
import BNBLogo from '../bnbLogo.png'
import BuyForm from './BuyForm'
import SellForm from './SellForm'






class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentForm: 'buy'
        }
    }

    render() {
          let content
          if(this.state.currentForm === 'buy') {
            content = <BuyForm
              bnbBalance={this.props.bnbBalance}
              exorgBalance={this.props.exorgBalance}
              buyTokens={this.props.buyTokens}
            />
          } else {
            content = <SellForm
              bnbBalance={this.props.bnbBalance}
              exorgBalance={this.props.exorgBalance}
              sellTokens={this.props.sellTokens}
            />
          }

        return ( 
        <div id = "content"className = "mt-3" >
            <div className="d-flex justify-content-between mb-3">
                <button
                    className="btn btn-light"
                    onClick={(event) => {
                        this.setState({ currentForm: 'buy' })
                    }}
                    >
                    Buy $XOV1
                </button>
                <span className="text-muted">&lt; &nbsp; &gt;</span>
                <button
                    className="btn btn-light"
                    onClick={(event) => {
                        this.setState({ currentForm: 'sell' })
                    }}
                    >
                    calculate $EXORG Allocation
                </button>
            </div>

            <div className = "card mb-4" >
                <div className = "card-body" >
                    {content}
                </div>
            </div>
        </div>
        );
    }
}

export default Main;