class RemovePhotoUrlFromListings < ActiveRecord::Migration[7.1]
  def change
    remove_column :listings, :photo_url, :string
  end
end
