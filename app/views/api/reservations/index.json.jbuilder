json.array! @reservations do |reservation|
    json.extract! reservation, :id, :guest_id, :listing_id, :check_in, :check_out, :num_guests, :created_at, :updated_at

    json.listing do
        json.extract! reservation.listing, :id, :title, :description, :price_per_night, :address, :host_id

        json.photoUrls reservation.listing.photos.attached? ? reservation.listing.photos.map { |photo| photo.url } : nil
    end
end