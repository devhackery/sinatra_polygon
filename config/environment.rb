require 'mongoid'
require 'sinatra'
ENV['SINATRA_ENV'] ||= "development"

require 'bundler/setup'
Bundler.require(:default, ENV['SINATRA_ENV'])

Mongoid.load!(File.join(File.dirname(__FILE__), 'mongoid.yml'))

require './app/controllers/application_controller'
require_all 'app'
