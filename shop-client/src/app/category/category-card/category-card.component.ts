import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../models/CategoryModel';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() category: CategoryModel;

  constructor(public sessionService: SessionService) {
  }
}
