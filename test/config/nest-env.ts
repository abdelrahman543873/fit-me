import { TestingModule } from '@nestjs/testing';
import NodeEnvironment from 'jest-environment-node';
import { UserRepository } from '../../src/user/user.repository';
import { ClientRepository } from '../../src/client/client.repository';
import { SubscriptionRepository } from '../../src/subscription/subscription.repository';
import { TrainerRepository } from '../../src/trainer/trainer.repository';
import { PlanRepository } from '../../src/plan/plan.repository';
import { FormRepository } from '../../src/form/form.repository';
import { QuestionRepository } from '../../src/question/question.repository';
import { ExerciseRepository } from '../../src/exercise/exercise.repository';
import { WorkoutRepository } from '../../src/workout/workout.repository';
import { WorkoutExerciseRepository } from '../../src/workout-exercise/workout-exercise.repository';
import { ProgramWorkoutRepository } from '../../src/program-workout/program-workout.repository';
import { ProgramRepository } from '../../src/program/program.repository';

class MongoEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
  }

  async setup() {
    await super.setup();
    this.global.__MONGO_URI__ = global.mongoUri;
    this.global.__MONGO_DB_NAME__ = global.mongoDBName;
    this.global.app = global.app;
    const app: TestingModule = <TestingModule>this.global.app;
    this.global.userRepository = app.get<UserRepository>(UserRepository);
    this.global.clientRepository = app.get<ClientRepository>(ClientRepository);
    this.global.subscriptionRepository = app.get<SubscriptionRepository>(
      SubscriptionRepository,
    );
    this.global.trainerRepository =
      app.get<TrainerRepository>(TrainerRepository);
    this.global.planRepository = app.get<PlanRepository>(PlanRepository);
    this.global.formRepository = app.get<FormRepository>(FormRepository);
    this.global.questionRepository =
      app.get<QuestionRepository>(QuestionRepository);
    this.global.exerciseRepository =
      app.get<ExerciseRepository>(ExerciseRepository);
    this.global.workoutRepository =
      app.get<WorkoutRepository>(WorkoutRepository);
    this.global.workoutExerciseRepository = app.get<WorkoutExerciseRepository>(
      WorkoutExerciseRepository,
    );
    this.global.programWorkoutRepository = app.get<ProgramWorkoutRepository>(
      ProgramWorkoutRepository,
    );
    this.global.programRepository =
      app.get<ProgramRepository>(ProgramRepository);
  }

  async teardown() {
    await super.teardown();
  }
}
module.exports = MongoEnvironment;
