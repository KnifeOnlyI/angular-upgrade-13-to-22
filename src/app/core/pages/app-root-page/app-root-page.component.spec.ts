import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRootPageComponent } from './app-root-page.component';

describe('AppRootPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppRootPageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppRootPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-13-tests'`, () => {
    const fixture = TestBed.createComponent(AppRootPageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-13-tests');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppRootPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-13-tests app is running!');
  });
});
