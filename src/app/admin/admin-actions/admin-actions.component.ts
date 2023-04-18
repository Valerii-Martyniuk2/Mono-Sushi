import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionserviceService } from 'src/app/shared/services/action/actionservice.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ActionResponse } from 'src/app/shared/interfaces/action.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss'],
})
export class AdminActionsComponent implements OnInit {
  public adminActions: Array<ActionResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentActionId!: string;

  public actionsForm!: FormGroup;

  constructor(
    private actionService: ActionserviceService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadActions();
    this.initActionForm();
  }


  initActionForm(): void {
    this.actionsForm = this.fb.group({
      date: String (new Date()),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  async loadActions() {
    this.adminActions = [];
    const actions = await this.actionService.getAllFirebase();
    let n = 0;
    actions.forEach((doc: any) => {
      this.adminActions.push(doc.data())
      this.adminActions[n].id = doc.id
      n++ ;
    })
  }

  /////////////ADD ACTION

  addAction(): void {
    if (!this.editStatus) {
      this.actionService.createFirebase(this.actionsForm.value).then(() => {
        this.loadActions();
        this.toastr.success('Category successfully updated');
      });
    } else {
      this.actionService
          .updateFirebase(this.actionsForm.value, this.currentActionId)
          .then(() => {
            this.loadActions();
            this.toastr.success('Category successfully added');
          });
    }
    this.isUploaded = false
    this.textAction = true;
    this.actionsForm.reset();
    this.actionsForm.patchValue({
      date: String(new Date()),
    });
  }
  //////////////// DELETE ACTION

  deleteAction(action: ActionResponse): void {
    if (action.imagePath) {
      this.imageService.deleteUploadFile(action.imagePath).then(() => {
        console.log('File deleted');
      });
    }
    this.actionService.deleteFirebase(action.id as string).then(() => {
      this.loadActions();
      this.toastr.success('Category successfully deleted');
    });
  }

  ///////// EDIT ACTION

  editAction(action: ActionResponse): void {
    this.actionsForm.patchValue({
      date: action.date,
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath,
    });
    this.currentActionId = action.id as string;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  ///////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('actionsImg', file.name, file)
      .then((data) => {
        this.actionsForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.isUploaded = true;
  }

  valueByControl(control: string): string {
    return this.actionsForm.get(control)?.value;
  }

  //////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.actionsForm.patchValue({
          imagePath: null,
        });
      });
  }
}
