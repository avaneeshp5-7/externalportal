import { ProfileDetailsComponent } from './modules/components/profile/profiledetails/profile-details';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {AuthgourdService} from "./authgourd.service";
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import {ContactComponent} from '../app/modules/components/Contacts/contact';
import {SearchComponent} from '../app/modules/components/SearchJob/search';
import {NgSelectModule} from '@ng-select/ng-select';
import { BannerComponent } from './banner/banner.component';
import { DefaultComponent } from './default/default.component';
import {ToastrModule} from 'ngx-toastr';
import { NotifierModule } from "angular-notifier";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
var rout=[
  {path:'',component:DefaultComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:UserLoginComponent},
  {path:'contact',component:ContactComponent},
  // {path:'search-new-job',component:SearchComponent},
  {path:'profile',component:ProfileComponent},
  {path:'jobs',component:SearchpageComponent},
  {
    path: '**',component: PagenotfoundComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    UserLoginComponent,
    RegisterComponent,
    MenuComponent,
    FooterComponent,
    ContactComponent,
    SearchComponent,
    BannerComponent,
    DefaultComponent,
    SearchpageComponent,
    ProfileDetailsComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NotifierModule,
    RouterModule.forRoot(rout),
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  entryComponents:[ProfileDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
