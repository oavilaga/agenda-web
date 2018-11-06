import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
})
export class MyTableComponent implements OnInit {
  persons = new BehaviorSubject<any[]>([]);
  dataSource = new PersonDataSource(this.persons);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'lastname', 'nick', 'actions'];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {
    this.personService.getConfig().subscribe(config => {
      console.log(config);
   });

   this.personService.getPersons().subscribe((persons: any[]) => {
        this.persons.next(persons);
    });
  }

  ngOnInit() {}

  update(person) {
    localStorage.setItem('person', JSON.stringify(person));
    this.router.navigate(['/nuevo']);
  }
}

export class PersonDataSource extends DataSource<any> {
  persons: BehaviorSubject<any>;

  constructor(persons: BehaviorSubject<any>) {
    super();
    this.persons = persons;
  }

  connect(): Observable<any> {
    return this.persons;
  }

  disconnect() {}
}
