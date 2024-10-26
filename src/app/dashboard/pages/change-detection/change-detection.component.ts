import { ChangeDetectionStrategy, Component,computed,signal } from '@angular/core';
import { TittleComponent } from '../../../shared/tittle/tittle.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule,TittleComponent],
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
  <app-tittle [title]="currentFramework()" /> 
  <pre>{{ frameworkAsSignal() | json }}</pre>
  <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}}`
  );

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  })

  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      this.frameworkAsProperty.name = 'React';
    },3000);
  }
}
