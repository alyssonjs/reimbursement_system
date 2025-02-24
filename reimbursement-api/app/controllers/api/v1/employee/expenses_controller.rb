class Api::V1::Employee::ExpensesController < ApplicationController
  before_action :authenticate_request
  before_action :require_employee

  def index
    @expenses = current_user.expenses.includes(:project, :project_tag)
    render json: @expenses, each_serializer: Employee::ExpenseSerializer
  end
  
  def show
    @expense = current_user.expenses.find(params[:id])
    render json: @expense, serializer: Employee::ExpenseSerializer
  end
  
  def create
    @expense = current_user.expenses.new(expense_params)
    if @expense.save
      render json: @expense, serializer: Employee::ExpenseSerializer, status: :created
    else
      render json: { errors: @expense.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    @expense = current_user.expenses.find(params[:id])
    if @expense.update(expense_params)
      render json: @expense, serializer: Employee::ExpenseSerializer
    else
      render json: { errors: @expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @expense = current_user.expenses.find(params[:id])
    @expense.destroy
    head :no_content
  end

  private

  def require_employee
    render json: { error: 'Acesso negado' }, status: :unauthorized unless current_user.employee?
  end

  def expense_params
    params.require(:expense).permit(:amount, :date, :description, :project_id, :project_tag_id, :receipt, :fiscal_coupon)
  end
end
