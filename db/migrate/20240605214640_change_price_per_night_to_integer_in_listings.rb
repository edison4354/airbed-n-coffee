class ChangePricePerNightToIntegerInListings < ActiveRecord::Migration[7.1]
    def up
        change_column :listings, :price_per_night, :integer, using: 'price_per_night::integer'
    end
    
    def down
        change_column :listings, :price_per_night, :decimal, precision: 10, scale: 2
    end
end
