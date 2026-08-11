import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  restaurantId: null,
  coupon: null,
  discount: 0,
  deliveryFee: 60,
  tax: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, quantity = 1, customizations = {} } = action.payload
      const existingItem = state.items.find(i => i.id === item.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          ...item,
          quantity,
          customizations,
        })
      }

      if (!state.restaurantId) {
        state.restaurantId = item.restaurantId || 'default'
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload
      state.items = state.items.filter(i => i.id !== itemId)
      
      if (state.items.length === 0) {
        state.restaurantId = null
        state.coupon = null
        state.discount = 0
      }
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload
      const item = state.items.find(i => i.id === itemId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== itemId)
        } else {
          item.quantity = quantity
        }
      }

      if (state.items.length === 0) {
        state.restaurantId = null
      }
    },

    updateCustomization: (state, action) => {
      const { itemId, customizations } = action.payload
      const item = state.items.find(i => i.id === itemId)
      if (item) {
        item.customizations = { ...item.customizations, ...customizations }
      }
    },

    clearCart: (state) => {
      state.items = []
      state.restaurantId = null
      state.coupon = null
      state.discount = 0
      state.tax = 0
    },

    applyCoupon: (state, action) => {
      const { code, discountAmount, discountPercent } = action.payload
      state.coupon = code
      
      if (discountAmount) {
        state.discount = discountAmount
      } else if (discountPercent) {
        const subtotal = state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
        state.discount = Math.round((subtotal * discountPercent) / 100)
      }
    },

    removeCoupon: (state) => {
      state.coupon = null
      state.discount = 0
    },

    setDeliveryFee: (state, action) => {
      state.deliveryFee = action.payload
    },

    calculateTax: (state) => {
      const subtotal = state.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      state.tax = Math.round(subtotal * 0.05) // 5% tax
    },
  },
})

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartRestaurantId = (state) => state.cart.restaurantId
export const selectCartItemCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
export const selectCartDiscount = (state) => state.cart.discount
export const selectCartTax = (state) => state.cart.tax
export const selectCartDeliveryFee = (state) => state.cart.deliveryFee
export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state)
  return subtotal + state.cart.tax + state.cart.deliveryFee - state.cart.discount
}
export const selectCartCoupon = (state) => state.cart.coupon
export const selectIsCartEmpty = (state) => state.cart.items.length === 0

export const {
  addItem,
  removeItem,
  updateQuantity,
  updateCustomization,
  clearCart,
  applyCoupon,
  removeCoupon,
  setDeliveryFee,
  calculateTax,
} = cartSlice.actions

export default cartSlice.reducer