require "open-uri"

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
Reservation.destroy_all
Listing.destroy_all
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')
ApplicationRecord.connection.reset_pk_sequence!('reservations')

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
User.create!(
    first_name: 'Demo', 
    last_name: 'lition',
    email: 'demo@user.io', 
    password: 'password'
)

10.times do |i|
    User.create!(
        first_name: Faker::Name.first_name, 
        last_name: Faker::Name.last_name,
        email: Faker::Internet.email, 
        password: 'password'
    )
end

puts "Creating listings..."
# Create listings with random data
5.times do |x|
    13.times do |i|
        listing = Listing.create!(
            host_id: User.all.sample.id,
            title: Faker::Lorem.sentence(word_count: 3),
            description: Faker::Lorem.paragraph(sentence_count: 20),
            category: Listing::CATEGORIES.sample,
            price_per_night: rand(50..500),
            address: Faker::Address.full_address,
            num_bedrooms: rand(1..10),
            num_bathrooms: rand(1..5),
            amenities: Listing::AMENITIES.sample(rand(1..Listing::AMENITIES.length)),
        )
    
        5.times do |j|
            image_url = "https://airbed-n-coffee-seeds.s3.us-west-1.amazonaws.com/listing#{i + 1}_image#{j + 1}.png"
            listing.photos.attach(io: URI.open(image_url), filename: "listing#{i + 1}_image#{j + 1}.png")
        end
    end
end



puts "Creating reservations..."
# Create reservations with random data
Listing.all.each do |listing|
    check_in = Faker::Date.between(from: Date.today, to: 1.year.from_now)
    check_out = check_in + rand(3..10).days
    num_guests = rand(1..10)

    Reservation.create!(
        listing_id: listing.id,
        guest_id: User.all.sample.id,
        check_in: check_in,
        check_out: check_out,
        num_guests: num_guests
    )
end

puts "Done!"
