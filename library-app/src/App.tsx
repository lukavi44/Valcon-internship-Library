import styles from './App.module.css'
import MainLayout from './components/Layout/MainLayout'

function App() {
  return (
    <div className={styles['app-wrapper']}>
      <MainLayout />
    </div>
  )
}

export default App
