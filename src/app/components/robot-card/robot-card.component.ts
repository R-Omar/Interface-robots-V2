import { Component, OnInit, Input } from '@angular/core';
import { RobotService } from 'src/app/services/robot.service';
import { IRobot } from '../../models/IRobot';

@Component({
  selector: 'app-robot-card',
  templateUrl: './robot-card.component.html',
  styleUrls: ['./robot-card.component.css'],
})
export class RobotCardComponent {
  selectedProg: string = '';
  disableExecPro: boolean = true;

  @Input() robot!: IRobot;
  @Input() sideCard: boolean = false;

  constructor(private robotService: RobotService) {}

  onChangeProgram(event: Event) {
    this.selectedProg = (event.target as HTMLSelectElement).value;
    this.disableExecPro = !this.selectedProg;
  }

  onStartProgram(id: number) {
    if (this.selectedProg)
      this.robotService.updateRobotProgram(id, this.selectedProg).subscribe({
        next: (data) => (this.robot = data),
        error: (error) => console.log(error),
      });
  }

  onUpdateRobotStatus(id: number, status: string) {
    this.robotService.updateRobotStatus(id, status).subscribe({
      next: (data) => (this.robot = data),
      error: (error) => console.log(error),
    });
  }

  getStatusColor() {
    switch (this.robot.statut) {
      case 'En marche':
        return ['bg-success'];
      case 'En pause':
        return ['bg-warning'];
      case 'En arrêt':
        return ['bg-danger'];
      default:
        return ['bg-light'];
    }
  }
}
