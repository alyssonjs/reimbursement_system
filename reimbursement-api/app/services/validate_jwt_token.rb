class ValidateJwtToken
  def self.call(token)
    secret = Rails.application.credentials.secret_key_base || ENV['JWT_SECRET']
    JWT.decode(token, secret)[0]
  rescue JWT::DecodeError => e
    nil
  end

  def self.valid?(token)
    !!call(token)
  end
end