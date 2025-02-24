class Manager::ProjectTagSerializer < ActiveModel::Serializer
  attributes :id, :tag, :allocated_budget
end