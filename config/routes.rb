Rails.application.routes.draw do
  root 'site#show'

  resources :users, only: [:create, :new]

  get '/site/index', to: 'site#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
end
