import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BuildingInfoCard } from '../components/BuildingInfoCard'
import { Button, List } from '../utils/StyledComponents'

const BuildingList = () => {
  const [buildings, setBuildings] = useState([])

  const loadBuildings = async () => {
    try {
      const resp = await fetch('api/buildings')
      const data = await resp.json()
      console.log(data)
      setBuildings(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadBuildings()
  }, [])

  return (
    <div>
      <h2>Building List</h2>
      <Link to="/buildings/new"><Button>Add a New Building</Button></Link>
      <List>
        {buildings.map(({ id, address, state, zip, client_name, custom_fields }) => (
          <BuildingInfoCard
            key={`building-info-card-${id}`}
            id={id}
            address={address}
            state={state}
            zip={zip}
            client_name={client_name}
            custom_fields={custom_fields}
          />
        ))}
      </List>
    </div>
  )
}

export default BuildingList