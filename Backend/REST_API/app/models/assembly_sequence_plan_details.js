module.exports = mongoose => {
    var assembly_sequence_plan_details = mongoose.Schema(
      {
        job_number: String,
        job_name: String,
        job_assignment: JSON, 
        assembly_sequence_plan: JSON, 
        assembly_sequence_step_components: JSON, 
        components: JSON, 
        sub_assembly: JSON, 
        final_product: JSON, 
      },
      { timestamps: true }
    );
  
    assembly_sequence_plan_details.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const assembly_sequence_plan_details_data = mongoose.model("assembly_sequence_plan_details", assembly_sequence_plan_details);
    return assembly_sequence_plan_details_data;
  };