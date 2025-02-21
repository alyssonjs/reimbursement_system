class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string  :name, null: false
      t.text    :description
      t.decimal :budget, precision: 10, scale: 2, null: false
      t.references :manager, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end