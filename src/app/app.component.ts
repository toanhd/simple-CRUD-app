import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from "./app.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    rows = [];
    temp = [];
    selected = [];
    editing = {};
    userForm: FormGroup;
    responseMess = '';

    constructor(private modalService: NgbModal,
                private appService: AppService) {

        this.fecth()
    }

    fecth() {
        this.appService.read()
            .subscribe(
                data => {
                    // console.log(data.users);
                    // cache our list
                    this.temp = [...data.users];

                    // push our inital complete list
                    this.rows = data.users;
                },
                err => console.log(err)
            );
    }

    //
    onFormSubmit() {
        if (this.userForm.valid) {
            const user = {
                email: this.userForm.value.email,
                name: this.userForm.value.name,
                company: this.userForm.value.company,
                phone: this.userForm.value.phone,
            };
            this.appService.create(user)
                .subscribe(
                    data => {
                        // console.log(data);
                        this.responseMess = 'Success create user!';
                        this.userForm.reset();
                        this.fecth()
                    },
                    err => {
                        // console.log(err);
                        this.responseMess = 'Can not create user!';
                        this.userForm.reset()
                    }
                );

        } else {
            this.responseMess = 'Invalid'
        }
    }

    open(target) {
        this.modalService.open(target);
        this.userForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
            ]),
            name: new FormControl(null, Validators.required),
            company: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
        });
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        // this.table.offset = 0;
    }


    onSelect({selected}) {
        // console.log('Select Event', this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        // console.log('Activate Event', event);
    }

    delete() {
        // console.log(this.selected);
        this.appService.delete(this.selected)
            .subscribe(
                err => {
                    console.log(err);
                    this.fecth()
                }
            );
    }

    updateValue(event, cell, rowIndex, id) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.appService.update(id, cell, event.target.value).subscribe(
            result => console.log(result)
        );
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }
}
