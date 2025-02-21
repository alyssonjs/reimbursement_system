class Project < ApplicationRecord
  belongs_to :manager, class_name: 'User'
  
  has_many :project_tags, dependent: :destroy
  has_many :project_assignments, dependent: :destroy
  has_many :users, through: :project_assignments

  validates :name, presence: true
  validates :budget, presence: true, numericality: { greater_than: 0 }

  validate :allocated_budget_within_total

  def allocated_budget_within_total
    return unless budget.present?
    total_allocated = project_tags.sum(:allocated_budget)
    if total_allocated > budget
      errors.add(:project_tags, "the sum of allocated budgets exceeds the project budget")
    end
  end
end
