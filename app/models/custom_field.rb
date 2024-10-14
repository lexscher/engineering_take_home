class CustomField < ApplicationRecord
  belongs_to :client

  enum :field_type, { :number => 0, :freeform => 1, :choices => 2 }
end
