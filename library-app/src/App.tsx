import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css'
import MainLayout from './components/Layout/MainLayout'

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <MainLayout />
      <ToastContainer autoClose={4000}
        limit={5}
        position={'top-right'}
        closeOnClick={false}
        pauseOnHover
        theme={'dark'}
        draggable={false } />
    </div>
  )
}

export default App
