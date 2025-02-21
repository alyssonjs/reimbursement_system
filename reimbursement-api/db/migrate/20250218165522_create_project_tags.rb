class CreateProjectTags < ActiveRecord::Migration[6.1]
  def change
    create_table :project_tags do |t|
      t.references :project, null: false, foreign_key: true
      t.string  :tag, null: false
      t.decimal :allocated_budget, precision: 10, scale: 2, null: false
      t.timestamps
    end
  end
end
