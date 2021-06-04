import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import DashboardEvent from '@/components/DashboardEvent'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events, token }) {
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Na pewno?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.reload()
      }
    }
  }

  return (
    <Layout title="Daszbord">
      <ToastContainer />
      <div className={styles.dash}>
        <h1>Daszbord</h1>
        <h3>Moje wydarzenia</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const events = await res.json()

  return {
    props: { events, token },
  }
}
