module.exports = mongoose => {
  var schemaSkinSensor = mongoose.Schema(

    { userID:String,
      rate:String,
      date:String,
    },
    { timestamps: true }
  );

  schemaSkinSensor.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Skin_Sensor_data= mongoose.model("skin_sensor", schemaSkinSensor);
  return Skin_Sensor_data;
};