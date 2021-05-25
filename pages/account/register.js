import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AuthForm.module.css'

export default function RegisterPage() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')

  const { register, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== passwordConf) {
      toast.error('Hasła nie są zgodne')
      return
    }
    register({ userName, email, password })
  }

  return (
    <Layout title="Rejestracja">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Rejestracja
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nazwa użytkownika</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Adres email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConf">Powtórz hasło</label>
            <input
              type="password"
              name="passwordConf"
              id="passwordConf"
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
            />
          </div>
          <input type="submit" value="Zarejestruj" className="btn" />
        </form>
        <p>
          Masz już konto? <Link href="/account/login">Zaloguj się</Link>
        </p>
      </div>
    </Layout>
  )
}
