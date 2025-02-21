FactoryBot.define do
  factory :expense do
    amount { 150.75 }
    date { "2025-01-30" }
    description { "Team lunch" }
    status { "pending" }
    association :user
    association :project
    association :project_tag
  end
end
