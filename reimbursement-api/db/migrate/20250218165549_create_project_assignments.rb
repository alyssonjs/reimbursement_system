# db/migrate/20250110132000_create_project_assignments.rb
class CreateProjectAssignments < ActiveRecord::Migration[6.1]
  def change
    create_table :project_assignments do |t|
      t.references :project, null: false, foreign_key: true
      t.references :user,    null: false, foreign_key: true
      t.timestamps
    end
  end
end
