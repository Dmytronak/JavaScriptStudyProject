import { Connection, Repository } from 'typeorm';
import { Role } from 'src/shared/entities/role.entity';
import { Author } from 'src/shared/entities/author.entity';
import { Book } from 'src/shared/entities/book.entity';
import { User } from 'src/shared/entities/user.entity';

export const repositoryProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION']
    },
    {
        provide: 'ROLES_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Role),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'AUTHOR_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Author),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'BOOK_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Book),
        inject: ['DATABASE_CONNECTION'],
    },
];