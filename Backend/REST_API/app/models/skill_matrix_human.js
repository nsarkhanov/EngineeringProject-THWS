module.exports = mongoose => {
    var schemaHuman = mongoose.Schema(
      // adding new userid for get specific data for the user,heigh: String,weight:String, 
      { 
        // extra 
        userID:String, 
        // extra end  
        name: String,
        surname: String,
        // extra info adding 
        heigh: String,
        weight:String, 
        //  end 
        arm_length: String,
        priority_arm: String,  
        published: Boolean,
        skills: [String]
      },
      { timestamps: true }
    );
  
    schemaHuman.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Skill_human = mongoose.model("skill_human", schemaHuman);
    return Skill_human;
  };