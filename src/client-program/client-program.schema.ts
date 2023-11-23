import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ClientProgramDocument = HydratedDocument<ClientProgram>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class ClientProgram {
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
    ref: 'Program',
  })
  program: ObjectId;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: [Date] })
  followUpDates: Date[];

  @Prop({ type: Date, default: null })
  lastFollowUpDate?: Date;
}

export const ClientProgramSchema = SchemaFactory.createForClass(ClientProgram);
