require 'rails_helper'

RSpec.describe "Api::V1::Manager::Expenses", type: :request do
  let(:manager) { create(:user, :manager) }
  let(:subordinate) { create(:user) }
  let(:other_user) { create(:user) }
  let(:manager_token) { JsonWebToken.encode(user_id: manager.id) }
  let(:headers) { { 'Authorization' => "Bearer #{manager_token}", 'Content-Type' => 'application/json' } }
  let!(:expense) { create(:expense, user: subordinate) }
  let!(:unauthorized_expense) { create(:expense, user: other_user) }

  before do
    manager.subordinates << subordinate
  end

  describe "GET /api/v1/manager/expenses" do
    it "returns the expenses of the manager's subordinates" do
      get "/api/v1/manager/expenses", headers: headers
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.map { |e| e["id"] }).to include(expense.id)
      expect(json.map { |e| e["id"] }).not_to include(unauthorized_expense.id)
    end

    it "returns 401 if not authenticated" do
      get "/api/v1/manager/expenses"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/v1/manager/expenses/:id" do
    context "when the expense belongs to a subordinate" do
      it "returns the expense" do
        get "/api/v1/manager/expenses/#{expense.id}", headers: headers
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["id"]).to eq(expense.id)
      end
    end

    context "when the expense does not belong to a subordinate" do
      it "returns access denied" do
        get "/api/v1/manager/expenses/#{unauthorized_expense.id}", headers: headers
        expect(response).to have_http_status(:unauthorized)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Acesso negado")
      end
    end
  end

  describe "PUT /api/v1/manager/expenses/:id/update_status" do
    context "when the expense belongs to a subordinate" do
      it "updates the status when a valid status is provided" do
        put "/api/v1/manager/expenses/#{expense.id}/update_status", params: { status: 'accepted', comment: 'Approved' }.to_json, headers: headers
        expect(response).to have_http_status(:ok)
        expense.reload
        expect(expense.status).to eq('accepted')
        expect(expense.comment).to eq('Approved')
      end

      it "returns an error for an invalid status" do
        put "/api/v1/manager/expenses/#{expense.id}/update_status", params: { status: 'invalid', comment: 'Invalid status' }.to_json, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Status inválido")
      end
    end

    context "when the expense does not belong to a subordinate" do
      it "returns access denied" do
        put "/api/v1/manager/expenses/#{unauthorized_expense.id}/update_status", params: { status: 'accepted', comment: 'Approved' }.to_json, headers: headers
        expect(response).to have_http_status(:unauthorized)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Acesso negado")
      end
    end
  end
end
