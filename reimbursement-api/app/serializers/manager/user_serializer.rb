class Manager::UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
end