export enum FOLLOW_UP_STATUS {
  REQUESTED = 'REQUESTED',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
  FILLED = 'FILLED',
}

export enum FollowUpEvents {
  ADDED_WORKOUT_PROGRAM_FOLLOW_UP = 'follow-up.workout.added',
  ADDED_DIET_PROGRAM_FOLLOW_UP = 'follow-up.diet.added',
}

export enum FOLLOW_UP_TYPE {
  DIET_PROGRAM = 'DIET_PROGRAM',
  WORKOUT_PROGRAM = 'WORKOUT_PROGRAM',
}
