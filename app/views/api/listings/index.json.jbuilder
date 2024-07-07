json.array! @listings do |listing|
    json.extract! listing, :id, :title, :description, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, :created_at, :updated_at
    
    json.host do
        json.id listing.host.id
        json.first_name listing.host.first_name
        json.last_name listing.host.last_name
    end

    json.reservations listing.reservations do |reservation|
        json.extract! reservation, :id, :guest_id, :listing_id, :check_in, :check_out, :num_guests, :created_at, :updated_at
    end

    json.photoUrls listing.photos.attached? ? listing.photos.map { |photo| photo.url } : nil
end
