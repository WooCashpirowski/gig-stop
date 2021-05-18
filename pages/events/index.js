import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <div>
        <h1>Wydarzenia</h1>
        {events.length === 0 && <h3>Brak wydarzeń</h3>}
        {events.map((ev) => (
          <EventItem evt={ev} key={ev.id} />
        ))}
      </div>
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate starting page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // fetch events
  const evtRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`,
  )
  const events = await evtRes.json()

  return {
    props: { events, page: +page, total },
  }
}
