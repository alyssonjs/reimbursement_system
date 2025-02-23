class User < ApplicationRecord
  has_secure_password
  
  enum :role, { employee: 0, manager: 1 }

  has_many :expenses, dependent: :destroy

  belongs_to :manager, class_name: 'User', optional: true
  has_many :subordinates, class_name: 'User', foreign_key: 'manager_id'

  has_many :project_assignments, dependent: :destroy
  has_many :projects, through: :project_assignments
  has_many :managed_projects, class_name: 'Project', foreign_key: 'manager_id'
end
