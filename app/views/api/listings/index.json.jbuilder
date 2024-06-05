json.array! @listings do |listing|
    json.extract! listing, :id, :title, :description, :photo_url, :category, :price_per_night, :address, :num_bedrooms, :num_bathrooms, :amenities, :created_at, :updated_at
    json.host do
        json.id listing.host.id
        json.first_name listing.host.first_name
        json.last_name listing.host.last_name
    end
end
