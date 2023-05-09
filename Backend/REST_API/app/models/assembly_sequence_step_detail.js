module.exports = mongoose => {
    var assembly_sequence_step_detail = mongoose.Schema(
      {
        job_number: String,
        components: Array,
        assembly_step: String,
        assembly_step_actions: JSON
      },
      { timestamps: true }
    );
  
    assembly_sequence_step_detail.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const assembly_sequence_step_detail_data = mongoose.model("assembly_sequence_step_detail", assembly_sequence_step_detail);
    return assembly_sequence_step_detail_data;
  };