import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, FormWrapper, Input } from '../utils/StyledComponents'

const EditBuilding = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    address: '',
    state: '',
    zip: '',
    custom_fields: {}
  })

  useEffect(() => {
    const loadBuilding = async () => {
      try {
        const resp = await fetch(`/api/buildings/${id}`)
        const data = await resp.json()
        console.log(data)
        setFormData(data)
      } catch (err) {
        console.error(err)
      }
    }
    loadBuilding()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const requestConfig = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
      const resp = await fetch(`/api/buildings/${id}`, requestConfig)
      const result = await resp.json()

      if (result.status === 'success') {
        navigate('/buildings')
      } else {
        console.error(result.errors)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Edit Building</h2>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="zip"
            placeholder="Zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
          <Button type="submit">Update Building</Button>
        </FormWrapper>
      </form>
    </div>
  )
}

export default EditBuilding
