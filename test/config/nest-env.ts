import { TestingModule } from '@nestjs/testing';
import NodeEnvironment from 'jest-environment-node';
import { UserRepository } from '../../src/user/user.repository';
import { ClientRepository } from '../../src/client/client.repository';
import { SubscriptionRepository } from '../../src/subscription/subscription.repository';

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
  }

  async teardown() {
    await super.teardown();
  }
}
module.exports = MongoEnvironment;
