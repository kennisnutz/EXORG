import React, { Component } from 'react';
import Logo from '../logo.jpg'
import BNBLogo from '../bnbLogo.png'






class BuyForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentForm: 'buy'
      }
    }
  
    render() {
    //   let content
    //   if(this.state.currentForm === 'buy') {
    //     content = <BuyForm
    //       bnbBalance={this.props.bnbBalance}
    //       exorgBalance={this.props.exorgBalance}
    //       buyTokens={this.props.buyTokens}
    //     />
    //   } else {
    //     content = <SellForm
    //       bnbBalance={this.props.bnbBalance}
    //       exorgBalance={this.props.exorgBalance}
    //       sellTokens={this.props.sellTokens}
    //     />
    //   }
  
      return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let bnbAmount
            bnbAmount = this.input.value.toString()
            bnbAmount = window.web3.utils.toWei(bnbAmount, 'Ether')
            this.props.buyTokens(bnbAmount)
          }}> 
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.bnbBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const bnbAmount = this.input.value.toString()
                const rate= 17500
                this.setState({
                  output: bnbAmount * rate
                })
              }}
             ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
              <img src={BNBLogo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; BNB
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.exorgBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={this.state.output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={Logo} height='32' alt=""/>
                &nbsp; $XOV1
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 BNB = 17500 $XOV1</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">BUY $XOV1</button>
        </form>
        
      );
    }
  }
  
  export default BuyForm;