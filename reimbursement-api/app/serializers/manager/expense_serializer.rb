class Manager::ExpenseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :amount, :date, :description, :status, :comment,
             :receipt_url, :fiscal_coupon_url

  belongs_to :project, serializer: Manager::ProjectSerializer
  belongs_to :project_tag, serializer: Manager::ProjectTagSerializer
  belongs_to :user, serializer: UserSerializer

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