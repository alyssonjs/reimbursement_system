FactoryBot.define do
  factory :tag do
    name { "example_tag" }

    association :taggable, factory: :expense  
  end
end