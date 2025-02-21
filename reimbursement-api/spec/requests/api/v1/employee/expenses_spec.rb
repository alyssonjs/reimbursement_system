# spec/requests/api/v1/employee/expenses_spec.rb
require 'rails_helper'

RSpec.describe "Api::V1::Employee::Expenses", type: :request do
  let(:employee) { create(:user, role: :employee) }
  let(:manager)  { create(:manager) }
  let(:token)    { JsonWebToken.encode(user_id: employee.id) }
  let(:headers)  { { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' } }
  
  # Create a project and a project tag (the project factory already creates and associates a manager)
  let(:project)     { create(:project) }
  let(:project_tag) { create(:project_tag, project: project) }
  
  # Create an expense associated with the employee, project, and project_tag
  let!(:expense) { create(:expense, user: employee, project: project, project_tag: project_tag) }
  
  describe "GET /api/v1/employee/expenses" do
    it "returns the authenticated employee's expenses with project and project_tag included" do
      get "/api/v1/employee/expenses", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.first["id"]).to eq(expense.id)
      expect(json.first).to have_key("project")
      expect(json.first).to have_key("project_tag")
    end

    it "returns 401 if not authenticated" do
      get "/api/v1/employee/expenses"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/v1/employee/expenses/:id" do
    it "returns the requested expense with its associations" do
      get "/api/v1/employee/expenses/#{expense.id}", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["id"]).to eq(expense.id)
      expect(json).to have_key("project")
      expect(json).to have_key("project_tag")
    end

    it "returns 500 if the expense does not exist" do
      get "/api/v1/employee/expenses/99999", headers: headers
      expect(response).to have_http_status(500)
      json = JSON.parse(response.body)
      expect(json).to have_key("error")
    end
  end

  describe "POST /api/v1/employee/expenses" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          expense: {
            amount: 150.75,
            date: "2025-01-30",
            description: "Team lunch",
            project_id: project.id,
            project_tag_id: project_tag.id,
            tags: ["meal"]
          }
        }
      end

      it "creates a new expense and returns status created" do
        expect {
          post "/api/v1/employee/expenses", params: valid_params.to_json, headers: headers
        }.to change { employee.expenses.count }.by(1)
        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["amount"]).to eq("150.75") # Depending on your serialization, this may be a string or number
        expect(json["description"]).to eq("Team lunch")
        expect(json).to have_key("project")
        expect(json).to have_key("project_tag")
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) do
        { expense: { amount: -10, date: "", description: "", project_id: nil, project_tag_id: nil } }
      end

      it "returns validation errors with status unprocessable_entity" do
        post "/api/v1/employee/expenses", params: invalid_params.to_json, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json).to have_key("errors")
      end
    end
  end

  describe "PUT /api/v1/employee/expenses/:id" do
    let(:update_params) { { expense: { description: "Updated description", amount: 200 } } }

    it "updates the expense and returns status ok" do
      put "/api/v1/employee/expenses/#{expense.id}", params: update_params.to_json, headers: headers
      expect(response).to have_http_status(:ok)
      expense.reload
      expect(expense.description).to eq("Updated description")
      expect(expense.amount).to eq(200)
    end
  end

  describe "DELETE /api/v1/employee/expenses/:id" do
    it "deletes the expense and returns no_content" do
      expect {
        delete "/api/v1/employee/expenses/#{expense.id}", headers: headers
      }.to change { employee.expenses.count }.by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end

  context "when the user is not an employee" do
    let(:manager_token) { JsonWebToken.encode(user_id: manager.id) }
    let(:manager_headers) { { 'Authorization' => "Bearer #{manager_token}", 'Content-Type' => 'application/json' } }

    it "returns unauthorized for employee endpoints" do
      get "/api/v1/employee/expenses", headers: manager_headers
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
