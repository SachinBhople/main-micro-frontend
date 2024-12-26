import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import reduxStore from "./redux/store"
import React from 'react'
import ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<React.StrictMode>
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
</React.StrictMode>)