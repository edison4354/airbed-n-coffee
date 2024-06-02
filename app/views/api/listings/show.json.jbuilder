json.listing do
    json.extract! @listing, :id, :host_id, :title, :description, :photo_url, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, :created_at, :updated_at
end