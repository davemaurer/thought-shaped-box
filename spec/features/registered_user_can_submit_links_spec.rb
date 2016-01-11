require 'rails_helper'

RSpec.feature "User links", type: :feature do

  scenario "user successfully creates a link" do
    User.create!(email: "new@new.com", password: "password", password_confirmation: "password")
    log_in_user

    fill_in "Title", with: "google"
    fill_in "Url", with: "https://google.com"
    click_on("Create Link")

    expect(current_path).to eq(links_path)
    expect(page).to have_content("google")
    expect(page).to have_content("https://google.com")
    expect(page).to have_content("You Have Successfully Created A New Link!")
  end
end
