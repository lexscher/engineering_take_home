class CreateBuildings < ActiveRecord::Migration[7.2]
  def change
    create_table :buildings do |t|
      t.references :client, null: false, foreign_key: true
      t.string :address, null: false
      t.string :state, null: false
      t.string :zip, null: false

      t.timestamps
    end
  end
end
