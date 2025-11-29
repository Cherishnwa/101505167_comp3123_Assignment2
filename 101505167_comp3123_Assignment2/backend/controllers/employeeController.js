const Employee = require('../models/employee');

// GET /api/v1/emp/employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/v1/emp/employees
exports.createEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    } = req.body;

    const newEmployee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: newEmployee._id
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/v1/emp/employees/:eid
exports.getEmployeeById = async (req, res) => {
  try {
    const { eid } = req.params;
    const employee = await Employee.findById(eid);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/v1/emp/employees/:eid
exports.updateEmployee = async (req, res) => {
  try {
    const { eid } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      eid,
      updatedData,
      { new: true }  // returns the updated doc
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Employee updated successfully.',
      employee: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/v1/emp/employees?eid=xxx
exports.deleteEmployee = async (req, res) => {
  try {
    const { eid } = req.query;

    const deletedEmployee = await Employee.findByIdAndDelete(eid);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


