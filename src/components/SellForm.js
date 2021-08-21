import React, { Component } from 'react';
import Logo from '../logo.jpg'
import BNBLogo from '../bnbLogo.png'






class SellForm extends Component {
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
            // logic for conversion of xov1 tokens to exorg tokens
            //approve spender contract for event.XOV1Amount
            //transfer XOV1Amount to distributor contract
            
          }}> 
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.exorgBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const exorgAmount = this.input.value.toString()
                const rate= 1000
                this.setState({
                  output: exorgAmount * rate
                })
              }}
             ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
              <img src={Logo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; $XOV1
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: 0
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
                &nbsp; $EXORG
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">1 $XOV1 = {1*1000} $EXORG</span>
          </div>
          <button type="disabled" className="btn btn-primary btn-block btn-lg">Reedeem $EXORG tokens(after launch)</button>
        </form>
        
      );
    }
  }
  
  export default SellForm;