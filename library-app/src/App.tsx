import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/Layout/MainLayout'

function App() {
  return (
    <>
      <MainLayout />
      <ToastContainer autoClose={4000}
        limit={5}
        position={'top-right'}
        closeOnClick={false}
        pauseOnHover
        theme={'dark'}
        draggable={false } />
    </>
  )
}

export default App
