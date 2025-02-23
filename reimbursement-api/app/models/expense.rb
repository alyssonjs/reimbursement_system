class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :project
  belongs_to :project_tag

  has_one_attached :receipt
  has_one_attached :fiscal_coupon

  validates :amount, numericality: { greater_than: 0 }
  validates :date, :description, presence: true
end
