class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :project  # Adicione esta linha
  belongs_to :project_tag  # Adicione esta linha

  has_one_attached :receipt  # Exemplo de ActiveStorage

  validates :amount, numericality: { greater_than: 0 }
  validates :date, :description, presence: true
end
