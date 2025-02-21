FactoryBot.define do
  factory :project_assignment do
    association :project
    association :user
  end
end