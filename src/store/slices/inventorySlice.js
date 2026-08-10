import { createSlice } from '@reduxjs/toolkit'

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    alerts: [],
    isLoading: false,
  },
  reducers: {
    setInventory: (state, action) => {
      state.items = action.payload
    },
    setAlerts: (state, action) => {
      state.alerts = action.payload
    },
    updateStock: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) item.currentStock = quantity
    },
  },
})

export const { setInventory, setAlerts, updateStock } = inventorySlice.actions
export default inventorySlice.reducer