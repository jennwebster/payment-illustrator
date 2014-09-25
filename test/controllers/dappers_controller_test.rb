require 'test_helper'

class DappersControllerTest < ActionController::TestCase
  setup do
    @dapper = dappers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dappers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dapper" do
    assert_difference('Dapper.count') do
      post :create, dapper: { cvalue1: @dapper.cvalue1, cvalue2: @dapper.cvalue2, datatype: @dapper.datatype, description: @dapper.description, dvalue1: @dapper.dvalue1, dvalue2: @dapper.dvalue2, image: @dapper.image, note: @dapper.note, nvalue1: @dapper.nvalue1, nvalue2: @dapper.nvalue2, personid: @dapper.personid, providerid: @dapper.providerid, soundfile: @dapper.soundfile, timestamp: @dapper.timestamp }
    end

    assert_redirected_to dapper_path(assigns(:dapper))
  end

  test "should show dapper" do
    get :show, id: @dapper
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dapper
    assert_response :success
  end

  test "should update dapper" do
    patch :update, id: @dapper, dapper: { cvalue1: @dapper.cvalue1, cvalue2: @dapper.cvalue2, datatype: @dapper.datatype, description: @dapper.description, dvalue1: @dapper.dvalue1, dvalue2: @dapper.dvalue2, image: @dapper.image, note: @dapper.note, nvalue1: @dapper.nvalue1, nvalue2: @dapper.nvalue2, personid: @dapper.personid, providerid: @dapper.providerid, soundfile: @dapper.soundfile, timestamp: @dapper.timestamp }
    assert_redirected_to dapper_path(assigns(:dapper))
  end

  test "should destroy dapper" do
    assert_difference('Dapper.count', -1) do
      delete :destroy, id: @dapper
    end

    assert_redirected_to dappers_path
  end
end
