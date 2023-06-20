import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuperheroFormComponent } from './components/superhero-form/superhero-form.component';

@NgModule({
  declarations: [HomeComponent, SuperheroFormComponent],
  imports: [HomeRoutingModule, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
