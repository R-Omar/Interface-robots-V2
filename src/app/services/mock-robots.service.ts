import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRobot } from '../models/IRobot';

@Injectable({
  providedIn: 'root',
})
export class MockRobots {
  private robots: IRobot[] = [
    {
      id: 1,
      nom: 'Edmon',
      statut: 'En marche',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4'],
      programme_execute: 'Programme 2',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:10:30',
        },
        {
          label: 'Prises',
          valeur: 10,
        },
        {
          label: 'Erreurs',
          valeur: 3,
        },
      ],
    },
    {
      id: 2,
      nom: 'Ned',
      statut: 'En marche',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3'],
      programme_execute: 'Programme 3',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:05:10',
        },
        {
          label: 'Prises',
          valeur: 7,
        },
        {
          label: 'Erreurs',
          valeur: 0,
        },
      ],
    },
    {
      id: 3,
      nom: 'John',
      statut: 'En arrêt',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4'],
      programme_execute: 'null',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:00:00',
        },
        {
          label: 'Prises',
          valeur: 0,
        },
        {
          label: 'Erreurs',
          valeur: 0,
        },
      ],
    },
    {
      id: 4,
      nom: 'Doe',
      statut: 'En pause',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4'],
      programme_execute: 'Programme 4',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:08:30',
        },
        {
          label: 'Prises',
          valeur: 23,
        },
        {
          label: 'Erreurs',
          valeur: 5,
        },
      ],
    },
    {
      id: 5,
      nom: 'Pepper',
      statut: 'En pause',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4'],
      programme_execute: 'Programme 2',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:10:30',
        },
        {
          label: 'Prises',
          valeur: 10,
        },
        {
          label: 'Erreurs',
          valeur: 3,
        },
      ],
    },
    {
      id: 6,
      nom: 'Sophia',
      statut: 'En arrêt',
      adresse_ip: '192.168.1.15',
      programmes: ['Programme 1', 'Programme 2', 'Programme 3', 'Programme 4'],
      programme_execute: 'Programme 2',
      KPIs: [
        {
          label: "Temps d'exécution",
          valeur: '00:00:00',
        },
        {
          label: 'Prises',
          valeur: 0,
        },
        {
          label: 'Erreurs',
          valeur: 0,
        },
      ],
    },
  ];
  private robotsSubject: BehaviorSubject<IRobot[]>;

  constructor() {
    // Envoyer le statut initial des robots puis envoyer
    // le comportement simulé des robots chaque seconde
    this.robotsSubject = new BehaviorSubject(this.robots);
    setInterval(() => {
      this.robotsSubject.next(this.simulateRobotsBehavior());
    }, 1000);
  }

  getAllRobots(): BehaviorSubject<IRobot[]> {
    return this.robotsSubject;
  }

  updateRobotStatus(id: number, status: string): Observable<IRobot> {
    let robot = this.robots.find((robot) => robot.id === id) as IRobot;
    robot.statut = status;
    if (robot.statut === 'En arrêt') this.reinitializeKPIs(robot);
    return new Observable((subscriber) => subscriber.next(robot));
  }

  updateRobotProgram(id: number, program: string): Observable<IRobot> {
    let robot = this.robots.find((robot) => robot.id === id) as IRobot;
    robot.programme_execute = program;
    robot.statut = 'En marche';
    this.reinitializeKPIs(robot);
    return new Observable((subscriber) => subscriber.next(robot));
  }

  reinitializeKPIs(robot: IRobot) {
    robot.KPIs.forEach((KPI) => {
      if (KPI.label === "Temps d'exécution") KPI.valeur = '00:00:00';
      else KPI.valeur = 0;
    });
  }

  //Cette méthode est seulement pour simuler le comportement  des robots en marche
  simulateRobotsBehavior(): IRobot[] {
    this.robots
      .filter((robot) => robot.statut === 'En marche')
      .forEach((robot) => {
        let executionTimeKPI = robot.KPIs.filter(
          (KPI) => KPI.label === "Temps d'exécution"
        )[0];
        let prisesKPI = robot.KPIs.filter((KPI) => KPI.label === 'Prises')[0];
        let erreursKPI = robot.KPIs.filter((KPI) => KPI.label === 'Erreurs')[0];
        // incrémenter le temps d'exécution
        let [hours, minutes, seconds] = executionTimeKPI.valeur.split(':');
        let totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds + 1;
        executionTimeKPI.valeur = new Date(totalSeconds * 1000)
          .toISOString()
          .substr(11, 8);
        // incrémenter le nombre de prise avec une proba de 80% de ou d'erreurs avec une proba de 20%
        if (totalSeconds % 5 === 0)
          Math.floor(Math.random() * 10) < 9
            ? (prisesKPI.valeur += 1)
            : (erreursKPI.valeur += 1);
      });
    return this.robots;
  }
}
