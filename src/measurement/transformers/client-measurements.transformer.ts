import { TransformFnParams } from 'class-transformer';
import { AddMeasurementDto } from '../inputs/add-measurement.dto';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';

export const clientMeasurementsTransformer: (
  params: TransformFnParams,
) => any = (input) => {
  const user = JSON.parse(input.obj.user);
  const measurements = input.value.map((measurement) => {
    const addMeasurementDto = new AddMeasurementDto();
    addMeasurementDto.client = objectIdTransformer({ value: user._id });
    addMeasurementDto.type = measurement.type;
    measurement.measuredAt &&
      (addMeasurementDto.measuredAt = new Date(measurement.measuredAt));
    measurement.media && (addMeasurementDto.media = measurement.media);
    measurement.value && (addMeasurementDto.value = measurement.value);
    measurement.unit && (addMeasurementDto.unit = measurement.unit);
    return addMeasurementDto;
  });
  return measurements;
};
