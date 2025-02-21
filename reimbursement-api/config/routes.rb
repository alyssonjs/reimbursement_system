Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    post 'login', to: 'authentication#login'
    namespace :v1 do
      namespace :manager do
        resources :expenses, only: [:index, :show]
        resources :projects, only: [:index, :show, :create, :update, :destroy]
        get 'subordinates', to: 'users#subordinates'
      end
    
      namespace :employee do
        resources :expenses, only: [:index, :show, :create, :update, :destroy]
        resources :projects, only: [:index, :show]
      end
    end
  end
end