class Api::AuthenticationController < ApplicationController
  # Skip authentication para login e logout
  skip_before_action :authenticate_request, only: [:login, :logout]

  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, message: 'Login success!',
                     exp: time.strftime("%m-%d-%Y %H:%M"),
                     user_infos: @user,
                     role: @user.role }, 
                     status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def logout
    # JWT é stateless; para revogar tokens é necessário implementar uma blacklist.
    # Aqui, simplesmente retornamos sucesso.
    render json: { message: 'Logout successful!' }, status: :ok
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
