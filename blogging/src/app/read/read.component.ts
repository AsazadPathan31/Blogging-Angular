import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent {
  id: any;
  blog: any;
  sanitizedContent: any;
  document: any;
  getBlogSubscription: any;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public blogsService: BlogsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // Retrieve Blog Post
    this.getBlog();
  }

  ngOnDestroy() {
     if(this.getBlogSubscription) {
        this.getBlogSubscription.unsubscribe();
     }
  }

  getBlog() {
    // Fetch Blog Post Data
    this.getBlogSubscription = this.blogsService.getBlog(this.id).subscribe((data: any) => {
      this.blog = data;
      this.sanitizedContent = this.blog.data.blog_content;
      // Sanitize and Render Content
      setTimeout(() => {
          this.renderContent(this.sanitizedContent);
      }, 0);
    });
  }

  // Render Content
  renderContent(content: any) {
    this.document = document.getElementById('content-container');
    this.document.innerHTML = content;
    // Task 5: Style Blockquote and Table Elements
    this.styleElements();
  }

  // Style Components like blockquote and tables
  styleElements() {
    const blockquote = document.querySelector('blockquote')?.style;
    if (blockquote) {
      blockquote.cssText = `
        margin: 20px 0;
        padding: 20px 10px 10px 10px;
        font-style: italic;
        margin-left: 60px !important;
        border-left: 5px solid black;
      `;
    }
    const table = document.querySelector('table');
    const rows = table ? Array.from(table.querySelectorAll('tr')) : [];
    for (const row of rows) {
      row.style.borderBottom = '1px solid';
      const dataCells = row ? Array.from(row.querySelectorAll('td')) : [];
      for (const dataCell of dataCells) {
        dataCell.style.borderLeft = '1px solid black';
        dataCell.style.paddingLeft = '10px';
      }
    }
  }
}
