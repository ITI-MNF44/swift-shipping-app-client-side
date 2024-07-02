import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Example method to fetch mock customer data
  getCustomers(): Observable<Customer[]> {
    // Replace this with actual HTTP call to your API or mock data
    return this.http.get<Customer[]>('api/customers');
  }

  // Example method to fetch large set of mock customers
  getCustomersLarge(): Promise<Customer[]> {
    // Replace with actual data fetching logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'James Butt',
            country: {
              name: 'Fatma',
              code: 'dz'
            },
            company: 'Benton, John B Jr',
            date: new Date('2015-09-13'),
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: {
              name: 'Ioni Bowcher',
              image: 'ionibowcher.png'
            },
            balance: 70663
          },
          {
            id: 2,
            name: 'James Butt',
            country: {
              name: 'Algeria',
              code: 'dz'
            },
            company: 'Benton, John B Jr',
            date: new Date('2015-09-13'),
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: {
              name: 'Ioni Bowcher',
              image: 'ionibowcher.png'
            },
            balance: 70663
          }, {
            id: 3,
            name: 'James Butt',
            country: {
              name: 'Algeria',
              code: 'dz'
            },
            company: 'Benton, John B Jr',
            date: new Date('2015-09-13'),
            status: 'unqualified',
            verified: true,
            activity: 17,
            representative: {
              name: 'Ioni Bowcher',
              image: 'ionibowcher.png'
            },
            balance: 70663
            },
          
            {
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },{
                id: 3,
                name: 'James Butt',
                country: {
                  name: 'Algeria',
                  code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: new Date('2015-09-13'),
                status: 'unqualified',
                verified: true,
                activity: 17,
                representative: {
                  name: 'Ioni Bowcher',
                  image: 'ionibowcher.png'
                },
                balance: 70663
              },
        ]);
      }, 1000); // Simulating delay for demonstration
    });
  }
}
