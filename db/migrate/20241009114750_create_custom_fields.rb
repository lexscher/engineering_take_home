class CreateCustomFields < ActiveRecord::Migration[7.2]
  def change
    create_table :custom_fields do |t|
      t.references :client, null: false, foreign_key: true
      t.string :field_name, null: false
      t.integer :field_type, null: false, default: 0

      t.timestamps
    end

    add_index :custom_fields, [:client_id, :field_name], unique: true
  end
end
