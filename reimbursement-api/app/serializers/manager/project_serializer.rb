class Manager::ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :budget

  has_many :project_tags, serializer: Manager::ProjectTagSerializer
  has_many :users, key: :subordinates, serializer: Manager::UserSerializer
end
