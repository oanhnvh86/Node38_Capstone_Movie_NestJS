import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TheaterModule } from './theater/theater.module';
import { MovieModule } from './movie/movie.module';
import { BookticketModule } from './bookticket/bookticket.module';

@Module({
  imports: [AuthModule, UserModule, TheaterModule, MovieModule, BookticketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
