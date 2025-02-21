FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
    role { :employee }
  end

  factory :manager, class: "User" do
    sequence(:email) { |n| "manager#{n}@example.com" }
    password { "password" }
    role { :manager }
  end
end
