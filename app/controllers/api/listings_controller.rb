class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.includes(:host, :reservations).all
    render :index
  end

  def show
    @listing = Listing.includes(:host, :reservations).find(params[:id])
    render :show
  end
end
