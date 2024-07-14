json.extract! @reservation, :id, :guest_id, :listing_id, :check_in, :check_out, :num_guests, :created_at, :updated_at

json.listing do
    json.extract! @reservation.listing, :id, :title, :description, :price_per_night, :address, :host_id

    json.photoUrls @reservation.listing.photos.attached? ? @reservation.listing.photos.map { |photo| photo.url } : nil

    json.host do
        json.id @reservation.listing.host.id
        json.first_name @reservation.listing.host.first_name
        json.last_name @reservation.listing.host.last_name
    end
end