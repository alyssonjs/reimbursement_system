# spec/requests/api/v1/employee/projects_spec.rb
require 'rails_helper'

RSpec.describe "Api::V1::Employee::Projects", type: :request do
  let(:employee) { create(:user, role: :employee) }
  let(:token)    { JsonWebToken.encode(user_id: employee.id) }
  let(:headers)  { { 'Authorization' => "Bearer #{token}", 'Content-Type' => 'application/json' } }

  let!(:project) { create(:project) }
  let!(:project_tag) { create(:project_tag, project: project) }
  
  before do
    employee.projects << project
  end

  describe "GET /api/v1/employee/projects" do
    it "returns the projects associated with the authenticated employee with project_tags included" do
      get "/api/v1/employee/projects", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.first["id"]).to eq(project.id)
      expect(json.first).to have_key("project_tags")
    end

    it "returns 401 if not authenticated" do
      get "/api/v1/employee/projects"
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "GET /api/v1/employee/projects/:id" do
    it "returns the specified project with its project_tags" do
      get "/api/v1/employee/projects/#{project.id}", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["id"]).to eq(project.id)
      expect(json).to have_key("project_tags")
    end

    it "returns 500 if the project is not found" do
      get "/api/v1/employee/projects/99999", headers: headers
      expect(response).to have_http_status(500)
      json = JSON.parse(response.body)
      expect(json).to have_key("error")
    end
  end
end
