import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TrainerModule } from './trainer/trainer.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PlanModule } from './plan/plan.module';
import { AuthModule } from './shared/auth/auth.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutExerciseModule } from './workout-exercise/workout-exercise.module';
import { ProgramModule } from './program/program.module';
import { ProgramWorkoutModule } from './program-workout/program-workout.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    TrainerModule,
    ClientModule,
    UserModule,
    SubscriptionModule,
    PlanModule,
    FormModule,
    QuestionModule,
    ExerciseModule,
    WorkoutModule,
    WorkoutExerciseModule,
    ProgramModule,
    ProgramWorkoutModule,
    AnswerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
