module.exports = mongoose => {
    const UserEvents = mongoose.model(
      "userEvents",
      mongoose.Schema(
        {
          id: String,
          title: String,
          description: String,
          startDate: Date,
          endDate: Date,
          image: String,
          categories: Array,
        },
        { timestamps: true }
      )
    );
  
    return UserEvents;
  };