class CreateDappers < ActiveRecord::Migration
  def change
    create_table :dappers do |t|
      t.string :personid
      t.string :datatype
      t.text :description
      t.decimal :nvalue1
      t.decimal :nvalue2
      t.string :cvalue1
      t.string :cvalue2
      t.datetime :dvalue1
      t.datetime :dvalue2
      t.string :image
      t.string :soundfile
      t.text :note
      t.string :providerid
      t.datetime :timestamp

      t.timestamps
    end
  end
end
