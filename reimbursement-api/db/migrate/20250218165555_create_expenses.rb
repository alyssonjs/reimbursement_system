class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true
      t.references :project_tag, null: false, foreign_key: true
      t.decimal :amount, precision: 10, scale: 2, null: false
      t.date    :date, null: false
      t.string  :description, null: false
      t.string  :status, default: 'pending'
      t.text    :comment
      t.timestamps
    end
  end
end