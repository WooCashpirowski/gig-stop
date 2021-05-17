import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function EventsPage({ events }) {
  return (
    <Layout>
      <div>
        <h1>Wydarzenia</h1>
        {events.length === 0 && <h3>Brak wydarzeń</h3>}
        {events.map((ev) => (
          <EventItem evt={ev} key={ev.id} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
