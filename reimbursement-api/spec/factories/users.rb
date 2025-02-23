FactoryBot.define do
  factory :user do
    name { "Test Employee" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
    role { :employee }
  end

  factory :manager, class: "User" do
    name { "Test Manager" }
    sequence(:email) { |n| "manager#{n}@example.com" }
    password { "password" }
    role { :manager }
  end
end
