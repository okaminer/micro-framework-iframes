import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppchildComponent } from './appchild.component';

describe('AppchildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppchildComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppchildComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'child'`, () => {
    const fixture = TestBed.createComponent(AppchildComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('child');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppchildComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to child!');
  });
});
