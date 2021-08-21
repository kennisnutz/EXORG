import React, { Component } from 'react';
import logo from '../logo.jpg';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar'
import Main from './Main'
import Exorg from '../abis/Exorg.json'
import ExorgSwap from '../abis/ExorgSwap.json'









class App extends Component {
  async tokens(_n){
   
    const n=  await window.web3.utils.toWei(_n, 'ether');
    return n  //eth has 18 decimals  places while
}
  async componentWillMount() {
    await this.loadWeb3()
    console.log(window.web3)
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3= window.web3
    const accounts = await web3.eth.getAccounts()
    //console.log(accounts[0])
    this.setState({account: accounts[0]})
    console.log(this.state.account)


    const bnbBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ bnbBalance })    
    //console.log(this.state.bnbBalance)

    // load $XOV1/Token & get  $XOV1/Token Balance
    
    // const abi= Exorg.abi
    // const address= Exorg.networks['5777'].address
    // const exorg = new web3.eth.Contract(abi, address)
    // console.log(exorg)

    const networkId =  await web3.eth.net.getId()
    const tokenData = Exorg.networks[networkId]
    if(tokenData) {
      const exorg = new web3.eth.Contract(Exorg.abi, tokenData.address)
      this.setState({ token: exorg })
      let XOV1Balance = await exorg.methods.balanceOf(this.state.account).call()
      console.log('$XOV1 BALANCE: ', XOV1Balance.toString())
      this.setState({ exorgBalance: XOV1Balance.toString() })
    } else {
      window.alert('Exorg V1 contract not deployed to detected network.')
    }

    // Load ExorgSwap
    const exorgSwapData = ExorgSwap.networks[networkId]
    if(exorgSwapData) {
      const exorgSwap = new web3.eth.Contract(ExorgSwap.abi, exorgSwapData.address)
      this.setState({ exchange: exorgSwap })
    } else {
      window.alert('ExorgSwap contract not deployed to detected network.')
    }
    console.log(this.state.exchange)
    this.setState({ loading: false })

  }

  
    
  

  //connect browser
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  buyTokens= (bnbAmount)=> {
    this.setState({loading:true})
    this.state.exchange.methods.buyTokens()
        .send({value: bnbAmount, from: this.state.account})
        .on('transactionHash', (hash)=> {
          window.alert('transaction tokens successfully purchased', hash)
          this.setState({loading: false})
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      exchange: {},
      bnbBalance: '0',
      exorgBalance: '0',
      loading: true
    }
  }
  render() {
    let content
    
    if(this.state.loading){
      content = <p id="loader" className= "text-center">loading...</p>
    } else {
      content= <Main
      bnbBalance= {this.state.bnbBalance}
      exorgBalance= {this.state.exorgBalance}
      buyTokens= {this.buyTokens}
      />
    }

    return (
      <div>
        <Navbar account= {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
