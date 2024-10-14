class AddOptionsToCustomFields < ActiveRecord::Migration[7.2]
  def change
    add_column :custom_fields, :options, :text, array: true, default: []
  end
end
