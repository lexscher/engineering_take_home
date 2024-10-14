module Api
  class BuildingsController < ApplicationController
    before_action :set_building, only: [:update, :show]
    # I was getting issues when trying to update and create, for this case I'll just skip the auth token verification
    skip_before_action :verify_authenticity_token, only: [:update, :create]

    # GET /buildings
    def index
      buildings = Building.includes(:client, :building_custom_field_values).order(updated_at: :desc)
      render json: buildings.map { |building| format_building(building) }
    end

    # GET /buildings/:id
    def show 
      render json: @building
    end

    # POST /buildings
    def create
      client_name = params[:name]
      @client = Client.find_or_create_by(name: client_name)

      building = @client.buildings.new(building_params)
      if building.save
        create_custom_field_values(building)
        render json: { status: 'success', building: format_building(building) }, status: :created
      else
        render json: { status: 'error', errors: building.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH /buildings/:id
    def update
      if @building.update(building_params)
        create_custom_field_values(@building)
        render json: { status: 'success', building: format_building(@building) }
      else
        render json: { status: 'error', errors: @building.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_building
      @building = Building.find(params[:id])
    end

    def building_params
      params.require(:building).permit(:address, :state, :zip)
    end

    def create_custom_field_values(building)
      custom_fields = custom_fields_params

      if custom_fields.present?
        custom_fields.each do |field_params|
          field_params = field_params.to_h.with_indifferent_access

          field_name = field_params[:name]
          field_value = field_params[:value]
          field_type = field_params[:field_type]
          options = field_params[:options]

          custom_field = building.client.custom_fields.find_or_create_by(field_name: field_name) do |cf|
            cf.field_type = field_type.to_i
            cf.options = options if options.present?
          end

          custom_value = building.building_custom_field_values.find_or_initialize_by(custom_field: custom_field)
          custom_value.update(value: field_value)
        end
      end
    end

    def custom_fields_params
      params.fetch(:custom_fields, []).map do |field|
        field.permit(:name, :value, :field_type, options: [])
      end
    end

    def format_building(building)
      {
        id: building.id,
        client_name: building.client.name,
        address: building.address,
        state: building.state,
        zip: building.address,
        custom_fields: building.building_custom_field_values.map do |field_value|
          {
            field_name: field_value.custom_field.field_name,
            value: field_value.value,
            field_type: field_value.custom_field.field_type,
            options: field_value.custom_field.options
          }
        end
      }
    end
  end
end
