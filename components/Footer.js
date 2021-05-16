import styles from '../styles/Footer.module.css'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Gig Stop {new Date().getFullYear()}</p>
      <p>
        <Link href="/about">O projekcie</Link>
      </p>
    </footer>
  )
}
