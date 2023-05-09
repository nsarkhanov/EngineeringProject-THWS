module.exports = mongoose => {
    var dimension_per_component = mongoose.Schema(
      {
        uuid: String,
        height: String,
        width: String,
        depth: String,
        color: String,
        parent_reference: JSON, 
        gripping_points: String, 
        weight: String, 
        force: String, 
        center_of_gravity: String, 
      },
      { timestamps: true }
    );
  
    dimension_per_component.method("toJSON", function() {
      const { __v, _uuid, ...object } = this.toObject();
      object.uuid = _uuid;
      return object;
    });
  
    const dimension_per_component_data = mongoose.model("dimension_per_component", dimension_per_component);
    return dimension_per_component_data;
  };