class Api::V1::Manager::ProjectsController < ApplicationController
  before_action :authenticate_request
  before_action :require_manager

  def index
    @projects = current_user.managed_projects.includes(:project_tags, :users)
    render json: @projects, each_serializer: Manager::ProjectSerializer
  end

  def show
    @project = current_user.managed_projects.find(params[:id])
    render json: @project, serializer: Manager::ProjectSerializer
  end

  def create
    @project = current_user.managed_projects.new(project_params.except(:subordinate_ids))

    if @project.save
      associate_subordinates
      render_project(:created)
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end  

  def update
    @project = current_user.managed_projects.find(params[:id])

    if @project.update(project_params)
      associate_subordinates
      render_project
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
      subordinate_ids: []
    )
  end

  def associate_subordinates
    return unless params[:project][:subordinate_ids]

    @project.users = User.where(id: params[:project][:subordinate_ids])
  end

  def render_project(status = :ok)
    render json: @project, status: status, serializer: Manager::ProjectSerializer
  end
end
