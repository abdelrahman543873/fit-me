export enum MEASUREMENT_TYPE {
  INBODY_IMAGE = 'INBODY_IMAGE',
  FRONT_IMAGE = 'FRONT_IMAGE',
  SIDE_IMAGE = 'SIDE_IMAGE',
  BACK_IMAGE = 'BACK_IMAGE',
  BODY_WEIGHT = 'BODY_WEIGHT',
  FAT_PERCENTAGE = 'FAT_PERCENTAGE',
  SKELETAL_MUSCLE_MASS = 'SKELETAL_MUSCLE_MASS',
  BICEP = 'BICEP',
  RIGHT_BICEP = 'RIGHT_BICEP',
  CHEST = 'CHEST',
  LEFT_FOREARM = 'LEFT_FOREARM',
  RIGHT_FOREARM = 'RIGHT_FOREARM',
  NECK = 'NECK',
  HIPS = 'HIPS',
  SHOULDERS = 'SHOULDERS',
  LEFT_THIGH = 'LEFT_THIGH',
  RIGHT_THIGH = 'RIGHT_THIGH',
  WAIST = 'WAIST',
}

export enum MEASUREMENT_CATEGORY_ENUM {
  WEIGHT = 'WEIGHT',
  LENGTH = 'LENGTH',
  IMAGE = 'IMAGE',
}

export const MEASUREMENT_CATEGORY = {
  BODY_WEIGHT: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  SKELETAL_MUSCLE_MASS: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  BICEP: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  RIGHT_BICEP: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  CHEST: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  LEFT_FOREARM: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  RIGHT_FOREARM: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  NECK: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  HIPS: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  SHOULDERS: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  LEFT_THIGH: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  RIGHT_THIGH: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  WAIST: MEASUREMENT_CATEGORY_ENUM.WEIGHT,
  INBODY_IMAGE: MEASUREMENT_CATEGORY_ENUM.IMAGE,
  FRONT_IMAGE: MEASUREMENT_CATEGORY_ENUM.IMAGE,
  SIDE_IMAGE: MEASUREMENT_CATEGORY_ENUM.IMAGE,
  BACK_IMAGE: MEASUREMENT_CATEGORY_ENUM.IMAGE,
};

export const MEASUREMENT_CATEGORY_UNITS = {
  LENGTH: ['CM', 'INCH', 'M', 'FT'],
  WEIGHT: ['KG', 'LB'],
};
