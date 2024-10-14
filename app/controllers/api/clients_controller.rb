module Api
  class ClientsController < ApplicationController

    # GET /clients
    def index
      clients = Client.all
      render json: clients
    end
  end
end