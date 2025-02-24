require 'rails_helper'

RSpec.describe ProjectTag, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:project) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:tag) }
    it { is_expected.to validate_numericality_of(:allocated_budget).is_greater_than(0) }

    context "when allocated_budget is zero" do
      subject { build(:project_tag, allocated_budget: 0) }

      it "is not valid" do
        expect(subject).not_to be_valid
        expect(subject.errors[:allocated_budget]).to include("must be greater than 0")
      end
    end

    context "when allocated_budget is negative" do
      subject { build(:project_tag, allocated_budget: -100) }

      it "is not valid" do
        expect(subject).not_to be_valid
        expect(subject.errors[:allocated_budget]).to include("must be greater than 0")
      end
    end

    context "when allocated_budget is valid" do
      subject { build(:project_tag, allocated_budget: 500, tag: "Valid Tag") }

      it "is valid" do
        expect(subject).to be_valid
      end
    end
  end
end
