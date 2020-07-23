require './config/environment'

class ApplicationController < Sinatra::Base

  configure do
    set :public_folder, 'public'
    set :views, 'app/views'
  end

  get '/' do
    erb :home
  end

  get '/transactions' do
    @data = Transaction.all
    erb :transactions
  end


  get '/api/transactions' do
    content_type 'application/json'
    @locations = Transaction.all.to_json
  end


  post '/transactions' do
    content_type 'application/json'
    data = JSON.parse(request.body.read,symbolize_name:true)
   @location = Transaction.new( data[:transaction])
     pry
    data[:transaction][:coordinates].each do |d|
     puts d
    end
   
  end




end
