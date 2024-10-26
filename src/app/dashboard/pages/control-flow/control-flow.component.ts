import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TittleComponent } from '../../../shared/tittle/tittle.component';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule,TittleComponent],
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {

}
