class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.includes(:host).all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    render :show
  end
end
