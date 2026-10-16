import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Subscription} from "rxjs";

export class LineForm extends FormGroup<{
  firstNumber: FormControl<number | null>;
  secondNumber: FormControl<number | null>;
  thirdNumber: FormControl<number | null>;
}> {
  private readonly subscriptions = new Subscription();

  constructor() {
    const firstNumber = new FormControl<number | null>(null, {validators: [Validators.required]});
    const secondNumber = new FormControl<number | null>(null, {validators: [Validators.required]});
    const thirdNumber = new FormControl<number | null>(null, {validators: [Validators.required]});

    thirdNumber.disable();

    super({firstNumber, secondNumber, thirdNumber});

    this.subscriptions.add(combineLatest([firstNumber.valueChanges, secondNumber.valueChanges])
      .subscribe(([firstNumber, secondNumber]) => {
        if (firstNumber !== null && secondNumber !== null) {
          thirdNumber.setValue(firstNumber + secondNumber);
        } else {
          thirdNumber.setValue(null);
        }
      })
    );
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }
}
