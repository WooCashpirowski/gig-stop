import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      imageUploaded()
    }
  }
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h3>Dodaj zdjęcie wydarzenia</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Dodaj" className="btn" />
      </form>
    </div>
  )
}
