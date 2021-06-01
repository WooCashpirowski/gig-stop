import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error))

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title="Logowanie">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Logowanie
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Zaloguj" className="btn" />
        </form>
        <p>
          Nie masz konta? <Link href="/account/register">Zarejestruj się</Link>
        </p>
      </div>
    </Layout>
  )
}
