require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  scenario "create" do
    user = { email: 'newuser@newuser.com', password: 'password' }

    post :create, user: user
    expect(response.status).to eq 302
  end
end
