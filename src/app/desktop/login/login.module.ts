import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NgZorroAntModule } from '../ng-zorro-ant.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SearchLangComponent } from './search-lang/search-lang.component';
import { SearchPhoneCodeComponent } from './search-phone-code/search-phone-code.component';
import { VhComponent } from 'src/app/components/vh-component/vh-component';



const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: '',
                component: SigninComponent,
            },
            {
                path: 'signup',
                component: SignupComponent,
            }
        ]
    },
]
@NgModule({
    declarations: [LoginComponent, SigninComponent, SignupComponent, SearchLangComponent, SearchPhoneCodeComponent],
    entryComponents: [SearchLangComponent, SearchPhoneCodeComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    providers: [VhComponent]
})
export class LoginModule { }
