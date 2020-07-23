class Transaction
    include Mongoid::Document
    include Mongoid::Timestamps

    has_many :coordinates
end