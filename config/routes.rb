Rails.application.routes.draw do
  get '/', to: 'movie_list#index'
  namespace :api, as: :api do
    resources :posts, only: [:create, :update, :index, :show, :destroy]
  # ... any other routes you want in your api namespace
end
end
