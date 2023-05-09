module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        description: String,
        range_of_motion: String,
        payload: String, 
        speed: String,
        acceleration: String,
        gripper: String,
        published: Boolean,
        skills: [String]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Skill_robot = mongoose.model("skill_robotic", schema);
    return Skill_robot;
  };