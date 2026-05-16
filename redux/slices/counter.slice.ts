import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  success: 0,
  failed: 0,
}

const counterSlice = createSlice({
  name: 'counter',

  initialState,

  reducers: {

    incrementSuccess: (state) => {
      state.success += 1
    },

    incrementFailed: (state) => {
      state.failed += 1
    },

  },
})

export const {
  incrementSuccess,
  incrementFailed,
} = counterSlice.actions

export default counterSlice.reducer