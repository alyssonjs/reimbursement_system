class ProjectTag < ApplicationRecord
  belongs_to :project

  validates :tag, presence: true
  validates :allocated_budget, numericality: { greater_than: 0 }
end
