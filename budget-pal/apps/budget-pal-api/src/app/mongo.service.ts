import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    console.log('MongoService: Initializing...');

    try {
      this.client = new MongoClient(process.env.DATABASE_URI);
      await this.client.connect();
      this.db = this.client.db(process.env.MONGO_DB_NAME);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }

  getCollection<T>(name: string) {
    return this.db.collection<T>(name);
  }
}