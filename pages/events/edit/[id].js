import { parseCookies } from '@/helpers/index'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaImage } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function EditEventPage({ evt, token }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null,
  )

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some((item) => item === '')
    if (hasEmptyFields) {
      toast.error('Wypełnij wszystkie pola')
    } else {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('Brak autoryzacji :/')
          return
        }
        toast.error('Coś poszło nie tak :/')
      } else {
        const evt = await res.json()
        router.push(`/events/${evt.slug}`)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()

    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title="Dodaj wydarzenie">
      <Link href="/events">Wróć</Link>
      <h1>Edytuj wydarzenie</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Nazwa wydarzenia</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Wykonawcy</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Miejsce</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Adres</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Start</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label htmlFor="description">Opis wydarzenia</label>
        <textarea
          name="description"
          id="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
        <input type="submit" value="Zapisz" className="btn" />
      </form>
      <h2>Zdjęcie</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>Brak zdjęcia</div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> {imagePreview ? 'Zmień' : 'Dodaj'}
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req)
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt,
      token,
    },
  }
}
