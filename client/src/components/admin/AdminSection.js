import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  useLocation,
  useHistory,
} from 'react-router-dom'
import AdminHome from './AdminHome'
import CompanySection from './companySection/CompanySection'
import TripSection from './tripSection/TripSection'
import NavSection from './NavSection'
import useAuthStore from '../../stores/authStore'
const AdminSection = () => {
  const { section } = useParams()
  const [sectionComponent, setSectionComponent] = useState(() => <AdminHome />)
  const checkRole = useAuthStore((state) => state.checkRole)
  const history = useHistory()
  useEffect(async () => {
    // checkRole('admin').then((response) => console.log(response))
    const check = await checkRole('admin')
    if (!check) {
      history.push('/login', { from: 'admin', value: false })
    }
  }, [])
  useEffect(() => {
    switch (section) {
      case 'company':
        setSectionComponent(<CompanySection />)
        break
      case 'trip':
        setSectionComponent(<TripSection />)
        break
      default:
        setSectionComponent(<AdminHome />)
        break
    }
  }, [section])

  return (
    <div>
      {/* <h1>Administration</h1> */}
      {/* <NavSection /> */}
      <div>{sectionComponent}</div>
    </div>
  )
}
export default AdminSection
