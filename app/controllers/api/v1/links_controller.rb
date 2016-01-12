class Api::V1::LinksController < ApplicationController
  respond_to :json

  def mark_read
    link = Link.find(params[:id])
    respond_with link.update_attribute(:read, true)
  end

  def mark_unread
    link = Link.find(params[:id])
    respond_with link.update_attribute(:read, false)
  end
end
