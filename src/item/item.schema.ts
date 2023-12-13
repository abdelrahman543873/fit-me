import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { ITEM_UNITS_ENUM } from './item.constants';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Item {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: String, enum: ITEM_UNITS_ENUM })
  unit: ITEM_UNITS_ENUM;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
