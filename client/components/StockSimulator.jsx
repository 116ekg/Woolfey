import React from 'react'
import axios from 'axios'

export default class StockSimulator extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      currentValue: '',
      purchasePrice: '',
      selectedCurrency: 'btc'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitPriceCheck = this.handleSubmitPriceCheck.bind(this)
    this.handleCurrencySelectionChange = this.handleCurrencySelectionChange.bind(this)
    this.handleCurrencyGetRequest = this.handleCurrencyGetRequest.bind(this)
  }

  componentDidMount() {
    this.handleCurrencyGetRequest()
  }

  handleCurrencyGetRequest() {
    axios.get('/api/coinQuery', {params: this.state.selectedCurrency})
    .then(result => {
      let price = parseFloat(result.data.last_price).toFixed(2)
      this.setState({
        currentValue: `$${price}`
      })
      //console.log(result.data.last_price)
    })
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    }, () => {this.handleSubmitPriceCheck()})
  }

  handleCurrencySelectionChange(e) {
    this.setState({
      selectedCurrency: e.target.id
    }, () => {this.handleCurrencyGetRequest(); console.log(this.state.selectedCurrency)} )
  }

  handleSubmitPriceCheck(e) {
    //e.preventDefault()

    let tempPrice = this.state.currentValue.slice(1) * parseFloat(this.state.input)
    this.setState({
      purchasePrice: `$${tempPrice.toFixed(2)}`
    })
  }

  render() {
    return (

      <div>
        <h1>Woolfey Sim</h1>

        {/* <select id='currencySelector' value={this.state.selectedCurrency} onChange={this.handleCurrencySelectionChange}>
          <option value='btc'>Bitcoin</option>
          <option value='bch'>Bitcoin Cash</option>
          <option value='eth'>Ethereum</option>
          <option value='ltc'>Litecoin</option>
          <option value='xrp'>Ripple</option>
          <option value='xmr'>Monero</option>
          <option value='zec'>Zcash</option>
        </select> */}
        <div>
          <img src='./images/bitcoinlogo.jpg' className='currencyButton' id='btc' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/bitcoincashlogo.jpg' className='currencyButton' id='bch' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/ethereumlogo.jpg' className='currencyButton' id='eth' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/litecoinlogo.jpg' className='currencyButton' id='ltc' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/monerologo.jpg' className='currencyButton' id='xmr' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/ripplelogo.jpg' className='currencyButton' id='xrp' onClick={this.handleCurrencySelectionChange} />
          <img src='./images/zcashlogo.jpg' className='currencyButton' id='zec' onClick={this.handleCurrencySelectionChange} />
        </div>

        <h4> {this.state.currentValue} </h4>

        <form onSubmit={this.handleSubmitPriceCheck}>
          <input type='text' placeholder='Enter amount to buy...' onChange={this.handleInputChange} />
        </form>
        {this.state.purchasePrice !== '$NaN' ? <p> {this.state.purchasePrice} </p> : <p></p>}
        
        {this.state.purchasePrice !== '' && this.state.input !== '' ? 
          <div>
            <button>Buy</button>
            <button>Sell</button>
          </div>
          :
          <div></div>
        }

      </div>

    )
  }
}