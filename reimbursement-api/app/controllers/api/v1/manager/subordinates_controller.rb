class Api::V1::Manager::SubordinatesController < ApplicationController
  before_action :authenticate_request
  before_action :require_manager

  def index
    @subordinates = current_user.subordinates
    render json: @subordinates, only: [:id, :name, :email]
  end

  private

  def require_manager
    render json: { error: 'Acesso negado' }, status: :unauthorized unless current_user.manager?
  end
end
