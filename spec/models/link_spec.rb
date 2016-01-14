require 'rails_helper'

RSpec.describe Link, type: :model do
  it "is valid" do
    user = User.create!(email: "newuser@newuser.com", password: "password")
    link = Link.create!(title: "mysite", url: "http://localhost:3000", user_id: user.id)

    expect(link).to be_valid
  end
end
