class Api::SessionsController < ApplicationController
    # before_action :require_logged_out, only: [:show, :create]
    # before_action :require_logged_in, only: [:destroy]

    def show
        if current_user
            render json: { user: current_user }
        else
            render json: { user: nil }
        end
    end

    def create
        email = params[:email]
        password = params[:password]
        @user = User.find_by_credentials(email, password)

        if @user
            login(@user)
            render json: { user: @user }
        else
            render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
        end
    end

    def destroy
        if current_user
            logout!
            render json: { message: 'success' }
        end
    end
end
