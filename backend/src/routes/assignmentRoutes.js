import express from 'express';
import Assignment from '../models/AssignmentModel.js';

const router = express.Router();

// Create a new assignment
router.post('/create', async (req, res) => {
  try {
   const dummyData = {
  title: "Find Employees in Finance Department with Salary Above 50,000",
  description: "Write an SQL query to retrieve the names and salaries of employees who work in the 'Finance' department and earn more than 50,000.",
  difficulty: "Medium",
  question: "Write an SQL query to fetch the `name` and `salary` of all employees who work in the 'Finance' department and earn more than 50,000.",
  sampleTables: [
    {
      tableName: "employees",
      columns: [
        { columnName: "id", dataType: "INTEGER" },
        { columnName: "name", dataType: "TEXT" },
        { columnName: "department", dataType: "TEXT" },
        { columnName: "salary", dataType: "INTEGER" },
      ],
      rows: [
        { id: 1, name: "John", department: "HR", salary: 45000 },
        { id: 2, name: "Jane", department: "Finance", salary: 60000 },
        { id: 3, name: "Doe", department: "Engineering", salary: 75000 },
        { id: 4, name: "Alice", department: "HR", salary: 30000 },
        { id: 5, name: "Bob", department: "Engineering", salary: 80000 },
      ],
    },
  ],
  expectedOutput: {
    type: "table",
    value: [
      { name: "Jane", salary: 60000 },
    ],
  },
};
  
    const newAssignment = new Assignment(dummyData);
    await newAssignment.save();

    res.status(201).json({ message: "Temporary assignment created successfully!", assignment: newAssignment });
  } catch (error) {
    console.error("Error creating temporary assignment:", error.message);
    res.status(500).json({ error: "Failed to create temporary assignment" });
  }
});



// Fetch all assignments
router.get('/', async (req, res) => {
  try {
    console.log("Fetching assignments...");
    const assignments = await Assignment.find();
    console.log("Number of assignments fetched:", assignments.length);
    console.log("Assignments fetched:", assignments);
    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});


// Fetch a specific assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error.message);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

export default router;