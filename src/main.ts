// Enum definitions
enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

// Interface definitions
interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface GradeRecord {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

// UniversityManagementSystem class
class UniversityManagementSystem {
  private students: Student[] = [];
  private grades: GradeRecord[] = [];
  private studentIdCounter = 1;

  // Courses can now be accessed via a public method
  private courses: Course[] = [];

  addCourse(course: Omit<Course, "id">): Course {
      const newCourse: Course = { id: this.courses.length + 1, ...course };
      this.courses.push(newCourse);
      return newCourse;
  }

  getCourses(): Course[] {
      return this.courses;
  }

  enrollStudent(student: Omit<Student, "id">): Student {
      const newStudent: Student = { id: this.studentIdCounter++, ...student };
      this.students.push(newStudent);
      return newStudent;
  }

  registerForCourse(studentId: number, courseId: number): void {
      const student = this.students.find(s => s.id === studentId);
      const course = this.courses.find(c => c.id === courseId);

      if (!student || !course) {
          throw new Error("Student or course not found.");
      }

      if (student.faculty !== course.faculty) {
          throw new Error("Student and course faculty do not match.");
      }

      const enrolledStudents = this.grades.filter(g => g.courseId === courseId).length;
      if (enrolledStudents >= course.maxStudents) {
          throw new Error("Course is full.");
      }

      this.grades.push({ studentId, courseId, grade: null as any, date: new Date(), semester: course.semester });
  }

  setGrade(studentId: number, courseId: number, grade: Grade): void {
      const enrollment = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
      if (!enrollment) {
          throw new Error("Student is not registered for the course.");
      }
      enrollment.grade = grade;
      enrollment.date = new Date();
  }

  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
      const student = this.students.find(s => s.id === studentId);
      if (!student) {
          throw new Error("Student not found.");
      }
      student.status = newStatus;
  }

  getStudentsByFaculty(faculty: Faculty): Student[] {
      return this.students.filter(s => s.faculty === faculty);
  }

  getStudentGrades(studentId: number): GradeRecord[] {
      return this.grades.filter(g => g.studentId === studentId);
  }

  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
      return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
  }

  calculateAverageGrade(studentId: number): number {
      const studentGrades = this.getStudentGrades(studentId).filter(g => g.grade !== null);
      if (studentGrades.length === 0) return 0;

      const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
      return total / studentGrades.length;
  }

  getTopStudentsByFaculty(faculty: Faculty): Student[] {
      const students = this.getStudentsByFaculty(faculty);
      return students.filter(student => {
          const avgGrade = this.calculateAverageGrade(student.id);
          return avgGrade >= Grade.Excellent;
      });
  }
}

// Example usage
const ums = new UniversityManagementSystem();

// Adding courses
ums.addCourse({
  name: "Introduction to Programming",
  type: CourseType.Mandatory,
  credits: 4,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 30,
});

// Enrolling a student
const student = ums.enrollStudent({
  fullName: "John Doe",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "CS-101",
});

//Updating student status
ums.updateStudentStatus(1, StudentStatus.Graduated);

// Registering for a course
ums.registerForCourse(student.id, 1);

// Setting a grade
ums.setGrade(student.id, 1, Grade.Excellent);

console.log("Student grades:", ums.getStudentGrades(student.id));
console.log("Average grade:", ums.calculateAverageGrade(student.id));
console.log("Top students:", ums.getTopStudentsByFaculty(Faculty.Computer_Science));