class DappersController < ApplicationController
  before_action :set_dapper, only: [:show, :edit, :update, :destroy]

  # GET /dappers
  # GET /dappers.json
  def index
    @dappers = Dapper.all
  end

  # GET /dappers/1
  # GET /dappers/1.json
  def show
  end

  # GET /dappers/new
  def new
    @dapper = Dapper.new
  end

  # GET /dappers/1/edit
  def edit
  end

  # POST /dappers
  # POST /dappers.json
  def create
    @dapper = Dapper.new(dapper_params)

    respond_to do |format|
      if @dapper.save
        format.html { redirect_to @dapper, notice: 'Dapper was successfully created.' }
        format.json { render :show, status: :created, location: @dapper }
      else
        format.html { render :new }
        format.json { render json: @dapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dappers/1
  # PATCH/PUT /dappers/1.json
  def update
    respond_to do |format|
      if @dapper.update(dapper_params)
        format.html { redirect_to @dapper, notice: 'Dapper was successfully updated.' }
        format.json { render :show, status: :ok, location: @dapper }
      else
        format.html { render :edit }
        format.json { render json: @dapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dappers/1
  # DELETE /dappers/1.json
  def destroy
    @dapper.destroy
    respond_to do |format|
      format.html { redirect_to dappers_url, notice: 'Dapper was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dapper
      @dapper = Dapper.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dapper_params
      params.require(:dapper).permit(:personid, :datatype, :description, :nvalue1, :nvalue2, :cvalue1, :cvalue2, :dvalue1, :dvalue2, :image, :soundfile, :note, :providerid, :timestamp)
    end
end
