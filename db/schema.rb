# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140925022437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dappers", force: true do |t|
    t.string   "personid"
    t.string   "datatype"
    t.text     "description"
    t.decimal  "nvalue1"
    t.decimal  "nvalue2"
    t.string   "cvalue1"
    t.string   "cvalue2"
    t.datetime "dvalue1"
    t.datetime "dvalue2"
    t.string   "image"
    t.string   "soundfile"
    t.text     "note"
    t.string   "providerid"
    t.datetime "timestamp"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "providers", force: true do |t|
    t.string   "providerid"
    t.string   "practice"
    t.integer  "NPI"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
