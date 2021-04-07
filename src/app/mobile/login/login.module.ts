import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { LanguageComponent } from './language/language.component';
import { SearchPhoneCodeComponent } from './search-phone-code/search-phone-code.component';
import { VhComponent } from 'src/app/components/vh-component/vh-component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
];

@NgModule({
    declarations: [LoginComponent, RegisterComponent, LanguageComponent, SearchPhoneCodeComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
    ],
    entryComponents: [SearchPhoneCodeComponent, LanguageComponent],
    providers: [VhComponent]
})
export class LoginModule { }
