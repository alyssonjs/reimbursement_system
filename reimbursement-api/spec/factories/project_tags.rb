FactoryBot.define do
  factory :project_tag do
    tag { "meal" }
    allocated_budget { 500 }
    association :project
  end
end
