import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRoutesProps {
  accessToken: string | null
}

const PrivateRoutes = ({ accessToken }: PrivateRoutesProps) => {
  return accessToken ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
