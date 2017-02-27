module Api
  class PostsController < ApplicationController
    def index
      posts = Post.all
      render json: posts.to_json
    end

    def create
      @post = Post.new(post_params)

      @post.save
      render json: @post.to_json
      # redirect_to '/'
    end

    # def show
    #   post = Post.find(params[:id])
    #   render json: post.to_json
    # end

    def post_params
      params.require(:post).permit(
        :title, :synopsis, :director, :year, :rating
      )
    end
  end
end
