import React,{lazy} from 'react'
import App from './App.jsx'

import ReactDOM from "react-dom/client";
import { CssBaseline } from '@mui/material';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>

    <HelmetProvider>
    {/* Why react-helmet-async?
It improves performance over react-helmet by preventing memory leaks in SSR.
It ensures better async support for server-side rendering (SSR). */}

{/* HelmetProvider, which is used in React applications with react-helmet-async for managing the document head (title, meta tags, etc.).  */}
    <CssBaseline/>
    <div onContextMenu={(e)=>e.preventDefault()}>
      {/* by using the oncontextmenu we can't do the right click event in any of the page if we want perform in any of the 
      element then we need to use the oncontextmenu according to it*/}
    <App />

    </div>
    </HelmetProvider>
    </Provider>

  </React.StrictMode>,
)
