class Api::ExpensesController < ApplicationController
  before_action :authenticate_user

  def create
    expense = current_user.expenses.create!(expense_params)
    render json: expense, status: :created
  end

  private

  def expense_params
    params.require(:expense).permit(:amount, :date, :description, :location, tags: [])
  end

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    payload = JwtService.decode(token)
    @current_user = User.find(payload['user_id'])
  rescue JWT::DecodeError
    render json: { error: 'Invalid token' }, status: :unauthorized
  end
end