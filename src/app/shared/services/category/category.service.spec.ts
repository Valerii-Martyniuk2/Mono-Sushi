import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('CategoryService', () => {
  let service: CategoryService;
  let someService: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
          CategoryService
      ]
    });
    service = TestBed.inject(CategoryService);
    someService = TestBed.get( CategoryService );
    httpTestingController = TestBed.get( HttpTestingController );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test HttpClient.getAll', () => {
    const  data = {
      id: 2,
      datdat: 's',
      name: 's',
      title: 's',
      description: 's',
      imagePath: 's',
    }
    someService.getAll().subscribe( (response:any) => expect(response).toBe(data) )

    const req = httpTestingController.expectOne('http://localhost:3000/categorys')

    expect(req.request.method).toBe('GET')

    req.flush(data)
  });

  afterEach( () => httpTestingController.verify() )

});
