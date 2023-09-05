module.exports = mongoose => {
    const Events = mongoose.model(
      "events",
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
  
    return Events;
  };