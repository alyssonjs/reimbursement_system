class Api::V1::Manager::ExpensesController < ApplicationController
  def index
    subordinate_ids = current_user.subordinates.pluck(:id)
    @expenses = Expense.where(user_id: subordinate_ids).includes(:project)
    render json: @expenses, include: [:project_tags]
  end

  def show
    @expense = Expense.find(params[:id])
    if current_user.subordinates.include?(@expense.user)
      render json: @expense
    else
      render json: { error: 'Acesso negado' }, status: :unauthorized
    end
  end

  private

  def require_manager
    render json: { error: 'Acesso negado' }, status: :unauthorized unless current_user.manager?
  end
end
