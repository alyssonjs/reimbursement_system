require 'rails_helper'

RSpec.describe Project, type: :model do
  subject { build(:project) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:budget) }
  it { is_expected.to validate_numericality_of(:budget).is_greater_than(0) }

  it { is_expected.to belong_to(:manager) }
  it { is_expected.to have_many(:project_tags) }
  it { is_expected.to have_many(:project_assignments) }
  it { is_expected.to have_many(:users).through(:project_assignments) }
end
