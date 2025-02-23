class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :budget

  has_many :project_tags
  has_many :users, key: :subordinates

  class ProjectTagSerializer < ActiveModel::Serializer
    attributes :id, :tag, :allocated_budget
  end

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email
  end
end
