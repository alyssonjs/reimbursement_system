require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe "secure password" do
    it { is_expected.to have_secure_password }
  end

  describe "enum roles" do
    it "defines roles correctly" do
      expect(User.roles).to include("employee" => 0, "manager" => 1)
    end
  end

  describe "associations" do
    it { is_expected.to have_many(:expenses).dependent(:destroy) }
    it { is_expected.to belong_to(:manager).class_name('User').optional }
    it { is_expected.to have_many(:subordinates).class_name('User').with_foreign_key('manager_id') }
    it { is_expected.to have_many(:project_assignments).dependent(:destroy) }
    it { is_expected.to have_many(:projects).through(:project_assignments) }
    it { is_expected.to have_many(:managed_projects).class_name('Project').with_foreign_key('manager_id') }
  end
end
