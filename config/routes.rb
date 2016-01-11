Rails.application.routes.draw do
  root 'site#show'

  resources :users, only: [:new, :create]
end
