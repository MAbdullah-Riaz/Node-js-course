const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect('mongodb://localhost/mongo-exercise')
  .then(() => console.log('Connected to the MongoDB...'))
  .catch((err) => console.error('could not connect to MongoDb...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});
const Course = mongoose.model('Course', courseSchema);

const getCourse = async () => {
  const courses = await Course.find({
    isPublished: true,
  })
    .select({ name: 1, author: 1, price: 1 })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);

  console.log(courses);
};
getCourse();
