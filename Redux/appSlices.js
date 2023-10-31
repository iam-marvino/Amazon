import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartItems: [],
  favoriteItems: [],
  allProducts: [],
  user: {},
};

export let appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {
    addedToCart: (state, action) => {
      const payload = action.payload;
      if (payload && payload._id) {
        const _id = payload._id;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item._id === _id
        );

        if (existingItemIndex !== -1) {
          state.cartItems = state.cartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removedFromCart: (state, action) => {
      let product = action.payload;
      let index = state.cartItems.findIndex((item) => item._id === product._id);
      state.cartItems.splice(index, 1);
      // Save updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addedToFavorite: (state, action) => {
      // {basically before adding item to favorite check if the item already exist if it does,
      //  do nothing (don't add it again), if it does not, then add it}
      const payload = action.payload;
      if (payload && payload._id) {
        const _id = payload._id;
        const existingItemIndex = state.favoriteItems.findIndex(
          (item) => item._id === _id
        );

        if (existingItemIndex === -1) {
          state.favoriteItems = [...state.favoriteItems, payload];
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(state.favoriteItems)
          );
        }
      }
    },
    removedFromFavorite: (state, action) => {
      let product = action.payload;
      let index = state.favoriteItems.findIndex(
        (item) => item._id === product._id
      );
      state.favoriteItems.splice(index, 1);
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
    pushToAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    increaseQuantity: (state, action) => {
      let existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      let existingProduct = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems", JSON.stringify);
    },
    resetFavorite: (state) => {
      state.favoriteItems = [];
      localStorage.removeItem("favoriteItems", JSON.stringify);
    },
    addUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    removeUser: (state) => {
      state.user = {};
      localStorage.removeItem("user");
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateFavorite: (state, action) => {
      state.favoriteItems = action.payload;
    },
  },
});

export let {
  addedToCart,
  removedFromCart,
  removedFromFavorite,
  addedToFavorite,
  pushToAllProducts,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
  addUser,
  resetFavorite,
  removeUser,
  updateCart,
  updateFavorite,
} = appSlices.actions;
export default appSlices.reducer;
