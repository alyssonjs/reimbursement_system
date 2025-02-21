class User < ApplicationRecord
  has_secure_password
  
  enum :role, { employee: 0, manager: 1 }

  # Relações para reembolsos
  has_many :expenses, dependent: :destroy

  # Hierarquia: empregado tem um manager; manager tem muitos subordinados
  belongs_to :manager, class_name: 'User', optional: true
  has_many :subordinates, class_name: 'User', foreign_key: 'manager_id'

  # Relação com projetos (um usuário pode participar de vários projetos)
  has_many :project_assignments, dependent: :destroy
  has_many :projects, through: :project_assignments
  has_many :managed_projects, class_name: 'Project', foreign_key: 'manager_id'
end
