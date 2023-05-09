module.exports = mongoose => {
    var working_area = mongoose.Schema(
      {
        job_number: String,
        human_x: String,
        human_y: String,
        collaborative_x: String,
        collaborative_y: String,
        robot_x: String,
        robot_y: String,

      },
      { timestamps: true }
    );
  
    working_area.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const working_area_data = mongoose.model("working_area", working_area);
    return working_area_data;
  };


  