import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
//import Proof from './components/Proof'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import WhyHire from './components/WhyHire'
import CurrentlyLearning from './components/CurrentlyLearning'
import Contact from './components/Contact'
import AdminDashboard from './components/AdminDashboard'

const ADMIN_PASSWORD = '782274samk'
const ADMIN_UNLOCK_KEY = 'portfolio_admin_unlocked'

const PortfolioSite = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      <main className="ml-0 pb-24 md:ml-20 md:pb-0">
        <Hero />
        {/* <Proof /> */}
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <WhyHire />
        <CurrentlyLearning />
        <Contact />
      </main>
    </div>
  )
}

function App() {
  const [adminPasswordInput, setAdminPasswordInput] = useState('')
  const [adminError, setAdminError] = useState('')

  const isAdminRoute =
    typeof window !== 'undefined' &&
    window.location.pathname.toLowerCase().startsWith('/admin')

  const isAdminUnlocked =
    typeof window !== 'undefined' &&
    window.sessionStorage.getItem(ADMIN_UNLOCK_KEY) === 'true'

  const handleAdminUnlock = (event) => {
    event.preventDefault()

    if (adminPasswordInput === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(ADMIN_UNLOCK_KEY, 'true')
      setAdminError('')
      setAdminPasswordInput('')
      window.location.reload()
      return
    }

    setAdminError('Incorrect password. Please try again.')
  }

  if (isAdminRoute) {
    if (!isAdminUnlocked) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
          <form
            onSubmit={handleAdminUnlock}
            className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900/75 p-6 shadow-[0_20px_60px_rgba(2,6,23,0.7)]"
          >
            <h1 className="mb-2 text-2xl font-semibold text-cyan-300">Admin Access</h1>
            <p className="mb-4 text-sm text-slate-400">Enter password to open the admin dashboard.</p>

            <label className="mb-2 block text-sm text-slate-300" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={adminPasswordInput}
              onChange={(event) => setAdminPasswordInput(event.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition-colors duration-300 focus:border-cyan-400"
              placeholder="Enter admin password"
              autoComplete="current-password"
            />

            {adminError && <p className="mt-3 text-sm text-rose-400">{adminError}</p>}

            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            >
              Unlock Admin
            </button>

            <a
              href="/"
              className="mt-3 block text-center text-sm text-slate-300 transition-colors hover:text-cyan-300"
            >
              Back to Portfolio
            </a>
          </form>
        </div>
      )
    }

    return <AdminDashboard />
  }

  return <PortfolioSite />
}

export default App
