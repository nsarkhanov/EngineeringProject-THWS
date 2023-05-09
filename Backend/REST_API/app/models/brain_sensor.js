module.exports = mongoose => {
    var schemaBrain_Sensor = mongoose.Schema(
      {
        userID: String,
        TP9: String,
        AF7: String,
        AF8: String,
        TP10: String,
        RightAUX: String,
        date:String,
      },
      { timestamps: true }
    );
  
    schemaBrain_Sensor.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Brain_Sensor = mongoose.model("brain_sensor", schemaBrain_Sensor);
    return Brain_Sensor;
  };