import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const portalDiv = document.getElementById('portal') as HTMLElement

export interface ModalProps {
  children: React.ReactNode
  onClose: React.MouseEventHandler
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button onClick={onClose} className={styles['modal-close-btn']}>
          x
        </button>
        {children}
      </div>
    </>,
    portalDiv,
  )
}

export default Modal
