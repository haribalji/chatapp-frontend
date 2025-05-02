import { configureStore } from "@reduxjs/toolkit";
// Redux Toolkit (RTK) is the official, recommended way to write Redux logic,
//  and it simplifies both:
// Creating Reducers
// Configuring the Store with configureStore

import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

const store = configureStore({
  reducer: {
    // Here each reducer name will be mentioned
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],



  // mid() = getDefaultMiddleware()
// Redux Toolkit internally gives a function mid (short for middleware), 
// which when called like mid() gives you all the default middleware, 
// including things like:

// redux-thunk

// serializability checks

// dev warnings

// ✅ api.middleware
// This is RTK Query's middleware — it handles:

// Caching

// Data fetching

// Invalidating cache

// Auto-refetching



// api.middleware is provided by RTK Query.

// It’s a middleware function that must be added to the store to enable features like caching, invalidation, background refetching, etc.

// Without it, RTK Query won’t function as intended.

});

export default store;