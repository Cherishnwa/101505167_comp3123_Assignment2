const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const router = express.Router();

// GET all employees
router.get('/employees', getAllEmployees);
// POST create new employee
router.post('/employees', createEmployee);
// GET, PUT, DELETE employee by ID
router.get('/employees/:eid', getEmployeeById);
router.put('/employees/:eid', updateEmployee);
router.delete('/employees', deleteEmployee);


module.exports = router;
