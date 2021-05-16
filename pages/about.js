import Link from 'next/link'
import Layout from '@/components/Layout'

export default function AboutPage() {
  return (
    <Layout title="O aplikacji">
      <h1>O aplikacji</h1>
      <p>Znajdź najlepsze wydarzenia w Twojej okolicy.</p>
      <Link href="/">Home</Link>
    </Layout>
  )
}
