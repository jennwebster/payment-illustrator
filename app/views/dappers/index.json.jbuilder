json.array!(@dappers) do |dapper|
  json.extract! dapper, :id, :personid, :datatype, :description, :nvalue1, :nvalue2, :cvalue1, :cvalue2, :dvalue1, :dvalue2, :image, :soundfile, :note, :providerid, :timestamp
  json.url dapper_url(dapper, format: :json)
end
