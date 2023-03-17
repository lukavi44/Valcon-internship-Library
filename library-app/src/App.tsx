import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css'
import MainLayout from './components/Layout/MainLayout'

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <MainLayout />
      <ToastContainer/>
    </div>
  )
}

export default App
