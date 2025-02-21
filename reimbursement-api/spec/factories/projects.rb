FactoryBot.define do
  factory :project do
    name { "Test Project" }
    description { "Project description" }
    budget { 10000 }
    association :manager, factory: :manager
  end
end
