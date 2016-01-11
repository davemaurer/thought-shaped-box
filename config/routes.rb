Rails.application.routes.draw do
  root 'site#show'

  resources :users, only: [:create, :new]
  resources :links, only: [:index, :create, :new]

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
end
