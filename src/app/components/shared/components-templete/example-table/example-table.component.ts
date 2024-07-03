import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { Customer } from '../../../../domain/customer';
import { CustomerService } from '../../../../service/customerservice';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example-table',
  standalone: true,
  providers: [CustomerService],
  imports: [TableModule, HttpClientModule, CommonModule, InputTextModule, TagModule, MultiSelectModule, // Add MultiSelectModule here
      DropdownModule, ButtonModule, FormsModule],
  templateUrl: './example-table.component.html',
  styleUrl: './example-table.component.css'
})
export class ExampleTableComponent implements OnInit {
    customers: Customer[] = [];

    representatives!: any;
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    searchValue: string | undefined;

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
            this.customers.forEach((customer) => (customer.date = new Date(customer.date)));
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    getSeverity(status: string): string | null {
        switch (status.toLowerCase()) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;

            default:
                return null;
        }
    }

    getBadgeClass(status: string): string {
        switch (status.toLowerCase()) {
            case 'unqualified':
                return 'badge-danger';
            case 'qualified':
                return 'badge-success';
            case 'new':
                return 'badge-info';
            case 'negotiation':
                return 'badge-warning';
            case 'renewal':
                return 'badge-primary';
            default:
                return '';
        }
    }
}
