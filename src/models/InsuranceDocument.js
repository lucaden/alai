import mongoose from 'mongoose';

const InsuranceDocumentSchema = new mongoose.Schema({
  s3Path: {
    type: String,
    required: true,
  },
  mimetype:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  documentText:{
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.InsuranceDocument || mongoose.model('InsuranceDocument', InsuranceDocumentSchema);