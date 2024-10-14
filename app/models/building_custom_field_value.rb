class BuildingCustomFieldValue < ApplicationRecord
  belongs_to :building
  belongs_to :custom_field

  validates :value, presence: true
end