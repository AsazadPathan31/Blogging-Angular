import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { BlogsService } from "../blogs.service";
import { AuthService } from "../auth.service";


@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  // Task 6: Declare variable here
  blogs: any = []
  blogsSubscription: any;

  constructor(
    public blogsService: BlogsService, 
    public authService: AuthService, 
    private router: Router) {}

  ngOnInit() {
    // Task 6: Retrieve blogs here
    this.blogsSubscription = this.blogsService.getBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data.sort((a: any, b: any) => {
          const timestampA = new Date(a.data.timestamp).getTime();
          const timestampB = new Date(b.data.timestamp).getTime();
          return timestampB - timestampA; // Sort in descending order
        });
      }
    })
  }

  deleteBlogPost(blogId: string) {
    const isConfirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (isConfirmed) {
      // User clicked "OK", proceed with deletion
      this.blogsService.deleteBlogPost(blogId)
        .then(() => {
          console.log('Blog post deleted successfully');
        })
        .catch((error:any) => {
          console.error('Error deleting blog post', error);
        });
    }
    else{
      this.router.navigate([""])
    }
  }

  ngOnDestroy() {
    // Task 6: Unsubscribe from subscriptions here
    if (this.blogsSubscription){
      this.blogsSubscription.unsubscribe();
   } 
  }


  // Task 11: Add deleteBlogPost(blogId: string) here

}
