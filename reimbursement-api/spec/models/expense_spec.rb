require 'rails_helper'

RSpec.describe Expense, type: :model do
  let(:project)     { create(:project) }
  let(:project_tag) { create(:project_tag, project: project) }
  subject { build(:expense, project: project, project_tag: project_tag) }

  it { is_expected.to validate_numericality_of(:amount).is_greater_than(0) }
  it { is_expected.to validate_presence_of(:date) }
  it { is_expected.to validate_presence_of(:description) }
  
  it "serializes tags as an Array" do
    subject.save!

    expect(subject.reload.project_tag_id).to eq(project_tag.id)
  end
end
