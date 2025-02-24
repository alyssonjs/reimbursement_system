class Api::V1::Employee::ProjectsController < ApplicationController
  before_action :authenticate_request

  def index
    @projects = current_user.projects.includes(:project_tags)
    render json: @projects, each_serializer: Employee::ProjectSerializer
  end

  def show
    @project = current_user.projects.find(params[:id])
    render json: @project, each: Employee::ProjectSerializer
  end
end

