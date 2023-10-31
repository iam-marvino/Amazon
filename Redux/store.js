import { configureStore } from "@reduxjs/toolkit";
import appSlices from "./appSlices";

export let store = configureStore({
  reducer: {
    app: appSlices,
  },
});


