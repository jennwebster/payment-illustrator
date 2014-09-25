class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :providerid
      t.string :practice
      t.integer :NPI

      t.timestamps
    end
  end
end
