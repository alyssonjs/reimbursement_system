class ManagerPolicy < ApplicationPolicy
  def create_expense?
    user.employee? || user.manager?
  end

  def create_user?
    user.manager?
  end

  def create_project?
    user.manager?
  end

  def create_tag?
    user.manager?
  end
end