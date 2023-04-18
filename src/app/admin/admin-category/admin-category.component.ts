import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-admin-category",
  templateUrl: "./admin-category.component.html",
  styleUrls: ["./admin-category.component.scss"],
})
export class AdminCategoryComponent implements OnInit {
  public adminCategory: Array<CategoryResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentActionId!: string;

  public categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,

    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initActionForm();
  }

  initActionForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  async loadCategories() {
    this.adminCategory = [];
    const categories = await this.categoryService.getAllFirebase();
    let n = 0;
    categories.forEach((doc: any) => {
      this.adminCategory.push(doc.data());
      this.adminCategory[n].id = doc.id;
      n++;
    });
  }

  /////////////ADD CATEGORY

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .updateFirebase(this.categoryForm.value, this.currentActionId as string)
        .then(() => {
          this.loadCategories();
          this.toastr.success("Category successfully updated");
        });
    } else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.success("Category successfully added");
      });
    }
    this.textAction = true;
    this.categoryForm.reset();
  }
  //////////////// DELETE CATEGORY

  deleteCategory(action: CategoryResponse): void {
    if (action.imagePath) {
      this.imageService.deleteUploadFile(action.imagePath).then(() => {
        console.log("File deleted");
      });
    }
    this.categoryService.deleteFirebase(action.id as string).then(() => {
      this.loadCategories();
      this.toastr.success("Category successfully deleted");
    });
  }

  ///////// EDIT CATEGORY

  editCategory(category: CategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.currentActionId = category.id;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  ///////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile("categoryImg", file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.isUploaded = true;
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

  //////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl("imagePath"))
      .then(() => {
        console.log("File deleted");
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.categoryForm.patchValue({
          imagePath: null,
        });
      });
  }
}
