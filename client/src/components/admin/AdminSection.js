import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom'
import AdminHome from './AdminHome'
import CompanySection from './companySection/CompanySection'
import StationSection from './stationSection/StationSection'
import NavSection from './NavSection'
const AdminSection = () => {
  const { section } = useParams()
  const [sectionComponent, setSectionComponent] = useState(() => <AdminHome />)

  useEffect(() => {
    switch (section) {
      case 'company':
        setSectionComponent(<CompanySection />)
        break
      case 'station':
        setSectionComponent(<StationSection />)
        break
      default:
        setSectionComponent(<AdminHome />)
        break
    }
  }, [section])

  return (
    <div>
      <h1>Administration</h1>
      <NavSection />
      <div>{sectionComponent}</div>
    </div>
  )
}
export default AdminSection
