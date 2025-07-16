
export function validateStaff(staff) {
  if (!staff.id || !staff.name || !staff.department) {
    return 'Please fill in all fields';
  }

  const staffId = Number(staff.id);

  if (isNaN(staffId)) {
    return 'Staff ID must be a number';
  }
  if (staffId <= 0) {
    return 'Staff ID must be positive numbers';
  }
  if(staff.name.length < 3) {
    return 'Course name must be at least 3 characters long';
  }
  if (staff.department.length < 2) {
    return 'Department name must be at least 2 characters long';
  }
  return ''; 
}
