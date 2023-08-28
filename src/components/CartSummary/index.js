// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const allPrices = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const totalPrice = allPrices.reduce((a, b) => a + b)
      return (
        <div className="cart-summary-over-all-container">
          <div className="cart-summary-container">
            <h1 className="order-total-heading">
              Order Total:{' '}
              <span className="order-total-span-num">Rs {totalPrice}/-</span>
            </h1>
            <p className="items-in-cart">{cartList.length} items in cart</p>
          </div>
          <button className="check-out-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
