class UniversityScheduleManager {
    constructor() {
        this.professors = [];
        this.classrooms = [];
        this.courses = [];
        this.schedule = [];
    }

    addProfessor(professor) {
        this.professors.push(professor);
    }

    addLesson(lesson) {
        if (!this.validateLesson(lesson)) {
            this.schedule.push(lesson);
            return true;
        }
        return false;
    }

    findAvailableClassrooms(timeSlot, dayOfWeek) {
        const occupiedClassrooms = this.schedule
            .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
            .map(lesson => lesson.classroomNumber);

        return this.classrooms
            .filter(classroom => !occupiedClassrooms.includes(classroom.number))
            .map(classroom => classroom.number);
    }

    getProfessorSchedule(professorId) {
        return this.schedule.filter(lesson => lesson.professorId === professorId);
    }

    validateLesson(lesson) {
        const professorConflict = this.schedule.find(
            l => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
        );
        if (professorConflict) {
            return { type: "ProfessorConflict", lessonDetails: professorConflict };
        }

        const classroomConflict = this.schedule.find(
            l => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek
        );
        if (classroomConflict) {
            return { type: "ClassroomConflict", lessonDetails: classroomConflict };
        }

        return null;
    }

    getClassroomUtilization(classroomNumber) {
        const totalSlots = 5 * 5;
        const occupiedSlots = this.schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
        return (occupiedSlots / totalSlots) * 100;
    }

    getMostPopularCourseType() {
        const courseTypeCount = {
            Lecture: 0,
            Seminar: 0,
            Lab: 0,
            Practice: 0
        };

        this.courses.forEach(course => {
            courseTypeCount[course.type]++;
        });

        return Object.keys(courseTypeCount).reduce((a, b) => courseTypeCount[a] > courseTypeCount[b] ? a : b);
    }

    reassignClassroom(lessonId, newClassroomNumber) {
        const lessonIndex = this.schedule.findIndex(lesson => lesson.courseId === lessonId);
        if (lessonIndex !== -1 && !this.validateLesson({ ...this.schedule[lessonIndex], classroomNumber: newClassroomNumber })) {
            this.schedule[lessonIndex].classroomNumber = newClassroomNumber;
            return true;
        }
        return false;
    }

    cancelLesson(lessonId) {
        this.schedule = this.schedule.filter(lesson => lesson.courseId !== lessonId);
    }
}

// Тестування
const manager = new UniversityScheduleManager();

// Тестові дані
const professor1 = { id: 1, name: "John Doe", department: "Computer Science" };
const professor2 = { id: 2, name: "Jane Smith", department: "Mathematics" };

const classroom1 = { number: "101", capacity: 30, hasProjector: true };
const classroom2 = { number: "102", capacity: 25, hasProjector: false };

const course1 = { id: 1, name: "Introduction to TypeScript", type: "Lecture" };
const course2 = { id: 2, name: "Advanced Mathematics", type: "Seminar" };

// Додавання тестових даних
manager.addProfessor(professor1);
manager.addProfessor(professor2);
manager.classrooms.push(classroom1);
manager.classrooms.push(classroom2);
manager.courses.push(course1);
manager.courses.push(course2);

// Додавання уроків
manager.addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "10:15-11:45" });
manager.addLesson({ courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Tuesday", timeSlot: "12:15-13:45" });
manager.addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Wednesday", timeSlot: "14:00-15:30" });
manager.addLesson({ courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Thursday", timeSlot: "15:45-17:15" });
manager.addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Friday", timeSlot: "8:30-10:00" });

// Вивід розкладу професорів
console.log("Розклад професора John Doe:", manager.getProfessorSchedule(1));
console.log("Розклад професора Jane Smith:", manager.getProfessorSchedule(2));

// Вивід вільних аудиторій
console.log("Вільні аудиторії в понеділок, 10:15-11:45:", manager.findAvailableClassrooms("10:15-11:45", "Monday"));
console.log("Вільні аудиторії в вівторок, 12:15-13:45:", manager.findAvailableClassrooms("12:15-13:45", "Tuesday"));

// Вивід відсотка використання аудиторії
console.log("Використання аудиторії 101:", manager.getClassroomUtilization("101"), "%");
console.log("Використання аудиторії 102:", manager.getClassroomUtilization("102"), "%");
