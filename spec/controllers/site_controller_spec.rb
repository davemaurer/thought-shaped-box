require 'rails_helper'

RSpec.describe SiteController, type: :controller do
  scenario "show" do
    get :show

    expect(response.status).to eq(200)
  end
end
