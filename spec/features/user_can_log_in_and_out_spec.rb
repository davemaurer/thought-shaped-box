require 'rails_helper'

RSpec.feature "User login/logout" do
  scenario "unregistered user sees sign up option" do
    visit root_path

    expect(page).to have_content('Sign Up Here')
  end

  scenario "unregistered user creates an account" do
    visit root_path

    click_link('Sign Up Here')

    expect(User.count).to eq(0)

    expect(current_path).to eq('/users/new')
    fill_in 'Email', with: 'newuser@newuser.com'
    fill_in 'Password', with: 'password'
    fill_in 'Confirm Password', with: 'password'
    click_on('Submit')

    expect(User.count).to eq(1)
    expect(User.first.email).to eq('newuser@newuser.com')
    expect(current_path).to eq(site_index_path)
    expect(page).to have_content('Hello, newuser@newuser.com')
  end
end
