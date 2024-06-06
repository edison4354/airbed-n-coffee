json.listing do
    json.extract! @listing, :id, :host_id, :title, :description, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, :created_at, :updated_at
    
    json.photoUrls listing.photos.attached? ? listing.photos.map { |photo| photo.url } : nil
end