class Api::ReservationsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        if  params[:userId]
            @reservations = Reservation.includes(listing: :host).where(guest_id: params[:userId])
        else 
            @reservations = Reservation.includes(listing: :host).all
        end
        
        render :index
    end

    def update
        @reservation = Reservation.find(params[:id])

        if @reservation.update(reservation_params)
            render :index
        else
            render json: @reservation.errors.full_messages, status: 422
        end
    end

    def show
        @reservation = Reservation.includes(:listing).find(params[:id])
        render :show
    end

    def create
        @reservation = Reservation.new(reservation_params)
        @reservation.guest_id = current_user.id

        if @reservation.save
            render :show
        else
            render json: @reservation.errors.full_messages, status: 422
        end
    end

    def destroy
        @reservation = Reservation.find(params[:id])
        @reservation.destroy
        render :index
    end

    private

    def reservation_params
        params.require(:reservation).permit(:listing_id, :check_in, :check_out, :num_guests)
    end
end
