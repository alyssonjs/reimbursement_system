class ApplicationController < ActionController::API
    before_action :authenticate_request
    
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from StandardError, with: :handle_standard_error
  
    private

    def authenticate_request
      token = request.headers["Authorization"]&.split(" ")&.last
      if token.blank?
        render json: { error: "Missing token" }, status: :unauthorized and return
      end

      jwt_payload = ValidateJwtToken.call(token)
      if jwt_payload
        @current_user = User.find_by(id: jwt_payload["user_id"])
        render json: { error: "Not Authorized" }, status: :unauthorized unless @current_user
      else
        render json: { error: "Invalid token" }, status: :unauthorized
      end
    end

    def current_user
      @current_user
    end

    def record_not_found(exception)
      Sentry.capture_exception(exception)
      render json: { error: exception.message }, status: :not_found
    end

    def handle_standard_error(exception)
      Sentry.capture_exception(exception)
      Rails.logger.error(exception.message)
      render json: { error: "Internal server error" }, status: :internal_server_error
    end
end
  