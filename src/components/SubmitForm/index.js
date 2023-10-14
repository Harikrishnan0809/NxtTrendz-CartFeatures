import './index.css'
import {Component} from 'react'
import {TiTick} from 'react-icons/ti'
import CartContext from '../../context/CartContext'
import Header from '../Header'

class SubmitForm extends Component {
  state = {name: '', address: '', phone: '', pinCode: '', isSubmit: false}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeAddress = event => {
    this.setState({address: event.target.value})
  }

  onChangePhone = event => {
    this.setState({phone: event.target.value})
  }

  onChangePinCode = event => {
    this.setState({pinCode: event.target.value})
  }

  changeCart = () => {
    this.setState(preVal => ({isSubmit: !preVal.isSubmit}))
  }

  onSubmitButton = event => {
    event.preventDefault()
    this.changeCart()
  }

  renderYourOrderDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const {name, address, phone, pinCode} = this.state
        const getPrice = details => details.quantity * details.price
        const allPrices = cartList.map(
          eachItem => eachItem.price * eachItem.quantity,
        )
        const totalPrice = allPrices.reduce((a, b) => a + b)

        return (
          <div className="your-order-details-container">
            <div className="your-detail-container">
              <h1 className="heading-your-detail">Your Details</h1>
              <p className="your-detail-text-para">
                Name: <span className="span-el">{name}</span>
              </p>

              <p className="your-detail-text-para">
                Address: <span className="span-el">{address}</span>
              </p>

              <p className="your-detail-text-para">
                Phone Number: <span className="span-el">{phone}</span>
              </p>

              <p className="your-detail-text-para">
                Pin Code: <span className="span-el">{pinCode}</span>
              </p>
            </div>

            <hr className="line" />

            <div>
              <div className="placed-success-msg-container">
                <h1 className="heading-your-detail">Your Ordered Details</h1>
                <div className="msg-container">
                  <p className="success-msg">
                    Your Order Placed Successfully! :)
                  </p>
                  <TiTick size={25} color="darkgreen" />
                </div>
              </div>
              <ul className="un-order-details">
                {cartList.map(each => (
                  <li key={each.id}>
                    <p className="your-detail-text-para">
                      Product Name:{' '}
                      <span className="span-el">{each.title} code</span> Price:{' '}
                      <span className="span-el">{getPrice(each)}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <h1 className="heading-your-detail">
                {' '}
                Total Price: {totalPrice}
              </h1>
              <button
                onClick={this.changeCart}
                className="submit-form-button"
                type="button"
              >
                Back
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderFormDetails = () => {
    const {name, address, phone, pinCode} = this.state
    return (
      <>
        <img
          src="https://img.freepik.com/free-vector/man-doing-purchases-from-shopping-list-customer-with-package-buying-goods_335657-3074.jpg?w=996&t=st=1696411627~exp=1696412227~hmac=df0b89357d3dd81883b91cee140d5241b9fa993aaf31ee66e5ca9855a05ee468"
          alt="formImage"
          className="form-image"
        />
        <form className="form-container" onSubmit={this.onSubmitButton}>
          <div className="input-container">
            <label className="label-text" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={this.onChangeName}
              placeholder="Name"
              className="input"
              type="text"
              id="name"
            />
          </div>

          <div className="input-container">
            <label className="label-text" htmlFor="address">
              Address
            </label>
            <textarea
              onChange={this.onChangeAddress}
              id="address"
              placeholder="Address"
              rows="5"
              cols="60"
              value={address}
            />
          </div>

          <div className="input-container">
            <label className="label-text" htmlFor="pin-code">
              Pin Code
            </label>
            <input
              placeholder="Pin code"
              className="input"
              type="text"
              id="pin-code"
              onChange={this.onChangePinCode}
              value={pinCode}
            />
          </div>

          <div className="input-container">
            <label className="label-text" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="tel"
              placeholder="Enter phone number"
              rows="5"
              cols="60"
              className="input"
              onChange={this.onChangePhone}
              value={phone}
            />
          </div>
          <button className="submit-form-button" type="submit">
            Submit
          </button>
        </form>
      </>
    )
  }

  render() {
    const {isSubmit} = this.state
    return (
      <>
        <Header />
        <div className="container">
          {isSubmit ? this.renderYourOrderDetails() : this.renderFormDetails()}
        </div>
      </>
    )
  }
}

export default SubmitForm
