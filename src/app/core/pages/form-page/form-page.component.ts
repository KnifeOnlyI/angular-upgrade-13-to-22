import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import {LineForm} from "@shared/forms/line.form";
import {FormLineService} from "@shared/services/form-line.service";
import {firstValueFrom} from "rxjs";
import {JsonPipe, NgForOf} from "@angular/common";
import {DummyComponent} from "@shared/components/dummy/dummy.component";

@Component({
  // Si on met "DEFAULT" les logs dans les méthodes (utilisés dans le template) s'exécuteront 2 fois trop.
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-page.component.scss'],
  standalone: true,
  template: `
    <h1>Form</h1>

    <app-dummy></app-dummy>

    <hr>

    <form (ngSubmit)="onSubmit()">
      <button (click)="onAddLine()" type="button">Ajouter une ligne</button>

      <ng-container *ngFor="let lineForm of form.controls; let index = index">
        <div class="form-line">
          <!--
          L'absence de typage nous oblige à créer un getter (méthode) et à l'utiliser dans le template si on veut
          gérer un minimum les erreurs de types.
          -->
          <input type="number" placeholder="Number 1" [formControl]="lineForm.controls.firstNumber">
          <input type="number" placeholder="Number 2" [formControl]="lineForm.controls.secondNumber">
          <input type="number" placeholder="Number 3" [formControl]="lineForm.controls.thirdNumber">

          <button (click)="onDeleteLine(index)" type="button">Supprimer</button>

          <!-- Pareil ici -->
          <code>{{ lineForm.controls.firstNumber.errors | json }}</code>
          <code>{{ lineForm.controls.secondNumber.errors | json }}</code>
          <code>{{ lineForm.controls.thirdNumber.errors | json }}</code>
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
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
    DummyComponent,
    NgForOf
  ]
})
export class FormPageComponent implements OnDestroy {
  private readonly formLineService = inject(FormLineService);

  protected readonly form = new FormArray<LineForm>([], {validators: [minFormArrayLength(1)]});

  ngOnDestroy() {
    this.form.controls.forEach(line => line.destroy());
  }

  protected onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      console.log('Formulaire valide, appel du service de sauvegarde');

      const linesToSave = this.form.controls;

      void firstValueFrom(this.formLineService.saveLines(linesToSave));
    } else {
      console.log('Formulaire invalide');
    }
  }

  protected onAddLine() {
    this.form.push(new LineForm());
  }

  protected onDeleteLine(lineFormIndex: number) {
    // Ici on veut appeler la méthode destroy de la classe LineForm. L'absence de typage nous oblige à utiliser une
    // méthode intermédiaire pour obtenir le type.
    this.form.at(lineFormIndex).destroy();

    this.form.removeAt(lineFormIndex);
  }
}

function minFormArrayLength(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Ce cast reste obligatoire même avec les formulaires typés
    return (control as FormArray).controls.length < minValue ? {minFormArrayLength: true} : null;
  };
}
