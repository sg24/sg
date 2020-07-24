import React, { Component } from "react";
import DropIn from "braintree-web-drop-in-react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from "../../../axios";
 
class Payment extends Component {
  instance;
 
  state = {
    clientToken: null,
  };
 
  async componentDidMount() {
    // Get a client token for authorization from your server
    console.log(this.props.paymentDet)
    if (!this.props.paymentDet) {
        this.props.history.goBack();
        return
    }
    const response = await axios.post('/payment', null,{headers: {'data-categ': 'clienttoken'}});
    const clientToken = await response.data; // If returned as JSON string
 
    this.setState({
      clientToken,
    });
  }
 
  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();
    let response = await axios.post('/payment', {nonce, id: this.props.paymentDet.id} ,{headers: {'data-categ': 'checkout'}});
    if (response.data) {
        console.log('paid')
    }
  }
 
  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{ authorization: this.state.clientToken,
                applePay: {
                  displayName: 'Merchant Name',
                  paymentRequest: {
                  label: 'Localized Name',
                    total: this.props.paymentDet.amount
                  }
                },
                paypal: {
                  flow: 'checkout',
                  amount: this.props.paymentDet.amount,
                  currency: 'USD'
                },
               paypalCredit: {
                 flow: 'checkout',
                 amount: this.props.paymentDet.amount,
                 currency: 'USD'
                },
                venmo: true}}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button style={{zIndex: 3}} onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}


const mapStateToProps = state => {
    return {
        paymentDet: state.cnt.paymentDet
    };
 }

export default withRouter(connect(mapStateToProps, null)(Payment)); 