class CreateListings < ActiveRecord::Migration[7.1]
  def change
    create_table :listings do |t|
      t.references :host, null: false, foreign_key: { to_table: :users } # already creates index for us when using t.references
      t.string :title, null: false
      t.text :description, null: false
      t.string :photo_url, null: false
      t.string :category, null: false
      t.decimal :price_per_night, null: false, precision: 10, scale: 2
      t.string :address, null: false
      t.integer :num_bedrooms, null: false
      t.integer :num_bathrooms, null: false
      t.text :amenities, null: false, array: true, default: []

      t.timestamps
    end
  end
end
