require 'rails_helper'

RSpec.feature "User login/logout" do
  scenario "unregistered user sees sign up option" do
    visit root_path

    expect(page).to have_content('Sign Up Here')
  end
end
