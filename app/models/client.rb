class Client < ApplicationRecord
  has_many :buildings
  has_many :custom_fields

  validates :name, uniqueness: { case_sensitive: false }
end
