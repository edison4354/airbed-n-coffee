# == Schema Information
#
# Table name: listings
#
#  id              :bigint           not null, primary key
#  host_id         :bigint           not null
#  title           :string           not null
#  description     :text             not null
#  photo_url       :string           not null
#  category        :string           not null
#  price_per_night :decimal(10, 2)   not null
#  address         :string           not null
#  num_bedrooms    :integer          not null
#  num_bathrooms   :integer          not null
#  amenities       :text             default([]), not null, is an Array
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Listing < ApplicationRecord
    AMENITIES = ['WiFi', 'Pool', 'Parking', 'Air Conditioning', 'Kitchen', 'Bathtub', 'Central Heating', 'Ocean View'] # Constants are capitalized by convention
    CATEGORIES = ['Beach', 'Cabin', 'Beachfront', 'Lakefront', 'Countryside', 'Icons', 'Offgrid', 'Amazing Pools', 'Amazing Views', 'OMG', 'Treehouse', 'Mansions']

    validates :host, :title, :description, :photo_url, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, presence: true
    validates :title, length: { minimum: 6 , maximum: 255 }
    validates :price_per_night, numericality: { greater_than: 0 }
    validates :num_bedrooms, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :num_bathrooms, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :category, inclusion: { in: CATEGORIES, message: "%{value} is not a valid category" }
    validate :amenities_must_be_valid

    belongs_to :host,
        primary_key: :id,
        foreign_key: :host_id,
        class_name: :User

    private 

    def amenities_must_be_valid
        return if amenities.nil?
    
        amenities.each do |amenity|
          unless AMENITIES.include?(amenity)
            errors.add(:amenities, "#{amenity} is not a valid amenity")
          end
        end
    end
end
