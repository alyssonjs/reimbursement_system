Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    post 'login', to: 'authentication#login'
    namespace :v1 do
      namespace :manager do
        resources :expenses, only: [:index, :show] do
          member do
            put 'update_status'
          end
        end
        resources :projects, only: [:index, :show, :create, :update, :destroy]
        resources :subordinates, only: [:index]
      end
    
      namespace :employee do
        resources :expenses, only: [:index, :show, :create, :update, :destroy]
        resources :projects, only: [:index, :show,]
      end
    end
  end
end