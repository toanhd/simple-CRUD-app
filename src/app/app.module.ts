import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppService} from "./app.service";
import {HttpModule} from "@angular/http";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        PaginationModule.forRoot(),
        FormsModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
