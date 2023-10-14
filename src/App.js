import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'
import SubmitForm from './components/SubmitForm'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount = () => {
    this.fetchToken()
    const storedCartList = JSON.parse(localStorage.getItem('cart'))
    if (storedCartList !== null) {
      this.setState({cartList: storedCartList})
    }
  }

  setToCookies = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
  }

  fetchToken = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setToCookies(data.jwt_token)
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    this.setState(
      oldVal => ({
        cartList: oldVal.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + 1,
            }
          }
          return eachItem
        }),
      }),
      () => {
        this.addCartToLocalStorage()
      },
    )
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const findData = cartList.find(eachItem => eachItem.id === id)

    if (findData.quantity > 1) {
      this.setState(
        preVal => ({
          cartList: preVal.cartList.map(eachItem => {
            if (eachItem.id === id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity - 1,
              }
            }

            return eachItem
          }),
        }),
        () => {
          this.addCartToLocalStorage()
        },
      )
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    this.setState(
      oldVal => ({
        cartList: oldVal.cartList.filter(eachItem => eachItem.id !== id),
      }),
      () => {
        this.addCartToLocalStorage()
      },
    )
  }

  removeAllCartItems = () => {
    this.setState({cartList: []}, () => {
      this.addCartToLocalStorage()
    })
  }

  addCartToLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cart', JSON.stringify(cartList))
    console.log('added')
  }

  addCartItem = product => {
    //    TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const findItHas = cartList.find(eachItem => eachItem.id === product.id)

    if (findItHas === undefined) {
      this.setState(
        prevState => ({cartList: [...prevState.cartList, product]}),
        () => {
          this.addCartToLocalStorage()
        },
      )
    } else {
      this.setState(preVal => ({
        cartList: preVal.cartList.map(
          eachItem => {
            if (eachItem.id === product.id) {
              return {
                ...eachItem,
                quantity: eachItem.quantity + product.quantity,
              }
            }

            return eachItem
          },
          () => {
            this.addCartToLocalStorage()
          },
        ),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductItemDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/submit-form" component={SubmitForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
