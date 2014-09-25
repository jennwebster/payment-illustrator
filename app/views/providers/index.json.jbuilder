json.array!(@providers) do |provider|
  json.extract! provider, :id, :providerid, :practice, :NPI
  json.url provider_url(provider, format: :json)
end
