import { useContext } from 'react'
import Link from 'next/link'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '../styles/Header.module.css'
import Search from './Search'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Gig Stop</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Wydarzenia</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Dodaj wydarzenie</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Daszbord</a>
                </Link>
              </li>
              <li>
                <button className="btn-header" onClick={() => logout()}>
                  <FaSignOutAlt />
                  Wyloguj
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login">
                <a className="btn-header">
                  <FaSignInAlt />
                  Logowanie
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
