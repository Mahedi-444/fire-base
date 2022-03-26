import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { CrudService } from './service/crud.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormtwoComponent } from './formtwo/formtwo.component';
import { FileValueAccessor } from './file-control-value-accessor';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PhoneLoginComponent } from './phone-login/phone-login.component';




@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormtwoComponent,
    FileValueAccessor,
    PhoneLoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    
    

  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
