module.exports = mongoose => {
    var criteria = mongoose.Schema(
      {
        order: String,
        sequence: String,
        weight_value: JSON, 
        assembly_sequence: String,
        criteria_type: JSON,
        published: Boolean
      },
      { timestamps: true }
    );
  
    criteria.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const criteria_data = mongoose.model("criteria", criteria);
    return criteria_data;
  };