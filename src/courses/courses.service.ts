import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './courses.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private readonly coursesRepository: CoursesRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.coursesRepository.createCourse(createCourseDto);
    return {
      success: true,
      data: course,
    };
  }

  async findAll() {
    const getCourses = await this.coursesRepository.find();
    return getCourses;
  }

  findOne(id: number) {
    return this.coursesRepository.findById(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.coursesRepository.updateCourse(id, updateCourseDto);
  }

  remove(id: number) {
    return this.coursesRepository.removeCourse(id);
  }
}
