import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from '../backend/api.service';
import { ClassificationModel } from '../backend/classification-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  seekForm: FormGroup;
  submitted: boolean = false;
  showClassifications: boolean;
  classificationList: ClassificationModel[] = [];
  selectedClassifications: number[] = [];
  showResults: boolean = false;
  resultEle: ElementRef;

  @ViewChild(IonContent) content: IonContent;

  private classificationSub: Subscription;
  private formChangesSub: Subscription;
  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.classificationSub = this.apiService
      .getClassificationList()
      .subscribe((classifications) => {
        this.classificationList = classifications;
      });
    this.seekForm = this.formBuilder.group({
      keyword: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      classification: ['Any Classification', [Validators.required]],
      where: ['', [Validators.required]],
    });

    this.formChangesSub = this.seekForm.valueChanges.subscribe((formData) => {
      this.showResults = false;
    });
  }

  ngOnDestroy() {
    this.classificationSub?.unsubscribe();
    this.formChangesSub?.unsubscribe();
  }

  get errorCtr() {
    return this.seekForm.controls;
  }

  toggleClassifications(event) {
    this.showClassifications = !this.showClassifications;
  }

  checkEvent(event, classification: ClassificationModel) {
    if (event.detail.checked) {
      this.selectedClassifications.push(classification.id);
    } else {
      const index = this.selectedClassifications.indexOf(classification.id);
      if (index > -1) {
        this.selectedClassifications.splice(index, 1);
      }
    }
    const classificationControl: AbstractControl =
      this.seekForm.get('classification');
    const totalSelectedClassifications: number =
      this.selectedClassifications.length;
    if (totalSelectedClassifications === 0) {
      classificationControl.setValue('Any Classification');
    } else if (totalSelectedClassifications === 1) {
      classificationControl.setValue(
        this.classificationList?.find((c) => {
          return c.id == this.selectedClassifications[0];
        })?.name
      );
    } else {
      classificationControl.setValue(
        `${totalSelectedClassifications} Classifications`
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.seekForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      this.showResults = true;
      this.scrollTo(this.resultEle);
    }
  }

  scrollTo(el: ElementRef) {
    this.resultEle = el;
    const offset = el?.nativeElement?.offsetTop;
    this.content.scrollToPoint(0, offset, 2000);
  }
}
