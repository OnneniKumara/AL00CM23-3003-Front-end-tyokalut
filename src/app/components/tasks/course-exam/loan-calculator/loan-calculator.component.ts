import {Component, inject, Optional} from '@angular/core';
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {ExamLoanApplication} from '../models/exam-loan-application';
import {ExamLoanApplicationService} from '../services/exam-loan-application.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-loan-calculator',
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDialogClose,
    MatIcon,
    MatIconButton,
    NgIf,
    FormsModule,
    MatSlider,
    MatSliderThumb,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './loan-calculator.component.html',
  styleUrl: './loan-calculator.component.css'
})
export class LoanCalculatorComponent {

  // booleani aktiivisuudelle
  active: boolean = true;

  constructor(private router: Router,
              @Optional() private dialogRef: MatDialogRef<LoanCalculatorComponent>) {
  }

  // lainahakemuksen hyväksyminen
  isTickChecked: boolean = false;

  // injektoidaan lainahakemuspalvelu
  protected loanService = inject(ExamLoanApplicationService);

  // lainahakemus
  loanApplication: ExamLoanApplication = new ExamLoanApplication();


  // funktio joka tarkistaa onko dialogi aktiivinen
  isInDialog(): boolean {
    return !!this.dialogRef;
  }

  // funktio joka sulkee dialogin tai navigoi pääsivulle
  onClose() {
    if (this.router.url === '/loan-calculator') {

      this.active = false;
    }
    // jos ollaan dialogissa, sulje dialogi
    else if (this.isInDialog()) {
      this.dialogRef.close();
    }
    // jos ollaan muulla reitillä, sulje dialogi
    else if (this.router.url !== '/loan-calculator') {
      this.active = false;
    }
  }

  // mennään 'etusivulle'
  cancel() {
    this.router.navigate(['']);
  }

}
