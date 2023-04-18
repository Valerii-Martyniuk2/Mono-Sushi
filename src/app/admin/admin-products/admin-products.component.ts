import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"],
})
export class AdminProductsComponent implements OnInit {
  public adminCategories: Array<CategoryResponse> = [];
  public adminProducts: Array<ProductResponse> = [];
  public textAction: boolean = true;
  public isUploaded: boolean = false;
  public uploadPercentage!: any;
  public editStatus: boolean = false;

  public currentProductId!: string;

  public productsForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initProductForm();
    this.loadProducts();
  }

  initProductForm(): void {
    this.productsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      weight: [null, Validators.required],
      consist: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }

  async loadCategories() {
    this.adminCategories = [];
    const categories = await this.categoryService.getAllFirebase();
    let n = 0;
    categories.forEach((doc: any) => {
      this.adminCategories.push(doc.data());
      this.adminCategories[n].id = doc.id;
      n++;
    });
  }
  async loadProducts() {
    this.adminProducts = [];
    const products = await this.productsService.getAllFireBase();
    let n = 0;
    products.forEach((doc: any) => {
      this.adminProducts.push(doc.data());
      this.adminProducts[n].id = doc.id;
      n++;
    });
  }

  // ///////////ADD PRODUCT

  addProduct(): void {
    if (this.editStatus) {
      this.productsService
        .updateFirebase(this.productsForm.value, this.currentProductId)
        .then(() => {
          this.loadProducts();
          this.toastr.success("Category successfully updated");
        });
    } else {
      this.productsService.createFirebase(this.productsForm.value).then(() => {
        this.loadProducts();
        this.toastr.success("Category successfully added");
      });
    }
    this.isUploaded = false;
    this.editStatus = false;
    this.productsForm.reset({ count: 1 });
  }
  // ////////////// DELETE PRODUCT

  deleteProduct(product: ProductResponse): void {
    if (product.imagePath) {
      this.imageService.deleteUploadFile(product.imagePath).then(() => {
        console.log("File deleted");
      });
    }
    this.productsService.deleteFirebase(product.id).then(() => {
      this.loadProducts();
      this.toastr.success("Category successfully deleted");
    });
  }

  // /////// EDIT PRODUCT

  editProduct(product: ProductResponse): void {
    this.productsForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      weight: product.weight,
      consist: product.consist,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.currentProductId = product.id;
    this.textAction = false;
    this.isUploaded = true;
    this.editStatus = true;
  }

  // /////// UPLOAD IMG

  upload(event: any) {
    const file = event.target.files[0];
    this.imageService
      .uploadFile("productsImg", file.name, file)
      .then((data) => {
        this.productsForm.patchValue({
          imagePath: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.isUploaded = true;
  }

  valueByControl(control: string): string {
    return this.productsForm.get(control)?.value;
  }

  // ////// DELETE IMG
  deleteImg(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl("imagePath"))
      .then(() => {
        console.log("File deleted");
        this.isUploaded = false;
        this.uploadPercentage = 0;
        this.productsForm.patchValue({
          imagePath: null,
        });
      });
  }
}
