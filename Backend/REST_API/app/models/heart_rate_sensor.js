module.exports = mongoose => {
    var schemaHearRateSensor = mongoose.Schema(

      { userID:String,
        rate:String,
        date:String,
      },
      { timestamps: true }
    );
  
    schemaHearRateSensor.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Heart_Rate_data= mongoose.model("heart_rate", schemaHearRateSensor);
    return Heart_Rate_data;
  };