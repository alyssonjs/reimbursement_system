class EmployeePolicy < ApplicationPolicy
  
  def create_expense?
    user.employee?
  end

end