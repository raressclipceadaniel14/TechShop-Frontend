import { Component, Input } from '@angular/core';
import { SubcategoryModel } from '../../models/SubcategoryModel';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-subcategory-card',
  templateUrl: './subcategory-card.component.html',
  styleUrl: './subcategory-card.component.scss'
})
export class SubcategoryCardComponent {
  @Input() subcategory: SubcategoryModel;

  constructor(public sessionService: SessionService) {
  }
}
