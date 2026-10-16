import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from "@angular/forms";
import {LineForm} from "@shared/forms/line.form";
import {FormLineService} from "@shared/services/form-line.service";
import {firstValueFrom} from "rxjs";

@Component({
  // Si on met "DEFAULT" les logs dans les méthodes (utilisés dans le template) s'exécuteront 2 fois trop.
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-page.component.scss'],
  template: `
    <h1>Form</h1>

    <app-dummy></app-dummy>

    <hr>

    <form (ngSubmit)="onSubmit()">
      <button (click)="onAddLine()" type="button">Ajouter une ligne</button>

      <ng-container *ngFor="let formGroup of form.controls; let index = index">
        <!-- L'absence de typage nous oblige à ce ngIf ou autre pour gérer le typage -->
        <div *ngIf="toLineForm(formGroup) as lineForm" class="form-line">
          <!--
          L'absence de typage nous oblige à créer un getter (méthode) et à l'utiliser dans le template si on veut
          gérer un minimum les erreurs de types.
          -->
          <input type="number" placeholder="Number 1" [formControl]="lineForm.getFirstNumberControl()">
          <input type="number" placeholder="Number 2" [formControl]="lineForm.getSecondNumberControl()">
          <input type="number" placeholder="Number 3" [formControl]="lineForm.getThirdNumberControl()">

          <button (click)="onDeleteLine(index)" type="button">Supprimer</button>

          <!-- Pareil ici -->
          <code>{{ lineForm.getFirstNumberControl().errors | json }}</code>
          <code>{{ lineForm.getSecondNumberControl().errors | json }}</code>
          <code>{{ lineForm.getThirdNumberControl().errors | json }}</code>
        </div>
      </ng-container>

      <button type="submit">Valider</button>
    </form>

    <div class="form-results">
      <div class="form-result">
        <p>Form values</p>
        <pre><code>{{ form.getRawValue() | json }}</code></pre>
      </div>

      <div class="form-result">
        <p>Form errors</p>
        <pre><code>{{ form.errors | json }}</code></pre>
      </div>
    </div>
  `,
})
export class FormPageComponent implements OnDestroy {
  form = new FormArray([], {validators: [minFormArrayLength(1)]});

  constructor(private readonly formLineService: FormLineService) {
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      console.log('Formulaire valide, appel du service de sauvegarde');

      const linesToSave = this.form.controls.map(control => this.toLineForm(control));

      void firstValueFrom(this.formLineService.saveLines(linesToSave));
    } else {
      console.log('Formulaire invalide');
    }
  }

  ngOnDestroy() {
    this.form.controls.forEach(abstractControl => this.toLineForm(abstractControl).destroy());
  }

  onAddLine() {
    this.form.push(new LineForm());
  }

  onDeleteLine(lineFormIndex: number) {
    // Ici on veut appeler la méthode destroy de la classe LineForm. L'absence de typage nous oblige à utiliser une
    // méthode intermédiaire pour obtenir le type.
    this.toLineForm(this.form.at(lineFormIndex)).destroy();

    this.form.removeAt(lineFormIndex);
  }

  toLineForm(abstractControl: AbstractControl): LineForm {
    console.log(`Cast de l'AbstractControl en LineForm`);
    return abstractControl as LineForm;
  }
}

function minFormArrayLength(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control as FormArray).controls.length < minValue ? {minFormArrayLength: true} : null;
  };
}
