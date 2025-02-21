# Se você não precisa desse arquivo, remova-o. Caso precise, defina-o como:
class ApiRequestAuth
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
  rescue ActiveRecord::RecordNotFound => e
    raise ExceptionHandler::InvalidToken, "Invalid token: #{e.message}"
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    if headers['Authorization'].present?
      return verify_token(headers['Authorization']) ? headers['Authorization'].split(' ').last : false
    else
      raise ExceptionHandler::MissingToken, "Missing token"
    end
  end

  def verify_token(token)
    ValidateJwtToken.valid?(token)
  end
end
