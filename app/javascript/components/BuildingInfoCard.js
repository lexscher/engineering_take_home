import React from 'react'
import { Link } from 'react-router-dom'
import { Button, List, ListItem, MiniListItem } from '../utils/StyledComponents'

export const BuildingInfoCard = ({
  id,
  address,
  state,
  zip,
  client_name,
  custom_fields
}) => <ListItem>
    <p>Client: {client_name}</p>
    <p>Address: {address}</p>
    <p>State: {state}</p>
    <p>Zip: {zip}</p>
    <p>Custom Fields: </p>
    <List>{custom_fields.length > 0 ? custom_fields.map(
      (field, i) =>
        <MiniListItem key={`building-${id}-custom-field-${i}`}>
          {field.field_name} - {field.value}
        </MiniListItem>) : <MiniListItem>N/A</MiniListItem>}
    </List>

    <Link to={`/buildings/${id}/edit`}><Button>Edit this building</Button></Link>
  </ListItem>
