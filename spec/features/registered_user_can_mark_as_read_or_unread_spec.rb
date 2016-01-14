require 'rails_helper'

RSpec.feature "User can change the read status of a link", js: true do
  scenario "marks unread link as read" do
    user = User.create!(email: "newuser@newuser.com", password: "password")
    Link.create!(title: "mysite", url: "http://localhost:3000", user_id: user.id)
    log_in_user

    wait_for_ajax

    expect(page).to have_content "Mark as Read"

    click_button "Mark as Read"
    expect(page).to have_content "Mark as Unread"
    expect(page).not_to have_content "Mark as Read"
  end

  scenario "can mark as Read links as Unread" do
    user = User.create!(email: "newuser@newuser.com", password: "password")
    Link.create!(title: "mysite", url: "http://localhost:3000", user_id: user.id)
    log_in_user

    wait_for_ajax

    expect(page).to have_content "Mark as Read"

    click_button "Mark as Read"
    expect(page).to have_content "Mark as Unread"
    expect(page).not_to have_content "Mark as Read"

    click_button "Mark as Unread"
    expect(page).not_to have_content "Mark as Unread"
    expect(page).to have_content "Mark as Read"
  end
end
