import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const jwtDynamicModule = JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        signOptions: {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        },
        secret: process.env.JWT_KEY,
    }),
    inject: [ConfigService],
});
