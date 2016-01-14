require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid" do
    user = User.create!(email: "newuser@newuser.com", password: "password")

    expect(user).to be_valid
  end
end
