class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :title
      t.string :url
      t.references :user, index: true, foreign_key: true
      t.boolean :read, default: false

      t.timestamps null: false
    end
  end
end
