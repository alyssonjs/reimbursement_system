class User < ApplicationRecord
  has_secure_password
  has_many :expenses

  enum role: { employee: 0, manager: 1 }

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
end
