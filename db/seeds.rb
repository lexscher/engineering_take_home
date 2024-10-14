# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

BuildingCustomFieldValue.destroy_all
Building.destroy_all
CustomField.destroy_all
Client.destroy_all

clients = [
  { name: 'Percy Jackson' },
  { name: 'Annabeth Chase' },
  { name: 'Grover Underwood' },
  { name: 'Jason Grace' },
  { name: 'Piper McLean' }
]

clients.each do |client_data|
  Client.create!(client_data)
end

custom_fields = {
  'Percy Jackson' => [
    { field_name: 'Is Near Water', field_type: 'choices', options: ['Yes', 'No'] },
    { field_name: 'Number of Water Fountains', field_type: 'number' }
  ],
  'Annabeth Chase' => [
    { field_name: 'Architectural Style', field_type: 'freeform' },
    { field_name: 'Number of Floors', field_type: 'number' }
  ],
  'Grover Underwood' => [
    { field_name: 'Vegetation Around', field_type: 'freeform' },
    { field_name: 'Number of Trees', field_type: 'number' }
  ],
  'Jason Grace' => [
    { field_name: 'Electricity Present', field_type: 'choices', options: ['Yes', 'No'] },
    { field_name: 'Has Storm Protection', field_type: 'choices', options: ['Yes', 'No'] }
  ],
  'Piper McLean' => [
    { field_name: 'Number of Visitors', field_type: 'number' },
    { field_name: 'Public or Private', field_type: 'choices', options: ['Public', 'Private'] }
  ]
}

custom_fields.each do |client_name, fields|
  client = Client.find_by(name: client_name)
  fields.each do |field_data|
    CustomField.create!(field_data.merge(client: client))
  end
end

buildings = [
  {
    address: '350 5th Ave, New York',
    state: 'NY',
    zip: '10118',
    client_name: 'Percy Jackson',
    custom_field_values: {
      'Is Near Water' => 'No',
      'Number of Water Fountains' => '10'
    }
  },
  {
    address: '1600 Pennsylvania Avenue NW, Washington',
    state: 'DC',
    zip: '20500',
    client_name: 'Annabeth Chase',
    custom_field_values: {
      'Architectural Style' => 'Neoclassical',
      'Number of Floors' => '4'
    }
  },
  {
    address: '1 Infinite Loop, Cupertino',
    state: 'CA',
    zip: '95014',
    client_name: 'Grover Underwood',
    custom_field_values: {
      'Vegetation Around' => 'Orchards',
      'Number of Trees' => '200'
    }
  },
  {
    address: 'Golden Gate Bridge, San Francisco',
    state: 'CA',
    zip: '94129',
    client_name: 'Jason Grace',
    custom_field_values: {
      'Electricity Present' => 'Yes',
      'Has Storm Protection' => 'No'
    }
  },
  {
    address: 'Statue of Liberty, Liberty Island, New York',
    state: 'NY',
    zip: '10004',
    client_name: 'Piper McLean',
    custom_field_values: {
      'Number of Visitors' => '1000',
      'Public or Private' => 'Public'
    }
  }
]

buildings.each do |building_data|
  client = Client.find_by(name: building_data[:client_name])
  building = Building.create!(client: client, address: building_data[:address], state: building_data[:state], zip: building_data[:zip])

  building_data[:custom_field_values].each do |field_name, value|
    custom_field = client.custom_fields.find_by(field_name: field_name)
    BuildingCustomFieldValue.create!(building: building, custom_field: custom_field, value: value)
  end
end

puts "finished seeding data!"
