import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsRepository } from './students.repository';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { CoursesService } from 'src/courses/courses.service';
import { CoursesRepository } from 'src/courses/courses.repository';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsRepository)
    private readonly studentRepository: StudentsRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.createStudent(createStudentDto);
    student.courses = createStudentDto.courseIds.map((id) => ({...new CourseEntity(), id}));
    return await this.studentRepository.save(student)
    // student = await this.studentRepository.save(student)
    // return {
    //   success: true,
    //   data: student,
    // };
  }

  async findAll() {
    const getStudents = await this.studentRepository.find({
      relations: {
        courses: true,
      },
    });
    return getStudents;
  }

  findOne(id: number) {
    return this.studentRepository.findById(id);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.updateStudent(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepository.removeStudent(id);
  }
}
