require 'rails_helper'

RSpec.describe "Api::V1::Manager::Subordinates", type: :request do
  let(:manager) { create(:user, :manager) }
  let!(:subordinate1) { create(:user) }
  let!(:subordinate2) { create(:user) }
  let(:manager_token) { JsonWebToken.encode(user_id: manager.id) }
  let(:headers) { { 'Authorization' => "Bearer #{manager_token}", 'Content-Type' => 'application/json' } }

  before do
    manager.subordinates << subordinate1
    manager.subordinates << subordinate2
  end

  describe "GET /api/v1/manager/subordinates" do
    it "returns the list of subordinates with limited attributes" do
      get "/api/v1/manager/subordinates", headers: headers
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.size).to eq(2)
      json.each do |subordinate|
        expect(subordinate.keys).to contain_exactly("id", "name", "email")
      end
    end
  end
end
