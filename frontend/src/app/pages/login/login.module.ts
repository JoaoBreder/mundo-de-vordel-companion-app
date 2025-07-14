import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './component/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import { bootstrapEyeFill, bootstrapEyeSlashFill } from '@ng-icons/bootstrap-icons';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		LoginRoutingModule,

		FormsModule,
		ReactiveFormsModule,

		NgIconsModule,
		NgIconsModule.withIcons({ bootstrapEyeFill, bootstrapEyeSlashFill }),

		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
})
export class LoginModule {}
