# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Listing.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('listings')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      first_name: 'Demo', 
      last_name: 'lition',
      email: 'demo@user.io', 
      password: 'password'
    )

    puts "Creating listings..."
    # Create one listing with an easy to remember title, description, and price:
    Listing.create!(
        host_id: User.first.id,
        title: 'Demo Listing',
        description: 'This is a demo listing. It is a great place to stay!',
        photo_url: './app/assets/images/demo-listing.jpg',
        category: 'Cabin',
        price_per_night: 100.00,
        address: '1234 Demo St',
        num_bedrooms: 2,
        num_bathrooms: 1,
        amenities: ['WiFi', 'Pool', 'Parking', 'Air Conditioning', 'Kitchen', 'Bathtub'],
    )

    Listing.create!(
        host_id: User.first.id,
        title: 'Demo Listing',
        description: 'This is a demo listing. It is a great place to stay!',
        photo_url: './app/assets/images/demo-listing.jpg',
        category: 'Cabin',
        price_per_night: 100.00,
        address: '3123 Edison St',
        num_bedrooms: 2,
        num_bathrooms: 1,
        amenities: ['WiFi', 'Pool', 'Parking', 'Air Conditioning', 'Kitchen', 'Bathtub'],
    )

    Listing.create!(
        host_id: User.first.id,
        title: 'Demo Listing',
        description: 'This is a demo listing. It is a great place to stay!',
        photo_url: './app/assets/images/demo-listing.jpg',
        category: 'Cabin',
        price_per_night: 100.00,
        address: '6234 California St',
        num_bedrooms: 2,
        num_bathrooms: 1,
        amenities: ['WiFi', 'Pool', 'Parking', 'Air Conditioning', 'Kitchen', 'Bathtub'],
    )

    10.times do 
        Listing.create!(
            host_id: User.first.id,
            title: 'Demo Listing',
            description: 'This is a demo listing. It is a great place to stay!',
            photo_url: './app/assets/images/demo-listing.jpg',
            category: 'Cabin',
            price_per_night: 100.00,
            address: '7354 Mission St',
            num_bedrooms: 2,
            num_bathrooms: 1,
            amenities: ['WiFi', 'Pool', 'Parking', 'Air Conditioning', 'Kitchen', 'Bathtub'],
        )
    end
  
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end
  
    puts "Done!"
  end