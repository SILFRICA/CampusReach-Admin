import './App.css'
import HomeSection from './components/HomeSection'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

function App() {

  return (
    <div className="text-gray-800 font-inter">
      <SideBar />
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-white min-h-screen transition-all main">
        <NavBar />
        <div className="p-6">
            <HomeSection />
        </div>
      </main>
    </div>
  )
}

export default App
