class Tag < ApplicationRecord
  has_many :project_tags, as: :taggable

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
