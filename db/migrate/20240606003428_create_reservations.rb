class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :listing, null: false, foreign_key: true
      t.references :guest, null: false, foreign_key: { to_table: :users }
      t.date :check_in, null: false
      t.date :check_out, null: false
      t.integer :num_guests, null: false

      t.timestamps
    end

    add_index :reservations, [:listing_id, :check_in, :check_out], unique: true
  end
end
