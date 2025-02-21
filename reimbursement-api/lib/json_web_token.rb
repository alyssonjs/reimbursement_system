# app/services/json_web_token.rb
class JsonWebToken
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    secret = Rails.application.credentials.secret_key_base || ENV['JWT_SECRET']
    JWT.encode(payload, secret)
  end

  def self.decode(token)
    secret = Rails.application.credentials.secret_key_base || ENV['JWT_SECRET']
    decoded = JWT.decode(token, secret)[0]
    HashWithIndifferentAccess.new decoded
  rescue JWT::DecodeError => e
    nil
  end
end
