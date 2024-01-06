import { S3Client } from '@aws-sdk/client-s3';
import { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import { filename } from './multer-file-name';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../constants/env-variable-names';

export const multerStorageDetector: any = (configService: ConfigService) => {
  if (configService.get<string>(ENV_VARIABLE_NAMES.NODE_ENV))
    return multerS3({
      s3: new S3Client({
        region: configService.get<string>(
          ENV_VARIABLE_NAMES.AWS_ASSETS_BUCKET_REGION,
        ),
        credentials: {
          accessKeyId: configService.get<string>(
            ENV_VARIABLE_NAMES.AWS_ACCESS_KEY_ID,
          ),
          secretAccessKey: configService.get<string>(
            ENV_VARIABLE_NAMES.AWS_SECRET_ACCESS_KEY,
          ),
        },
      }),
      bucket: configService.get<string>(
        ENV_VARIABLE_NAMES.AWS_ASSETS_BUCKET_NAME,
      ),
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    });
  return diskStorage({
    destination: './client',
    filename,
  });
};
