import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function Home({ events }) {
  return (
    <Layout>
      <div>
        <h1>Nadchodzące wydarzenia</h1>
        {events.length === 0 && <h3>Brak nadchodzących wydarzeń</h3>}
        {events.map((ev) => (
          <EventItem evt={ev} key={ev.id} />
        ))}
        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-secondary">Wszystkie wydarzenia</a>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
