import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <main className="main-content" style={{ flex: 1 }}>
        <div className="container mt-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout