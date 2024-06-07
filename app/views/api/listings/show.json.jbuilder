json.listing do
    json.extract! @listing, :id, :host_id, :title, :description, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, :created_at, :updated_at
    
    json.host do
        json.id @listing.host.id
        json.first_name @listing.host.first_name
        json.last_name @listing.host.last_name
    end

    json.photoUrls @listing.photos.attached? ? @listing.photos.map { |photo| photo.url } : nil
end