import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { StudentEntity } from 'src/students/entities/student.entity';

@Entity({ name: 'studentCourses' })
export class StudentCourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'student_id' })
  studentId: number;

  @PrimaryColumn({ name: 'course_id' })
  courseId: number;

  @ManyToOne(() => StudentEntity, (students) => students.courses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  students: StudentEntity[];

  @ManyToOne(() => CourseEntity, (courses) => courses.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'course_id', referencedColumnName: 'id' }])
  courses: CourseEntity[];
}
