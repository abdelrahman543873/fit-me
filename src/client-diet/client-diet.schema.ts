import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ClientDietDocument = HydratedDocument<ClientDiet>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class ClientDiet {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'Diet',
  })
  diet: ObjectId;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: [Date] })
  followUpDates: Date[];

  @Prop({ type: Date, default: null })
  lastFollowUpDate?: Date;
}

export const ClientDietSchema = SchemaFactory.createForClass(ClientDiet);
