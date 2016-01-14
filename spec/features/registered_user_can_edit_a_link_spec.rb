require 'rails_helper'

RSpec.feature "User can edit a link", js: true do
  scenario "successfully" do
    user = User.create!(email: "newuser@newuser.com", password: "password")
    Link.create!(title: "mysite", url: "http://localhost:3000", user_id: user.id)
    log_in_user

    wait_for_ajax

    expect(page).to have_content 'mysite'

    fill_in 'edit-link-title', with: 'anothersite'
    fill_in 'edit-link-url', with: 'http://www.google.com'

    click_button "Edit Link"
    expect(page).to have_content 'anothersite'
    expect(page).not_to have_content 'mysite'
  end

  scenario "unsuccessfully" do
    user = User.create!(email: "newuser@newuser.com", password: "password")
    Link.create!(title: "mysite", url: "http://localhost:3000", user_id: user.id)
    log_in_user

    wait_for_ajax

    expect(page).to have_content 'mysite'

    fill_in 'edit-link-title', with: 'mysite'
    fill_in 'edit-link-url', with: 'thissitewontwork'

    click_button "Edit Link"
    expect(page).to have_content 'mysite'
    expect(page).not_to have_content 'anothersite'
  end
end
