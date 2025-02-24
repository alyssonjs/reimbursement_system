require 'rails_helper'

RSpec.describe "Api::V1::Manager::Projects", type: :request do
  let(:manager) { create(:user, :manager) }
  let!(:project) { create(:project, manager: manager) }
  let(:manager_token) { JsonWebToken.encode(user_id: manager.id) }
  let(:headers) { { 'Authorization' => "Bearer #{manager_token}", 'Content-Type' => 'application/json' } }
  let(:valid_attributes) do
    {
      name: 'New Project',
      description: 'Project description',
      budget: 1000.0,
      project_tags_attributes: [{ tag: 'Tag 1', allocated_budget: 500 }],
      subordinate_ids: [create(:user).id]
    }
  end

  describe "GET /api/v1/manager/projects" do
    it "returns the list of projects managed by the manager" do
      get "/api/v1/manager/projects", headers: headers
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.map { |p| p["id"] }).to include(project.id)
    end
  end

  describe "GET /api/v1/manager/projects/:id" do
    it "returns the project details" do
      get "/api/v1/manager/projects/#{project.id}", headers: headers
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["id"]).to eq(project.id)
    end
  end

  describe "POST /api/v1/manager/projects" do
    context "with valid parameters" do
      it "creates a new project and returns status created" do
        expect {
          post "/api/v1/manager/projects", params: { project: valid_attributes }.to_json, headers: headers
        }.to change(Project, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable_entity status with errors" do
        post "/api/v1/manager/projects", params: { project: valid_attributes.merge(name: '') }.to_json, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to be_present
      end
    end
  end

  describe "PUT /api/v1/manager/projects/:id" do
    context "with valid parameters" do
      it "updates the project and returns status ok" do
        put "/api/v1/manager/projects/#{project.id}", params: { project: { name: 'Updated Project' } }.to_json, headers: headers
        expect(response).to have_http_status(:ok)
        project.reload
        expect(project.name).to eq('Updated Project')
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable_entity status with errors" do
        put "/api/v1/manager/projects/#{project.id}", params: { project: { name: '' } }.to_json, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to be_present
      end
    end
  end

  describe "DELETE /api/v1/manager/projects/:id" do
    it "destroys the project and returns status no_content" do
      expect {
        delete "/api/v1/manager/projects/#{project.id}", headers: headers
      }.to change(Project, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
