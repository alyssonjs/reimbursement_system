# db/seeds.rb

puts "Limpando dados antigos..."
ProjectAssignment.destroy_all
Expense.destroy_all
ProjectTag.destroy_all
Project.destroy_all
User.destroy_all

puts "Criando gestores..."
manager1 = User.create!(
  name: "Manager One",
  email: "manager1@example.com",
  password: "password",
  role: :manager
)
manager2 = User.create!(
  name: "Manager Two",
  email: "manager2@example.com",
  password: "password",
  role: :manager
)

puts "Criando empregados..."
employee1 = User.create!(
  name: "Employee One",
  email: "employee1@example.com",
  password: "password",
  role: :employee,
  manager: manager1
)
employee2 = User.create!(
  name: "Employee Two",
  email: "employee2@example.com",
  password: "password",
  role: :employee,
  manager: manager1
)
employee3 = User.create!(
  name: "Employee Three",
  email: "employee3@example.com",
  password: "password",
  role: :employee,
  manager: manager2
)
employee4 = User.create!(
  name: "Employee Four",
  email: "employee4@example.com",
  password: "password",
  role: :employee,
  manager: manager2
)

puts "Criando projetos..."
project1 = Project.create!(
  name: "Projeto Mobile",
  description: "Desenvolvimento de aplicativo mobile.",
  budget: 5000,
  manager: manager1
)
project2 = Project.create!(
  name: "Projeto X",
  description: "Expansão da infraestrutura.",
  budget: 10000,
  manager: manager2
)

puts "Criando tags para os projetos..."
tag1 = ProjectTag.create!(project: project1, tag: "refeição", allocated_budget: 1000)
tag2 = ProjectTag.create!(project: project1, tag: "transporte", allocated_budget: 500)
tag3 = ProjectTag.create!(project: project2, tag: "material", allocated_budget: 4000)
tag4 = ProjectTag.create!(project: project2, tag: "infraestrutura", allocated_budget: 6000)

puts "Associando empregados aos projetos..."
ProjectAssignment.create!(project: project1, user: employee1)
ProjectAssignment.create!(project: project1, user: employee2)
ProjectAssignment.create!(project: project2, user: employee3)
ProjectAssignment.create!(project: project2, user: employee4)

puts "Seeds concluídos!"
