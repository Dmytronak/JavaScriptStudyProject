import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "src/shared/services/auth.service";
import { PayloadAuthView } from "src/shared/view-models/auth/payload.auth.view";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        });
    }

    async validate(payload: PayloadAuthView) {
        const user = await this.authService.validate(payload.sub)
        return user;
      }
}