import { Injectable } from '@nestjs/common';
import { Workout, WorkoutDocument } from './workout.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { WORKOUT_STAGE } from '../workout-plan/workout-exercise.constants';

@Injectable()
export class WorkoutRepository extends BaseRepository<Workout> {
  constructor(
    @InjectModel(Workout.name)
    private workoutSchema: Model<WorkoutDocument>,
  ) {
    super(workoutSchema);
  }

  addWorkout(trainer: ObjectId, addWorkoutDto: AddWorkoutDto) {
    return this.workoutSchema.create({ trainer, ...addWorkoutDto });
  }

  filterWorkouts(trainer: ObjectId) {
    return this.workoutSchema.aggregate([
      {
        $match: {
          trainer,
        },
      },
      {
        $lookup: {
          from: 'workoutexercises', // This should be the name of the collection
          localField: '_id',
          foreignField: 'workout',
          as: 'exercises',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          WARM_UP: {
            $filter: {
              input: '$exercises',
              as: 'exercise',
              cond: { $eq: ['$$exercise.stage', WORKOUT_STAGE.WARM_UP] },
            },
          },
          MAIN: {
            $filter: {
              input: '$exercises',
              as: 'exercise',
              cond: { $eq: ['$$exercise.stage', WORKOUT_STAGE.MAIN] },
            },
          },
          COOL_DOWN: {
            $filter: {
              input: '$exercises',
              as: 'exercise',
              cond: { $eq: ['$$exercise.stage', WORKOUT_STAGE.COOL_DOWN] },
            },
          },
        },
      },
    ]);
  }
}
