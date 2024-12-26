
import React, { Suspense } from 'react'
import './index.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import Home from './components/Home'
// const Home = React.lazy(() => import('./components/Home'));
const Order = React.lazy(() => import('order/App'));
const Admin = React.lazy(() => import('admin/App'));
// const Product = React.lazy(() => import('product/App'));
import Product from 'product/App';
import Auth from 'auth/App'
import Navbar from './components/Navbar'
import Protected from './share/Protected';
const App = () => {
  return <>

    <Routes>
      <Route path="/" element={<>  <Navbar /> <Outlet /></>}>
        {/* <Route path='/' element={<Suspense fallback={<div> Loaddding</div>}><Navigate to="/product" />
        </Suspense>} /> */}
        {/* <Route path='/' element={<Suspense fallback={<div> Loaddding</div>}><Home />
        </Suspense>} /> */}
        <Route path='/' element={<Navigate to="/product" />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/order/*' element={<Suspense fallback={<div> Loaddding</div>}><Order />
        </Suspense>} />
        {/* <Route path='/product/*' element={<Suspense fallback={<div> Loaddding</div>}><Product />
        </Suspense>} /> */}
        <Route path='/product/*' element={<Product />} />
        <Route path='/auth/*' element={<Suspense fallback={<div> Loaddding</div>}><Auth />
        </Suspense>} />

      </Route>
      {/* <Route path='/admin/*' element={<Protected compo={<Suspense fallback={<div> Loaddding</div>}><Admin />
      </Suspense>} />} /> */}
      <Route path='/admin/*' element={<Suspense fallback={<div> Loaddding</div>}> <Protected compo={<Admin />} /> </Suspense>} />

      {/* <Route path='/admin/*' element={<Suspense fallback={<div> Loaddding</div>}><Admin />
      </Suspense>} /> */}

      {/* <Route path='/admin/*' element={<Suspense fallback={<div> Loaddding</div>}><Admin />
      </Suspense>} /> */}
    </Routes >

  </>
}
export default App
