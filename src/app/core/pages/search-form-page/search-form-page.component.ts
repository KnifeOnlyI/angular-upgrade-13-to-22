import {ChangeDetectionStrategy, Component, computed, inject, resource, ResourceStatus} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";
import {UserService} from "@shared/services/user.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search-form-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
      <input type="text" placeholder="Firstname" [formControl]="searchForm.controls.firstname">
      <input type="text" placeholder="Lastname" [formControl]="searchForm.controls.lastname">
    </form>

    <hr>

    <table>
      <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
      </tr>
      </thead>
      <tbody>
        @let resourceStatus = usersResource.status();

        @if (resourceStatus === ResourceStatus.Loading || resourceStatus === ResourceStatus.Reloading) {
          <tr>
            <td colspan="2">Chargement des résultats...</td>
          </tr>
        } @else if (resourceStatus === ResourceStatus.Error) {
          <tr>
            <td colspan="2">Une erreur est survenue durant la recherche</td>
          </tr>
        } @else {
          @for (user of users(); track user.id) {
            <tr>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="2">Aucun résultat.</td>
            </tr>
          }
        }
      </tbody>
    </table>
  `,
  imports: [
    ReactiveFormsModule
  ]
})
export class SearchFormPageComponent {
  protected readonly ResourceStatus = ResourceStatus;

  private readonly userService = inject(UserService);

  protected readonly searchForm = new FormGroup({
    firstname: new FormControl<string>('', {nonNullable: true}),
    lastname: new FormControl<string>('', {nonNullable: true}),
  });

  private readonly firstname = toSignal(
    this.searchForm.controls.firstname.valueChanges.pipe(debounceTime(500)),
    {initialValue: this.searchForm.controls.firstname.value}
  );

  private readonly lastname = toSignal(
    this.searchForm.controls.lastname.valueChanges.pipe(debounceTime(500)),
    {initialValue: this.searchForm.controls.lastname.value}
  );

  // Version RxJS
  // private readonly usersResource = rxResource({
  //   request: () => ({firstname: this.firstname(), lastname: this.lastname()}),
  //   loader: ({request: {firstname, lastname}}) => this.userService.rxSearch({firstname, lastname})
  // });

  // Version promise
  protected readonly usersResource = resource({
    request: () => ({firstname: this.firstname(), lastname: this.lastname()}),
    loader: ({request: {firstname, lastname}}) => this.userService.search({firstname, lastname})
  });

  protected readonly users = this.usersResource.asReadonly().value;
}
