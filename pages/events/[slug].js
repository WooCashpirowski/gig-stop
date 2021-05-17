import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    e.preventDefault()
    console.log('delete')
  }
  const {
    image: { formats: img },
  } = evt

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edytuj
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            {' '}
            <FaTimes /> Usuń
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('PL')}, {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {img && (
          <div className={styles.image}>
            <Image
              src={img.medium ? img.medium.url : img.small.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Wykonawcy:</h3>
        <p>{evt.performers}</p>
        <h3>Opis wydarzenia:</h3>
        <p>{evt.description}</p>
        <h3>Miejsce: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{'<'} Powrót</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: { evt: events[0] },
    revalidate: 1,
  }
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: { evt: events[0] },
//   }
// }
