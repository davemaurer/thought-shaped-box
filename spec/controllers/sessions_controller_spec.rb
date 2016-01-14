require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  scenario "create" do
    user = User.create(email: 'newuser@newuser.com', password: 'password')
    session = { user_id: user.id }

    post :create, session: session
    expect(response.status).to eq 200
  end

  scenario "destroy" do
    user = User.create(email: 'newuser@newuser.com', password: 'password')
    session = {user_id: user.id}

    post :create, session: session
    expect(response.status).to eq 200
    get :destroy, session: session
    expect(response.status).to eq 302
  end
end
