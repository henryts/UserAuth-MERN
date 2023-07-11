import { useEffect } from 'react'
import AdminHeader from '../../Components/adminHeader/adminHeader'
import { useNavigate } from 'react-router'

const AdminHome = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('adminToken')){
          navigate('/admin/login')
        }
      })
  return (
    <>
    <AdminHeader/>
    <div>DashBoard</div>
    </>
  )
}

export default AdminHome