import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Subscription} from "rxjs";

export class LineForm extends FormGroup {
  private readonly subscriptions = new Subscription();

  constructor() {
    const firstNumber = new FormControl(null, {validators: [Validators.required]});
    const secondNumber = new FormControl(null, {validators: [Validators.required]});
    const thirdNumber = new FormControl(null, {validators: [Validators.required]});

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

  getFirstNumberControl(): FormControl {
    console.log(`Cast de l'abstractControl firstNumber en FormControl`);

    return this.get('firstNumber') as FormControl;
  }

  getSecondNumberControl(): FormControl {
    console.log(`Cast de l'abstractControl secondNumber en FormControl`);

    return this.get('secondNumber') as FormControl;
  }

  getThirdNumberControl(): FormControl {
    console.log(`Cast de l'abstractControl thirdNumber en FormControl`);

    return this.get('thirdNumber') as FormControl;
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }
}
