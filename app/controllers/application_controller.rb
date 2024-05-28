class ApplicationController < ActionController::API
    before_action :snake_case_params

    helper_method :current_user, :logged_in?

    def current_user
        current_session_token = session[:session_token]
        @current_user ||= User.find_by(session_token: current_session_token)
    end

    def require_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized 
        end
    end

    # def require_logged_out
    #     redirect_to users_url if logged_in?
    # end

    def logged_in?
        !!current_user
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token! if logged_in?
        session[:session_token] = nil
        @current_user = nil
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
