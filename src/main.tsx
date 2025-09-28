import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import CartPage from './pages/CartPage.tsx'

const router= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/product/:id/details',
        element:<ProductPage/>
      },
      {
        path:'/cart',
        element:<CartPage/>
      }
    ]
      
    
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>

        <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
