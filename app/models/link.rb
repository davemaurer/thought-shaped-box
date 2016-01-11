class Link < ActiveRecord::Base
  belongs_to :user

  validates :url, presence: true, url: true
  validates_presence_of :title

  def status
    self.read ? "Read" : "Unread"
  end
end
