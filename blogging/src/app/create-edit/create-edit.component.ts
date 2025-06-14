import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../auth.service';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css'],
})
export class CreateEditComponent {
  blogForm!: FormGroup;
  id: string | null = null;


  constructor(
    public authService: AuthService,
    public blogsService: BlogsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.formBuilder.group({
      blogTitle: ['', [Validators.required, Validators.minLength(22)]],
      editorContent: [''],
    });
  }


  ngOnInit() {
    // Check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadBlogData(this.id);
      }
    });
  }


  loadBlogData(id: string) {
    this.blogsService.getBlog(id).subscribe({
      next: (result) => {
        if (result) {
          this.blogForm.patchValue({
            blogTitle: result.data.blog_title,
            editorContent: result.data.blog_content,
          });
        }
      },
      error: (err) => console.error('Error loading blog', err)
    });
  }


  onSubmit() {
    if (this.blogForm.invalid) {
      alert('Form is not valid. Please check the fields.');
      return;
    }
    const blogTitle = this.blogForm.get('blogTitle')?.value;
    const editorContent = this.blogForm.get('editorContent')?.value;


    const timestamp = new Date();
    const formattedTimestamp = moment(timestamp).format('MMMM DD, YYYY HH:mm:ss');


    if (this.id) {
      // Edit existing blog
      this.blogsService.editBlog(
        this.id,
        blogTitle,
        editorContent,
        formattedTimestamp
      );
    } else {
      // Create new blog
      this.blogsService.addBlog(
        blogTitle,
        editorContent,
        formattedTimestamp
      );
    }
    // navigate to homepage
    this.router.navigate(['/']);
  }
}
