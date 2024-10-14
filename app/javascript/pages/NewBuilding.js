import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BigFormWrapper,
  Button,
  Divider,
  FormWrapper,
  Input,
  Label,
  ScrollingFormWrapper,
  Select,
} from '../utils/StyledComponents'

const NewBuilding = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    address: '',
    state: '',
    zip: '',
    name: '',
    custom_fields: [],
  })
  const [isNewClient, setIsNewClient] = useState(false)
  const [existingClients, setExistingClients] = useState([])
  const [clientsLoaded, setClientsLoaded] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      const resp = await fetch('/api/clients')
      const data = await resp.json()
      setExistingClients(data)
      setClientsLoaded(true)
    }

    fetchClients()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCustomFieldChange = (index, e) => {
    const newCustomFields = [...formData.custom_fields]

    newCustomFields[index] = {
      ...newCustomFields[index],
      [e.target.name]: e.target.value,
    }

    setFormData({ ...formData, custom_fields: newCustomFields })
  }

  const handleCustomFieldTypeChange = (index, e) => {
    const newCustomFields = [...formData.custom_fields]

    newCustomFields[index].field_type = e.target.value
    newCustomFields[index].options = []

    setFormData({ ...formData, custom_fields: newCustomFields })
  }

  const handleOptionChange = (fieldIndex, optionIndex, e) => {
    const newCustomFields = [...formData.custom_fields]

    newCustomFields[fieldIndex].options[optionIndex] = e.target.value

    setFormData({ ...formData, custom_fields: newCustomFields })
  }

  const handleOptionSelection = (fieldIndex, e) => {
    const newCustomFields = [...formData.custom_fields]

    newCustomFields[fieldIndex].value = e.target.value

    setFormData({ ...formData, custom_fields: newCustomFields })
  }

  const addOption = (fieldIndex) => {
    const newCustomFields = [...formData.custom_fields]

    if (newCustomFields[fieldIndex].options.length < 5) {
      newCustomFields[fieldIndex].options.push('')

      setFormData({ ...formData, custom_fields: newCustomFields })
    }
  }

  const addCustomField = () => {
    setFormData({
      ...formData,
      custom_fields: [...formData.custom_fields, { name: '', value: '', field_type: '0', options: [] }]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
      const resp = await fetch('/api/buildings', requestConfig)
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
      <h2>Add New Building</h2>
      <form onSubmit={handleSubmit}>
        <BigFormWrapper>
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

            <div>
              <Label>
                Add new client
              </Label>
              <input
                type="checkbox"
                checked={isNewClient}
                onChange={() => setIsNewClient(!isNewClient)}
              />
            </div>

            {isNewClient ? (
              <Input
                type="text"
                name="name"
                placeholder="New Client Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            ) : (
              <Select
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select an existing client</option>
                {clientsLoaded
                  ? existingClients.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))
                  : <option value="">No clients available.</option>}
              </Select>
            )}
          </FormWrapper>

          <ScrollingFormWrapper>
            <h4>Custom Fields</h4>
            {formData.custom_fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Field Name"
                  value={field.name}
                  onChange={(e) => handleCustomFieldChange(fieldIndex, e)}
                />

                <Select
                  name="field_type"
                  value={field.field_type}
                  onChange={(e) => handleCustomFieldTypeChange(fieldIndex, e)}
                >
                  <option value="0">Number</option>
                  <option value="1">Freeform</option>
                  <option value="2">Choices</option>
                </Select>

                {field.field_type === '0' && (
                  <Input
                    type="number"
                    name="value"
                    placeholder="Field Value (Number)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(fieldIndex, e)}
                  />
                )}

                {field.field_type === '1' && (
                  <Input
                    type="text"
                    name="value"
                    placeholder="Field Value (Freeform)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(fieldIndex, e)}
                  />
                )}

                {field.field_type === '2' ? (
                  <div>
                    <h5>Options</h5>
                    {field.options.map((option, optIndex) => (
                      <Input
                        key={optIndex}
                        type="text"
                        placeholder={`Option ${optIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(fieldIndex, optIndex, e)}
                      />
                    ))}
                    {field.options.length < 5 ? (
                      <Button type="button" onClick={() => addOption(fieldIndex)}>
                        Add Option
                      </Button>
                    ) : null}

                    {field.options.length > 0 ? (
                      <div>
                        <h5>Select an Option</h5>
                        <Select
                          name="value"
                          value={field.value}
                          onChange={(e) => handleOptionSelection(fieldIndex, e)}
                        >
                          <option value="">Select one</option>
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </div>
                    ) : null}

                  </div>
                ) : null}
                {formData.custom_fields.length > 1 && fieldIndex !== formData.custom_fields.length - 1 ? <Divider /> : ""}
              </div>
            ))}
            <Button type="button" onClick={addCustomField}>Add Custom Field</Button>
          </ScrollingFormWrapper>
        </BigFormWrapper>
        <Button type="submit">Create Building</Button>
      </form>
    </div>
  )
}

export default NewBuilding
