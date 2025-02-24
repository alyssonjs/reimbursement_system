class Employee::ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :budget

  has_many :project_tags, serializer: Employee::ProjectTagSerializer
end
