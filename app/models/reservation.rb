# == Schema Information
#
# Table name: reservations
#
#  id         :bigint           not null, primary key
#  listing_id :bigint           not null
#  guest_id   :bigint           not null
#  check_in   :date             not null
#  check_out  :date             not null
#  num_guests :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Reservation < ApplicationRecord
    belongs_to :listing,
        primary_key: :id,
        foreign_key: :listing_id,
        class_name: :Listing

    belongs_to :guest,
        primary_key: :id,
        foreign_key: :guest_id,
        class_name: :User
        
    validates :check_in, :check_out, :num_guests, presence: true
    validate :check_in_must_be_before_check_out
    validate :check_in_must_be_in_future
    validate :listing_must_be_available

    private

    def check_in_must_be_before_check_out
        return if check_in.nil? || check_out.nil?

        if check_in >= check_out
            errors.add(:check_in, "must be before check out date")
        end
    end

    def check_in_must_be_in_future
        return if check_in.nil?

        if check_in < Date.today
            errors.add(:check_in, "must be in the future")
        end
    end

    def listing_must_be_available
        return if check_in.nil? || check_out.nil?

        overlapping_reservations = listing.reservations.where.not(id: id).where(
            "(? < check_out) AND (? > check_in)",
            check_in,
            check_out
        )

        if overlapping_reservations.exists?
            errors.add(:listing, "is already reserved for the specified dates.")
        end
    end

end
