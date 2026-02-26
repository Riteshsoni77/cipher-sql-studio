import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  sampleTables: [
    {
      tableName: { type: String, required: true },
      columns: [
        {
          columnName: { type: String, required: true },
          dataType: { type: String, required: true },
        },
      ],
      rows: [
        {
          type: mongoose.Schema.Types.Mixed,
        },
      ],
    },
  ],
  expectedOutput: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
export default Assignment;

