class Employee::ExpenseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :amount, :date, :description, :status, :comment,
             :receipt_url, :fiscal_coupon_url

  belongs_to :project
  belongs_to :project_tag
  belongs_to :user

  def receipt_url
    if object.receipt.attached?
      rails_blob_url(object.receipt)
    end
  end

  def fiscal_coupon_url
    if object.fiscal_coupon.attached?
      rails_blob_url(object.fiscal_coupon)
    end
  end
end
