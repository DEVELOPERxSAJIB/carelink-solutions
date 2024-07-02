import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import { store } from './Redux/Store';
// Import the libraries
import 'jquery';
import 'popper.js';
import 'node-waves';
import 'perfect-scrollbar';
import 'hammerjs';
import 'i18next';
import 'typeahead.js';
import 'datatables.net-bs5';
import 'apexcharts';
import 'swiper';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <App />
    </Provider>
  </React.StrictMode>,
)
