json.array! @reservations do |reservation|
    json.extract! reservation, :id, :guest_id, :listing_id, :check_in, :check_out, :num_guests, :created_at, :updated_at
end