import mongoose from 'mongoose'; // Use import for mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

const credentialsSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highestScore: {
    type: Number,
    default: 0,
  },
});

// Export the model using ES Modules
export default mongoose.model('Credentials', credentialsSchema);
