class CreateExpenses < ActiveRecord::Migration[7.2]
  def change
    create_table :expenses do |t|
      t.float :amount
      t.date :date
      t.text :description
      t.string :location
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
