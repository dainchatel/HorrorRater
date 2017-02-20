class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title, unique: true
      t.string :synopsis
      t.string :director
      t.integer :year
      t.integer :rating

      t.timestamps
    end
  end
end
