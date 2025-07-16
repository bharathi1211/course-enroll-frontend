
export function validateCourse(course) {
  if (!course.id || !course.name || !course.department || !course.staffId) {
    return 'Please fill in all fields';
  }

  const courseId = Number(course.id);
  const staffId = Number(course.staffId);

  if (isNaN(courseId)) {
    return 'Course ID must be a number';
  }

  if (isNaN(staffId)) {
    return 'Staff ID must be a number';
  }
  if (courseId <= 0 || staffId <= 0) {
    return 'Course ID and Staff ID must be positive numbers';
  }
  if(course.name.length < 3) {
    return 'Course name must be at least 3 characters long';
  }
  if (course.department.length < 2) {
    return 'Department name must be at least 2 characters long';
  }
  return ''; 
}
