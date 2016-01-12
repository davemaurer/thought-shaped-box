Rails.application.routes.draw do
  root 'site#show'

  resources :users, only: [:create, :new]
  resources :links, only: [:index, :create, :new]

  namespace :api do
    namespace :v1 do
      resources :links, only: [:update]
    end
  end

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
end
