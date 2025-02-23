class CreateProjectService
  def initialize(user, project_params)
    @user = user
    @project_params = project_params.dup
  end

  def call
    ActiveRecord::Base.transaction do
      create_project
      associate_subordinates
      process_tags
      @project
    end
  rescue => e
    Rails.logger.error "❌ Erro ao criar projeto: #{e.message}"
    nil
  end

  private

  def create_project
    project_attrs = @project_params.except(:project_tags_attributes, :subordinate_ids)
    @project = @user.managed_projects.new(project_attrs)
    raise ActiveRecord::Rollback, "Erro ao salvar projeto" unless @project.save
  end

  def process_tags
    return unless @project_params[:project_tags_attributes]

    @project_params[:project_tags_attributes].each do |tag_attr|
      tag_name = tag_attr[:tag].strip.downcase
      tag = Tag.find_or_create_by!(name: tag_name)
      @project.project_tags.create!(tag: tag, allocated_budget: tag_attr[:allocated_budget])
    end
  end

  def associate_subordinates
    return unless @project_params[:subordinate_ids]

    @project.users = User.where(id: @project_params[:subordinate_ids])
  end
end
