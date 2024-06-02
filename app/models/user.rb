# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :email,
        uniqueness: true, 
        length: { in: 3..100 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :first_name, :last_name, presence: true 
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..40 }, allow_nil: true

    before_validation :ensure_session_token

    def self.find_by_credentials(email, password)
        user = User.find_by(:email => email)
        user&.authenticate(password)
    end 

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    has_many :listings,
        primary_key: :id,
        foreign_key: :host_id,
        class_name: :Listing

    private 

    def generate_unique_session_token
        loop do
            token = SecureRandom.base64
            break token unless User.exists?(session_token: token)
        end
    end 

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end 

end
