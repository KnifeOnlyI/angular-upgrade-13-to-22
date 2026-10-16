import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {combineLatest, Subscription} from "rxjs";

export class LineForm extends UntypedFormGroup {
  private readonly subscriptions = new Subscription();

  constructor() {
    const firstNumber = new UntypedFormControl(null, {validators: [Validators.required]});
    const secondNumber = new UntypedFormControl(null, {validators: [Validators.required]});
    const thirdNumber = new UntypedFormControl(null, {validators: [Validators.required]});

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

  getFirstNumberControl(): UntypedFormControl {
    console.log(`Cast de l'abstractControl firstNumber en FormControl`);

    return this.get('firstNumber') as UntypedFormControl;
  }

  getSecondNumberControl(): UntypedFormControl {
    console.log(`Cast de l'abstractControl secondNumber en FormControl`);

    return this.get('secondNumber') as UntypedFormControl;
  }

  getThirdNumberControl(): UntypedFormControl {
    console.log(`Cast de l'abstractControl thirdNumber en FormControl`);

    return this.get('thirdNumber') as UntypedFormControl;
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }
}
