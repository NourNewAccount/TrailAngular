import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<MenuItem[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const breadcrumb = this.createBreadcrumb(this.activatedRoute.root);
        this.breadcrumbSubject.next(breadcrumb);
      }
    });
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private createBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumb: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumb;
    }

    // Add a default item
    //  breadcrumb.push({ label: 'Home', routerLink: '/home' })

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label =
      this.capitalizeFirstLetter(
        child.snapshot.data['breadcrumb'] ||
          child.snapshot.url[child.snapshot.url.length - 1].path
      );
      breadcrumb.push({
        label,
        routerLink: url,
      });
      console.log(child, url, breadcrumb);
      return this.createBreadcrumb(child, url, breadcrumb);
    }
    return breadcrumb;
  }
}
