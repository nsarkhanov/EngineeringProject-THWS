module.exports = mongoose => {
    var SchemaIMU = mongoose.Schema(
      {
        userID: String,
        sensorID: String,
        acceleration: JSON, 
        orientation: JSON, 
        gyro: JSON, 
        magnetic: JSON, 
        linear: JSON,
        gravity:JSON,
        date: String, 
      },
      { timestamps: true }
    );
  
    SchemaIMU.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const SchemaIMU_Data = mongoose.model("imu_sensor", SchemaIMU);
    return SchemaIMU_Data;
  };