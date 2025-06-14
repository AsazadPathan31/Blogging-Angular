// auth.service.ts

import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { auth } from 'firebase/compat/app';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BlogsService {

  constructor(
    private firestore: AngularFirestore, 
    private router: Router
  ) 
  {}


  // Task 5: Add getBlogs and getBlog() methods here

  // Task 7: Add addBlog and editBlog() methods here

  // Task 11: Add deleteBlog() method here
  getBlogs(): Observable<any[]> {
    return this.firestore.collection('blogs').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data();
          return { id, data };
        });
      })
    );
  }
 
  getBlog(id: any): Observable<any> {
    return this.firestore.collection('blogs').doc(id).snapshotChanges().pipe(
      map(action => {
        const id = action.payload.id;
        const data = action.payload.data();
        return { id, data };
      })
    );
  }

  addBlog(title: string, content: string, timestamp: any): void {
    this.firestore.collection('blogs').add({
      blog_title: title,
      blog_content: content,
      timestamp: timestamp,
    })
      .then((docRef) => {
        console.log(`Blog post added with ID: ${docRef.id})`)
        this.router.navigate([""])
      })
      .catch((error) => {
        window.alert(`Error adding blog post: ${error}`);
      });
  }
 
  async editBlog(blogId: string, title: string, content: string, timestamp: any) {
    try {
      await this.firestore.collection('blogs').doc(blogId).update({
        blog_title: title,
        blog_content: content,
        timestamp: timestamp,
      });
      this.router.navigate([""]);
    } catch (error:any) {
      window.alert(`Error updating blog post: ${error.error}`);
    }
  }

  async deleteBlogPost(blogId: string) {
    if (!blogId) {
      window.alert("Blog post ID is empty or undefined.");
    }
 
    const blogDocRef = this.firestore.collection("blogs").doc(blogId);
 
    try {
      await blogDocRef
        .delete();
      console.log("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
}
