import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

export default function NotFoundPage() {
  return (
    <Layout title="Nie znaleziono strony">
      <div className={styles.error}>
        <h1>
          {' '}
          <FaExclamationTriangle /> 404
        </h1>
        <h4>Sorry, nic tu nie ma.</h4>
        <Link href="/">Powrót do strony głównej</Link>
      </div>
    </Layout>
  )
}
