class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :budget

  has_many :project_tags, serializer: ProjectTagSerializer
  has_many :users, key: :subordinates, serializer: UserSerializer
end
