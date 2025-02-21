class Api::V1::Manager::ProjectsController < ApplicationController
  before_action :authenticate_request
  before_action :require_manager

  def index
    @projects = current_user.managed_projects.includes(:project_tags, :subordinates)
    render json: @projects, include: [:project_tags, :subordinates]
  end

  def show
    @project = current_user.managed_projects.find(params[:id])
    render json: @project, include: [:project_tags, :subordinates]
  end

  def create
    @project = current_user.managed_projects.new(project_params)
    if @project.save
      render json: @project, status: :created
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @project = current_user.managed_projects.find(params[:id])
    if @project.update(project_params)
      render json: @project
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @project = current_user.managed_projects.find(params[:id])
    @project.destroy
    head :no_content
  end

  private

  def require_manager
    render json: { error: 'Acesso negado' }, status: :unauthorized unless current_user.manager?
  end

  def project_params
    params.require(:project).permit(
      :name, :description, :budget,
      project_tags_attributes: [:id, :tag, :allocated_budget, :_destroy],
      subordinate_ids: []  # IDs dos subordinados a serem associados
    )
  end
end
