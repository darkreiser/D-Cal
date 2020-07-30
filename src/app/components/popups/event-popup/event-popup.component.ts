import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { EventService } from 'src/app/services/event.service';
import { UtilsService, EventObj, Participant } from 'src/app/utils/utils';

@Component({
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE, Platform]},
  ],
})
export class EventPopupComponent implements OnInit {

  eventForm: FormGroup;

  isSubmitted = false;
  isEditMode = false;
  errorMessage: string = null;
  event: EventObj;
  
  constructor(
    public dialogRef: MatDialogRef<EventPopupComponent>,
    private fb: FormBuilder,
    private eventService: EventService,
    private utils: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.isEditMode = !this.utils.isObjectEmpty(this.data);

    this.initFormValues();

  }

  initFormValues(): void {
    const title = this.isEditMode ? this.data.title : '';
    const startDate = this.isEditMode ? this.data.startDate : new Date();
    const endDate = this.isEditMode ? this.data.endDate : new Date(this.getDefaultEndDate());
    const location = this.isEditMode ? this.data.location : '';
    const description = this.isEditMode ? this.data.description : '';
    const participants = this.isEditMode ? this.data.participants : [];
    
    this.eventForm = this.fb.group({
      title: [title, [Validators.required, Validators.maxLength(80)]],
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      location: [location, [Validators.required]],
      description: [description, Validators.required],
      participants: this.fb.array([]),
    });

    this.initParticipants(participants);
  }

  get formControls() { return this.eventForm.controls; }


  initParticipants(participants: Participant[]): void {
    let participantsControl = <FormArray>this.eventForm.controls.participants;
    if (participants.length > 0) {
      participants.forEach(p => {
        participantsControl.push(this.fb.group({email: p.email}))
      })
    } else {
      participantsControl.push(this.createParticipantController());
    }
  }
  createParticipantController(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addParticipant(): void {
    const participants = this.eventForm.get('participants') as FormArray;
    participants.push(this.createParticipantController());
  }

  removeParticipant(index: number): void {
    const participants = this.eventForm.get('participants') as FormArray;
    participants.removeAt(index);
  }

  getDefaultEndDate(): Date {
    const date = new Date();
    const endDateMinutes = new Date().getMinutes();
    date.setMinutes(endDateMinutes+30);

    return date
  }

  addEvent(){
    if(this.eventForm.invalid || this.validateFormData()){
      this.errorMessage = this.validateFormData();
    } else {

      if(this.isEditMode) {
        this.eventService.editEvent(this.data.id, this.eventForm.value);
        this.closePopup('edit', this.eventForm.value);
      } else {
        if (this.eventService.isLessThan5EventsToday(this.eventForm.get('startDate').value)) {
          this.eventService.addEvent(this.eventForm.value);
          this.closePopup('add', this.eventForm.value);
        } else {
          this.errorMessage = 'Cannot set more than 5 events per day';
        }
      }
    }
  }

  validateFormData() {
    if (this.formControls.startDate.value > this.formControls.endDate.value) {
      return 'start Date cannot be later than end date';
    } else {
      return null;
    }
  }

  deleteEvent(): void {
    this.eventService.removeEvent(this.data.id);
    this.closePopup('remove', this.data)
  }

  closePopup(action: string, event: EventObj): void {
    this.dialogRef.close({
      action: action,
      event: event
    });
  }

  getErrorMessage() {
    return 'You must enter a valid value';
  }
}
