class LinksController < ApplicationController
  def index
    @link = Link.new
    @links = current_user.links
  end

  def new
  end

  def create
    link = Link.new(link_params)
    link.user_id = current_user.id
    if link.save
      flash[:notice] = "Link Created!"
      redirect_to links_path
    else
      flash[:alert] = "URL invalid. Please try again."
      redirect_to links_path
    end
  end

  private
  def link_params
    params.require(:link).permit(:title, :url)
  end
end
