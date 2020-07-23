

class Coordinate
    include Mongoid::Document
    include Mongoid::Geospatial
    field :name,     type: String
    field :type,     type: String
    field :area,     type: Polygon
    spatial_index :area # 2d

    belongs_to :transaction
end