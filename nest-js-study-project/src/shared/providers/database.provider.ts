import { createConnection } from 'typeorm';

export const databaseProvider = [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => await createConnection({
        type:'mongodb',
        host: process.env.HOST,
        port: parseInt(process.env.PORT_MONGODB),
        database : process.env.MONGODB_DB_NAME,
        entities: [process.env.ENTITIES],
        synchronize:true,
        useUnifiedTopology:true
      }),
    },
  ];
