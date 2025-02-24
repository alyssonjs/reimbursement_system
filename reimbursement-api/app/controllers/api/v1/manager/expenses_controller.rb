class Api::V1::Manager::ExpensesController < ApplicationController
  before_action :require_manager
  before_action :set_expense, only: [:show, :update_status]

  def index
    subordinate_ids = current_user.subordinates.pluck(:id)
    @expenses = Expense.where(user_id: subordinate_ids)
                       .includes(:project, :user, :project_tag)
    render json: @expenses, each_serializer: Manager::ExpenseSerializer
  end

  def show
    if current_user.subordinates.include?(@expense.user)
      render json: @expense, serializer: Manager::ExpenseSerializer
    else
      render json: { error: 'Acesso negado' }, status: :unauthorized
    end
  end

  def update_status
    unless current_user.subordinates.include?(@expense.user)
      return render json: { error: 'Acesso negado' }, status: :unauthorized
    end

    new_status = params[:status].to_s.downcase
    allowed_statuses = ['accepted', 'rejected']
    unless allowed_statuses.include?(new_status)
      return render json: { error: 'Status inválido' }, status: :unprocessable_entity
    end

    comment = params[:comment]

    if @expense.update(status: new_status, comment: comment)
      render json: @expense, serializer: Manager::ExpenseSerializer
    else
      render json: { error: 'Não foi possível atualizar o status' }, status: :unprocessable_entity
    end
  end

  private

  def set_expense
    @expense = Expense.find(params[:id])
  end

  def require_manager
    render json: { error: 'Acesso negado' }, status: :unauthorized unless current_user.manager?
  end
end