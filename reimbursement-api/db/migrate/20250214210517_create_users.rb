class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string  :email, null: false, index: { unique: true }
      t.string  :password_digest, null: false
      t.integer :role, default: 0, null: false
      t.references :manager, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end