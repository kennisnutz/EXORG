const { assert } = require('chai');

const Exorg = artifacts.require("Exorg");
const ExorgSwap = artifacts.require("ExorgSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

// function convert(n){
//     return n/10**9
// }

function tokens(_n){
    //let n=  convert(_n)
    return web3.utils.toWei(_n, 'ether'); //eth has 18 decimals  places while
}


contract('ExorgSwap', ([deployer, investor, newguy])=> {
    let exorg, exchange
    before(async ()=>{
        exorg= await Exorg.new()
        exchange= await ExorgSwap.new(exorg.address)
        await exorg.transfer(exchange.address, tokens('20000000000000'))
    })
    // Token deployment
    describe('Exorg Token Deployment', async ()=> {
        it("Token: Has a name", async ()=> {
            //let token= await Exorg.new()
            const name= await exorg.name()
            assert.equal(name, "Extra Ordinary Organization")
        })
        
    })

    describe('ExorgSwap Deployment', async ()=> {
        it("Contract: Has a name", async ()=> {
            //let exchange= await ExorgSwap.new()
            const name= await exchange.name()
            assert.equal(name, "Exorg Founders Instant Exchange")
        })
        
        it("contract: Has 20 trillion tokens", async ()=> {          
           
            let exBalance= await exorg.balanceOf(exchange.address)
           assert.equal(exBalance.toString(), tokens('20000000000000'))
       })
    })

    describe('buyTokens Functionality', async ()=> {
        let result;
        before(async ()=>{

            //purchase tokens first
            result= await exchange.buyTokens({from: investor, value: '1'}) ///**** */
        })

        it('Allows users to successfully purchase  exorg tokens with bnb ', async()=>{
            //check exorg balance of investor for purchased tokens
            let investorBalance= await exorg.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('1750000000000'))
            
            //check exorgSwap balance for recieved bnb balasnce
            let exchangeBalance= await exorg.balanceOf(exchange.address)
            assert.equal(exchangeBalance.toString(), tokens('18250000000000'))

            //console.log(result.logs[0].args)

            const event=  result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, exorg.address)
            assert.equal(event.amount.toString(), tokens('1750000000000').toString())
            assert.equal(event.ratePurchased.toString(), tokens('1750000000000'))

  
        })
    })

    describe('sellTokens Functionality', async ()=> {
        let result;
        before(async ()=>{
            await exorg.approve(exchange.address,tokens('750000000000'), {from: investor}) // Investor must approve tokens first
            result= await exchange.sellTokens(tokens('750000000000'), {from: investor}) //balnce after tx: 1000000000000 $XOV1
            
        })

        it('it successfully exchanges $xov1 tokens for bnb ', async()=>{
            //check exorg balance of investor for updated balance
            let investorBalance= await exorg.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('1000000000000'))


            let exchangeBalance= await exorg.balanceOf(exchange.address)
            assert.equal(exchangeBalance.toString(), tokens('19000000000000'))


            //console.log(result.logs[0].args)

            const event=  result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, exorg.address)
            assert.equal(event.amount.toString(), tokens('750000000000').toString())
            assert.equal(event.rateSold.toString(), tokens('1750000000000'))

            //FAILURE TEST: investor cant sell more tokens than they have

            await exchange.sellTokens(tokens('3750000000000'), {from: investor}).should.be.rejected;       
        })
    })



     // ***MODIFICATIONS*****
    // describe('exchangeXOV1Tokens Functionality', async ()=> {
    //     let result;
    //     before(async ()=>{

            
    //     })

    //     it('Allows users to successfully exchange $xov1 tokens for $EXORGV1 tokens', async()=>{
    //         //check exorg balance of investor for purchased tokens
           
    //     })
    // })

})